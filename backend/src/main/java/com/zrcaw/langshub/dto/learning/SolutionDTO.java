package com.zrcaw.langshub.dto.learning;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SolutionDTO {

    private String pupilName;
    private String exerciseName;
    private String exerciseType;
    private List<String> answers;

}
