package com.zrcaw.langshub.dto.exercise;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PupilAssignInformationDTO {

    private String pupilName;
    private boolean isAssigned;
    private boolean isSolved;

}
