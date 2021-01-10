package com.zrcaw.langshub.dto.pupil;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SingleSolutionDTO {

    private String exerciseName;
    private String groupName;
    private List<SingleAnswerDTO> answers;

}
