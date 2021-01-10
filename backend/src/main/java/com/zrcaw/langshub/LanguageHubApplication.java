package com.zrcaw.langshub;

import com.zrcaw.langshub.dynamodb_tables.ExerciseTable;
import com.zrcaw.langshub.dynamodb_tables.PupilTable;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class LanguageHubApplication {

    public static void main(String[] args) {
        SpringApplication.run(LanguageHubApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void setupTables() {
        ExerciseTable exerciseTable = new ExerciseTable();
        PupilTable pupilTable = new PupilTable();
        exerciseTable.createExerciseTable();
        pupilTable.createPupilTable();
    }
}
