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
            case OPEN_QUESTION_EXERCISE:
                return modelMapper.map(exercise, OpenQuestionExerciseForPupilDTO.class);
            case CLOSED_QUESTION_EXERCISE:
                return modelMapper.map(exercise, ClosedQuestionExerciseForPupilDTO.class);
            case LISTENING_EXERCISE:
                return modelMapper.map(exercise, ListeningExerciseForPupilDTO.class);
            case SPEAKING_EXERCISE:
                return modelMapper.map(exercise, SpeakingExerciseForPupilDTO.class);
        }
        return null;
    }

}
