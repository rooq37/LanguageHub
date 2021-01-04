package com.zrcaw.langshub.dynamodb_tables;

public class ExerciseTable extends TablesService{

    public boolean createExerciseTable() {
        String tableName = "Exercises";
        if(isTableCreated(tableName))
            return true;

        createTable(tableName, "author", "name");
        return true;
    }
}
