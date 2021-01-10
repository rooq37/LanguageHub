package com.zrcaw.langshub.exception.exercise;

public class ExerciseAlreadyExistsException extends RuntimeException {

    public ExerciseAlreadyExistsException(String author, String name) {
        super("The exercise with name " + name + " for author " + author + " already exists!");
    }

}
