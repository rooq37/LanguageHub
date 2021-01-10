package com.zrcaw.langshub.dao.pupil;

import com.zrcaw.langshub.model.pupil.Pupil;

import java.util.List;
import java.util.Optional;

public interface PupilDao {

    void updatePupil(Pupil pupil);
    List<Pupil> getAllPupils(String tutorName);
    Optional<Pupil> getPupil(String pupilName);

}
