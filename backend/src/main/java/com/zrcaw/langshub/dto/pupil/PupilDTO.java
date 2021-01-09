package com.zrcaw.langshub.dto.pupil;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PupilDTO {

    private String tutorName;
    private String name;
    private List<String> exerciseGroups;
    private List<SingleSolutionDTO> solutions;

}
