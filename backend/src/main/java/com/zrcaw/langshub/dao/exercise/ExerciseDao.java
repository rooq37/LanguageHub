package com.zrcaw.langshub.dao.exercise;

import com.zrcaw.langshub.model.exercise.Exercise;

import java.util.List;
import java.util.Optional;

public interface ExerciseDao {

    Optional<Exercise> getExercise(String author, String name);
    List<Exercise> getAllExercises(String author);
    List<Exercise> getGroup(String author, String groupName);
    List<String> getAllGroups(String author);
    void save(Exercise exercise);
    void update(Exercise exercise);
    void delete(String author, String name);

}
