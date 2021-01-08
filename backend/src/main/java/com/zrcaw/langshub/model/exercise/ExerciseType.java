package com.zrcaw.langshub.model.exercise;

public enum ExerciseType {

    OPEN_QUESTION_EXERCISE("OpenQuestionExerciseDTO"),
    CLOSED_QUESTION_EXERCISE("ClosedQuestionExerciseDTO"),
    SPEAKING_EXERCISE("SpeakingExerciseDTO"),
    LISTENING_EXERCISE("ListeningExerciseRequest");

    private final String value;

    ExerciseType(String value) {
        this.value = value;
    }

    public static ExerciseType ofValue(String value){
        for(ExerciseType e : ExerciseType.values()){
            if(value.equals(e.value)) return e;
        }
        return null;
    }
}
