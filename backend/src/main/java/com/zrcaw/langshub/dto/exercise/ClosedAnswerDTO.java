package com.zrcaw.langshub.dto.exercise;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ClosedAnswerDTO {

    private String answer;
    private boolean isCorrect;

}
