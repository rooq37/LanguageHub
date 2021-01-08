package com.zrcaw.langshub.dao.pupil;

import com.zrcaw.langshub.model.pupil.Pupil;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class PupilDaoImpl implements PupilDao {

    private Region region = Region.US_EAST_1;
    private DynamoDbClient ddb = DynamoDbClient.builder().region(region).build();
    private DynamoDbEnhancedClient enhancedClient = DynamoDbEnhancedClient.builder().dynamoDbClient(ddb).build();
    private DynamoDbTable<Pupil> pupilTable = enhancedClient.table("Pupils", TableSchema.fromBean(Pupil.class));


    @Override
    public void assignGroup(String tutorName, String pupilName, String groupName) {
        Key key = Key.builder().partitionValue(tutorName).sortValue(pupilName).build();
        Pupil pupil = pupilTable.getItem(r -> r.key(key));
        if(pupil != null) {
            if(pupil.getExerciseGroups() == null) {
                pupil.setExerciseGroups(new ArrayList<>());
            }
            if(!pupil.getExerciseGroups().contains(groupName)){
                pupil.getExerciseGroups().add(groupName);
            }
            pupilTable.putItem(pupil);
        }
    }

    @Override
    public void withdrawGroup(String tutorName, String pupilName, String groupName) {
        Key key = Key.builder().partitionValue(tutorName).sortValue(pupilName).build();
        Pupil pupil = pupilTable.getItem(r -> r.key(key));
        if(pupil != null) {
            if(pupil.getExerciseGroups() != null) {
                pupil.getExerciseGroups().remove(groupName);
            }
            pupilTable.putItem(pupil);
        }
    }

    @Override
    public List<Pupil> getAllPupils(String tutorName) {
        List<Pupil> pupils = new ArrayList<>();
        for (Pupil pupil : pupilTable.scan().items()) {
            if(pupil.getTutorName().equals(tutorName)){
                pupils.add(pupil);
            }
        }
        return pupils;
    }

    @Override
    public Optional<Pupil> getPupil(String tutorName, String pupilName) {
        Key key = Key.builder().partitionValue(tutorName).sortValue(pupilName).build();
        Pupil pupil = pupilTable.getItem(r -> r.key(key));
        return (pupil == null) ? Optional.empty() : Optional.of(pupil);
    }
}
