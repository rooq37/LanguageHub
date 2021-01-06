package com.zrcaw.langshub.exception.exercise;

public class ExerciseAlreadyExistsException extends RuntimeException {

    public ExerciseAlreadyExistsException(String author, String name) {
        super("Zadanie o nazwie " + name + " dla autora " + author + " już istnieje!");
    }

}
