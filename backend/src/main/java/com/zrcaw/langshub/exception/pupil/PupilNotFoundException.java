package com.zrcaw.langshub.exception.pupil;

public class PupilNotFoundException extends RuntimeException {

    public PupilNotFoundException(String tutorName, String pupilName) {
        super("The pupil of the tutor " + tutorName + " with name " + pupilName + " not found!");
    }

}
