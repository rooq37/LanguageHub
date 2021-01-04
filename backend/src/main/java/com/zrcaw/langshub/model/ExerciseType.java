package com.zrcaw.langshub.model;

public enum ExerciseType {

    OPEN_QUESTION_EXERCISE("OpenQuestionExercise"),
    CLOSED_QUESTION_EXERCISE("ClosedQuestionExercise"),
    SPEAKING_EXERCISE("SpeakingExercise"),
    LISTENING_EXERCISE("ListeningExercise");

    private final String value;

    private ExerciseType(String value) {
        this.value = value;
    }

    public static ExerciseType ofValue(String value){
        for(ExerciseType e : ExerciseType.values()){
            if(value.equals(e.value)) return e;
        }
        return null;
    }
}
