package com.zrcaw.langshub.model.exercise;

public enum ExerciseType {

    OpenQuestionExercise("OpenQuestionExercise"),
    ClosedQuestionExercise("ClosedQuestionExercise"),
    SpeakingExercise("SpeakingExercise"),
    ListeningExercise("ListeningExercise");

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
