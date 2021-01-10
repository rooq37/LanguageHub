package com.zrcaw.langshub.exception.learning;

public class ExerciseAlreadySolvedException extends RuntimeException {

    public ExerciseAlreadySolvedException(String exerciseName) {
        super("Exercise with name " + exerciseName + " has already been solved!");
    }

}
