package com.zrcaw.langshub.dto.learning;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExerciseForPupilDTO {

    private String author;
    private String name;

    @JsonProperty("@type")
    private String type;

}
