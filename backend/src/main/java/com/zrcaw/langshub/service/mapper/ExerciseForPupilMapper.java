package com.zrcaw.langshub.service.mapper;

import com.zrcaw.langshub.dto.learning.*;
import com.zrcaw.langshub.model.exercise.ClosedAnswer;
import com.zrcaw.langshub.model.exercise.Exercise;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

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
                ClosedQuestionExerciseForPupilDTO dto = modelMapper.map(exercise, ClosedQuestionExerciseForPupilDTO.class);
                dto.setAnswers(exercise.getClosedAnswers().stream().map(ClosedAnswer::getAnswer).collect(Collectors.toList()));
                return dto;
            case ListeningExercise:
                return modelMapper.map(exercise, ListeningExerciseForPupilDTO.class);
            case SpeakingExercise:
                return modelMapper.map(exercise, SpeakingExerciseForPupilDTO.class);
        }
        return null;
    }

}
