package com.zrcaw.langshub.dao.exercise;

import com.zrcaw.langshub.model.exercise.Exercise;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

import java.util.*;

@Component
public class ExerciseDaoImpl implements ExerciseDao {

    private Region region = Region.US_EAST_1;
    private DynamoDbClient ddb = DynamoDbClient.builder().region(region).build();
    private DynamoDbEnhancedClient enhancedClient = DynamoDbEnhancedClient.builder().dynamoDbClient(ddb).build();
    private DynamoDbTable<Exercise> exerciseTable = enhancedClient.table("Exercises", TableSchema.fromBean(Exercise.class));


    @Override
    public Optional<Exercise> getExercise(String author, String name) {
        Key key = Key.builder().partitionValue(author).sortValue(name).build();
        Exercise exercise = exerciseTable.getItem(r -> r.key(key));
        return (exercise == null) ? Optional.empty() : Optional.of(exercise);
    }

    @Override
    public List<Exercise> getAllExercises(String author) {
        List<Exercise> exercises = new ArrayList<>();
        for (Exercise exercise : exerciseTable.scan().items()) {
            if(exercise.getAuthor().contains(author)){
                exercises.add(exercise);
            }
        }
        return exercises;
    }

    public List<Exercise> getGroup(String author, String groupName) {
        List<Exercise> group = new ArrayList<>();
        for (Exercise exercise : exerciseTable.scan().items()) {
            if(exercise.getAuthor().contains(author) && exercise.getGroupName().contains(groupName)){
                group.add(exercise);
            }
        }
        return group;
    }

    @Override
    public List<String> getAllGroups(String author) {
        Set<String> groups = new HashSet<>();
        for (Exercise exercise : exerciseTable.scan().items()) {
            if(exercise.getAuthor().contains(author)){
                groups.add(exercise.getGroupName());
            }
        }
        return new ArrayList<>(groups);
    }

    @Override
    public void save(Exercise exercise) {
        exerciseTable.putItem(exercise);
    }

    @Override
    public void update(Exercise exercise) {
        save(exercise);
    }

    @Override
    public void delete(String author, String name) {
        Key key = Key.builder().partitionValue(author).sortValue(name).build();
        exerciseTable.deleteItem(key);
    }
}