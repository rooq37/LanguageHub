package com.zrcaw.langshub.dynamodb_tables;

public class ExerciseTable extends TablesService{

    public void createExerciseTable() {
        String tableName = "Exercises";
        if(isTableCreated(tableName))
            return;

        createTable(tableName, "author", "name");
    }
}
