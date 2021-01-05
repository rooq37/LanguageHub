package com.zrcaw.langshub.dto.exercise;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ExerciseGroupDTO {

    private String name;
    private String author;
    private List<ExerciseDTO> exerciseList;

}
