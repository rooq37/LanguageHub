package com.zrcaw.langshub.exception.learning;

public class ExerciseNotAssignedException extends RuntimeException {

    public ExerciseNotAssignedException(String exerciseName) {
        super("Exercise with name " + exerciseName + " is not assigned to you!");
    }

}
