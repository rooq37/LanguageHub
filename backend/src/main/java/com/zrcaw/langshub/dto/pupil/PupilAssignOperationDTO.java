package com.zrcaw.langshub.dto.pupil;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PupilAssignOperationDTO {

    private String tutorName;
    private String exerciseName;
    private List<PupilAssignInformationDTO> pupilList;

}
