package com.zrcaw.langshub.service.pupil;

import com.zrcaw.langshub.dao.pupil.PupilDao;
import com.zrcaw.langshub.dao.pupil.PupilDaoImpl;
import com.zrcaw.langshub.dto.message.MessageDTO;
import com.zrcaw.langshub.dto.pupil.PupilDTO;
import com.zrcaw.langshub.exception.pupil.PupilNotFoundException;
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

    public MessageDTO assignGroup(String tutorName, String pupilName, String groupName) {
        pupilDao.assignGroup(tutorName, pupilName, groupName);
        return new MessageDTO(true,
                "Assigning the group " + groupName +  " to the pupil " + pupilName + " was successful!");
    }

    public MessageDTO withdrawGroup(String tutorName, String pupilName, String groupName) {
        pupilDao.withdrawGroup(tutorName, pupilName, groupName);
        return new MessageDTO(true,
                "Withdrawing the group " + groupName + " from the pupil " + pupilName + " was successful!");
    }
}
