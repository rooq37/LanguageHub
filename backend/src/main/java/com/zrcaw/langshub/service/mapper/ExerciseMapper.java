package com.zrcaw.langshub.service.mapper;

import com.zrcaw.langshub.dto.exercise.*;
import com.zrcaw.langshub.model.exercise.Exercise;
import com.zrcaw.langshub.model.exercise.ExerciseType;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class ExerciseMapper {

    private final ModelMapper modelMapper;

    public ExerciseMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public Exercise map(ExerciseDTO dto) {
        Exercise exercise = modelMapper.map(dto, Exercise.class);
        ExerciseType type = ExerciseType.ofValue(dto.getClass().getSimpleName().replace("DTO", ""));
        exercise.setType(type);
        return exercise;
    }

    public ExerciseDTO map(Exercise exercise) {
        switch (exercise.getType()) {
            case OpenQuestionExercise:
                return modelMapper.map(exercise, OpenQuestionExerciseDTO.class);
            case ClosedQuestionExercise:
                return modelMapper.map(exercise, ClosedQuestionExerciseDTO.class);
            case ListeningExercise:
                return modelMapper.map(exercise, ListeningExerciseDTO.class);
            case SpeakingExercise:
                return modelMapper.map(exercise, SpeakingExerciseDTO.class);
        }
        return null;
    }
}
