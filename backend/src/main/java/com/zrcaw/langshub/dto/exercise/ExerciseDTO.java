package com.zrcaw.langshub.dto.exercise;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME,include = JsonTypeInfo.As.EXISTING_PROPERTY)
@JsonSubTypes({
        @JsonSubTypes.Type(value = OpenQuestionExerciseDTO.class, name = "OpenQuestionExercise"),
        @JsonSubTypes.Type(value = ClosedQuestionExerciseDTO.class, name = "ClosedQuestionExercise"),
        @JsonSubTypes.Type(value = ListeningExerciseDTO.class, name = "ListeningExercise"),
        @JsonSubTypes.Type(value = SpeakingExerciseDTO.class, name = "SpeakingExercise")
})
public abstract class ExerciseDTO {

    private String name;
    private String author;

    @JsonProperty("@type")
    private String type;

    private List<PupilAssignInformationDTO> pupils;

}
