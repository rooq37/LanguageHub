package com.zrcaw.langshub.service.pupil;

import com.zrcaw.langshub.dao.pupil.PupilDao;
import com.zrcaw.langshub.dao.pupil.PupilDaoImpl;
import com.zrcaw.langshub.dto.message.MessageDTO;
import com.zrcaw.langshub.dto.pupil.PupilAssignRequest;
import com.zrcaw.langshub.dto.pupil.PupilDTO;
import com.zrcaw.langshub.exception.pupil.PupilNotFoundException;
import com.zrcaw.langshub.model.pupil.AssignedExercise;
import com.zrcaw.langshub.model.pupil.Pupil;
import com.zrcaw.langshub.service.mapper.PupilMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PupilService {

    private final PupilDao pupilDao;
    private final PupilMapper pupilMapper;

    public PupilService(PupilDaoImpl pupilDaoImpl,
                        PupilMapper pupilMapper) {
        this.pupilDao = pupilDaoImpl;
        this.pupilMapper = pupilMapper;
    }

    public PupilDTO getPupil(String pupilName) {
        Pupil pupil = pupilDao.getPupil(pupilName)
                .orElseThrow(() -> new PupilNotFoundException(pupilName));
        return pupilMapper.map(pupil);
    }

    public List<PupilDTO> getPupils(String tutorName) {
        return pupilDao.getAllPupils(tutorName).stream().map(pupilMapper::map).collect(Collectors.toList());
    }

    public MessageDTO manageExerciseAssignations(PupilAssignRequest request) {
        for(Pupil pupil : pupilDao.getAllPupils(request.getTutorName())) {
            List<String> assignedExercises = pupil.getAssignedExercises().stream()
                    .map(AssignedExercise::getExerciseName).collect(Collectors.toList());
            if(request.getPupilsToAssign().contains(pupil.getName())) {
                if(!assignedExercises.contains(request.getExerciseName())) {
                    pupil.getAssignedExercises().add(new AssignedExercise(request.getExerciseName()));
                }
            } else {
                if(assignedExercises.contains(request.getExerciseName())) {
                    AssignedExercise toRemove = pupil.getAssignedExercises().stream()
                            .filter(x -> x.getExerciseName().equals(request.getExerciseName())).findFirst().get();
                    pupil.getAssignedExercises().remove(toRemove);
                }
            }
            pupilDao.updatePupil(pupil);
        }
        return new MessageDTO(true, "Your pupils assignations have been updated!");
    }
}
