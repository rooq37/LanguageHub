package com.zrcaw.langshub.dto.learning;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ClosedQuestionExerciseForPupilDTO extends ExerciseForPupilDTO {

    private String question;
    private List<String> answers;

}
