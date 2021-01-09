package com.zrcaw.langshub.exception.pupil;

public class PupilNotFoundException extends RuntimeException {

    public PupilNotFoundException(String pupilName) {
        super("The pupil with name " + pupilName + " not found!");
    }

}
