package com.zrcaw.langshub.service.mapper;

import com.zrcaw.langshub.dto.pupil.PupilDTO;
import com.zrcaw.langshub.model.pupil.Pupil;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class PupilMapper {

    private final ModelMapper modelMapper;

    public PupilMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public PupilDTO map(Pupil pupil) {
        return modelMapper.map(pupil, PupilDTO.class);
    }
}
