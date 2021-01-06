package com.zrcaw.langshub.dynamodb_tables;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.zrcaw.langshub.model.Exercise;
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

public class ExerciseTable extends TablesService {

    private String tableName = "Exercises";
    private String samplesFile = "classpath:sample-data/exercises.json";
    private DynamoDbEnhancedClient enhancedClient = DynamoDbEnhancedClient.builder().dynamoDbClient(ddb).build();
    private DynamoDbTable<Exercise> exerciseTable = enhancedClient.table("Exercises", TableSchema.fromBean(Exercise.class));

    public void createExerciseTable() {
        boolean dropTables = Boolean.parseBoolean(BeanUtil.getProperty("drop.tables"));
        boolean putSamples = Boolean.parseBoolean(BeanUtil.getProperty("put.samples"));
        if (isTableCreated(tableName)) {
            if (dropTables) {
                deleteTable(tableName);
                createTable(tableName, "author", "name");
            }
        } else
            createTable(tableName, "author", "name");
        if (putSamples)
            putSampleData();
    }

    private void putSampleData() {
        try {
            File file = ResourceUtils.getFile(samplesFile);
            InputStream is = new FileInputStream(file);
            String json = new String(is.readAllBytes());
            Type listType = new TypeToken<List<Exercise>>() {
            }.getType();
            List<Exercise> exercises = new Gson().fromJson(json, listType);
            exercises.forEach(exercise -> exerciseTable.putItem(exercise));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
