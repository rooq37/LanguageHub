package com.zrcaw.langshub.service.mapper;

import com.zrcaw.langshub.dto.learning.*;
import com.zrcaw.langshub.model.exercise.Exercise;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class ExerciseForPupilMapper {

    private final ModelMapper modelMapper;

    public ExerciseForPupilMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public ExerciseForPupilDTO map(Exercise exercise) {
        switch (exercise.getType()) {
            case OpenQuestionExercise:
                return modelMapper.map(exercise, OpenQuestionExerciseForPupilDTO.class);
            case ClosedQuestionExercise:
                return modelMapper.map(exercise, ClosedQuestionExerciseForPupilDTO.class);
            case ListeningExercise:
                return modelMapper.map(exercise, ListeningExerciseForPupilDTO.class);
            case SpeakingExercise:
                return modelMapper.map(exercise, SpeakingExerciseForPupilDTO.class);
        }
        return null;
    }

}
