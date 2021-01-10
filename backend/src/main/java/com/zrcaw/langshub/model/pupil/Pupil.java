package com.zrcaw.langshub.model.pupil;

import lombok.Getter;
import lombok.Setter;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;

import java.util.List;

@DynamoDbBean
@Getter
@Setter
public class Pupil {

    private String name;
    private String tutorName;
    private List<AssignedExercise> assignedExercises;

    @DynamoDbPartitionKey
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTutorName() {
        return tutorName;
    }

    public void setTutorName(String tutorName) {
        this.tutorName = tutorName;
    }

    public List<AssignedExercise> getAssignedExercises() {
        return assignedExercises;
    }

    public void setAssignedExercises(List<AssignedExercise> assignedExercises) {
        this.assignedExercises = assignedExercises;
    }
}
