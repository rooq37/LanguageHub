package com.zrcaw.langshub.exception.exercise;

public class ExerciseNotFoundException extends RuntimeException {

    public ExerciseNotFoundException(String author, String name) {
        super("The exercise of author " + author + " with name " + name + " doesn't exist!");
    }

}
