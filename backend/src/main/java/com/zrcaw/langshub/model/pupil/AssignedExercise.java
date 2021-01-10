package com.zrcaw.langshub.model.pupil;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;

import java.util.List;

@DynamoDbBean
@Getter
@Setter
@NoArgsConstructor
public class AssignedExercise {

    private String exerciseName;
    private List<SingleAnswer> answers;

    public AssignedExercise(String exerciseName) {
        this.exerciseName = exerciseName;
    }
}
