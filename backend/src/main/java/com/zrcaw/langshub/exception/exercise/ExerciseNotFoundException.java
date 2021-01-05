package com.zrcaw.langshub.exception.exercise;

public class ExerciseNotFoundException extends RuntimeException {

    public ExerciseNotFoundException(String author, String name) {
        super("Nie znaleziono zadania autora " + author + " o nazwie " + name + "!");
    }

}
