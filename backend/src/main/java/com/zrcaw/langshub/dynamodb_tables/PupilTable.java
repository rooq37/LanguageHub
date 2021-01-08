package com.zrcaw.langshub.dynamodb_tables;


import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.zrcaw.langshub.model.exercise.Exercise;
import com.zrcaw.langshub.model.pupil.Pupil;
import com.zrcaw.langshub.service.utils.BeanUtil;
import org.springframework.util.ResourceUtils;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.util.List;

public class PupilTable extends TablesService {

    private String tableName = "Pupils";
    private String samplesFile = "classpath:sample-data/pupils.json";
    private DynamoDbEnhancedClient enhancedClient = DynamoDbEnhancedClient.builder().dynamoDbClient(ddb).build();
    private DynamoDbTable<Pupil> pupilsTable = enhancedClient.table(tableName, TableSchema.fromBean(Pupil.class));

    public void createPupilTable() {
        boolean dropTables = Boolean.parseBoolean(BeanUtil.getProperty("drop.tables"));
        boolean putSamples = Boolean.parseBoolean(BeanUtil.getProperty("put.samples"));
        if (isTableCreated(tableName)) {
            if (dropTables) {
                deleteTable(tableName);
                createTable(tableName, "tutorName", "name");
            }
        } else
            createTable(tableName, "tutorName", "name");
        if (putSamples)
            putSampleData();
    }

    private void putSampleData() {
        try {
            File file = ResourceUtils.getFile(samplesFile);
            InputStream is = new FileInputStream(file);
            String json = new String(is.readAllBytes());
            Type listType = new TypeToken<List<Pupil>>() {
            }.getType();
            List<Pupil> pupils = new Gson().fromJson(json, listType);
            pupils.forEach(pupil -> pupilsTable.putItem(pupil));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
