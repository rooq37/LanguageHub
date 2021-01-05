package com.zrcaw.langshub.dao;

import com.zrcaw.langshub.model.Exercise;

import java.util.List;
import java.util.Optional;

public interface ExerciseDao {

    Optional<Exercise> getExercise(String author, String name);
    List<Exercise> getAllExercises(String author);
    void save(Exercise exercise);
    void update(Exercise exercise);
    void delete(String author, String name);

}
