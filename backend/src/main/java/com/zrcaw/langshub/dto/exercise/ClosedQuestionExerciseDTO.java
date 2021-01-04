package com.zrcaw.langshub.dto.exercise;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ClosedQuestionExerciseDTO extends ExerciseDTO {

    private String question;
    private List<ClosedAnswerDTO> closedAnswers;

}
