package com.zrcaw.langshub.service.exercise;

import com.zrcaw.langshub.dao.ExerciseDaoImpl;
import com.zrcaw.langshub.dto.exercise.ExerciseDTO;
import com.zrcaw.langshub.dto.message.MessageDTO;
import com.zrcaw.langshub.exception.exercise.ExerciseNotFoundException;
import com.zrcaw.langshub.model.Exercise;
import com.zrcaw.langshub.service.mapper.ExerciseMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExerciseService {

    private final ExerciseDaoImpl exerciseDao;
    private final ExerciseMapper exerciseMapper;

    public ExerciseService(ExerciseDaoImpl exerciseDao, ExerciseMapper exerciseMapper) {
        this.exerciseDao = exerciseDao;
        this.exerciseMapper = exerciseMapper;
    }

    public ExerciseDTO getExercise(String author, String name) {
        Exercise exercise = exerciseDao.getExercise(author, name)
                .orElseThrow(() -> new ExerciseNotFoundException(author, name));
        return exerciseMapper.map(exercise);
    }

    public List<ExerciseDTO> getAllExercises(String author) {
        return exerciseDao.getAllExercises(author).stream().map(exerciseMapper::map).collect(Collectors.toList());
    }

    public MessageDTO createExercise(ExerciseDTO exerciseDTO) {
        exerciseDao.save(exerciseMapper.map(exerciseDTO));
        return new MessageDTO(true, "Pomyślnie utworzono zadanie!");
    }

    public MessageDTO editExercise(ExerciseDTO exerciseDTO) {
        exerciseDao.update(exerciseMapper.map(exerciseDTO));
        return new MessageDTO(true, "Pomyślnie edytowano zadanie!");
    }

    public MessageDTO deleteExercise(String author, String name) {
        exerciseDao.delete(author, name);
        return new MessageDTO(true, "Pomyślnie usunięto zadanie!");
    }

}

