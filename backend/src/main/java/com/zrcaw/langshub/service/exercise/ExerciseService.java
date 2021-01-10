package com.zrcaw.langshub.service.exercise;

import com.zrcaw.langshub.dao.exercise.ExerciseDao;
import com.zrcaw.langshub.dao.exercise.ExerciseDaoImpl;
import com.zrcaw.langshub.dto.exercise.ExerciseDTO;
import com.zrcaw.langshub.dto.exercise.ListeningExerciseDTO;
import com.zrcaw.langshub.dto.message.MessageDTO;
import com.zrcaw.langshub.dto.translate.LanguageCode;
import com.zrcaw.langshub.exception.exercise.ExerciseAlreadyExistsException;
import com.zrcaw.langshub.exception.exercise.ExerciseNotFoundException;
import com.zrcaw.langshub.model.exercise.Exercise;
import com.zrcaw.langshub.model.exercise.ExerciseType;
import com.zrcaw.langshub.service.mapper.ExerciseMapper;
import com.zrcaw.langshub.service.polly.PollyService;
import com.zrcaw.langshub.service.s3.S3Service;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExerciseService {

    private final ExerciseDao exerciseDao;
    private final ExerciseMapper exerciseMapper;
    private final PollyService pollyService;
    private final S3Service s3Service;

    public ExerciseService(ExerciseDaoImpl exerciseDao,
                           ExerciseMapper exerciseMapper,
                           PollyService pollyService,
                           S3Service s3Service) {
        this.exerciseDao = exerciseDao;
        this.exerciseMapper = exerciseMapper;
        this.pollyService = pollyService;
        this.s3Service = s3Service;
    }

    public ExerciseDTO getExercise(String author, String name) {
        Exercise exercise = exerciseDao.getExercise(author, name)
                .orElseThrow(() -> new ExerciseNotFoundException(author, name));
        ExerciseDTO dto = exerciseMapper.map(exercise);
        return dto;
    }

    public List<ExerciseDTO> getAllExercises(String author) {
        return exerciseDao.getAllExercises(author).stream().map(exerciseMapper::map)
                .collect(Collectors.toList());
    }

    public List<ExerciseDTO> getGroup(String author, String groupName) {
        return exerciseDao.getGroup(author, groupName).stream().map(exerciseMapper::map)
                .collect(Collectors.toList());
    }

    public MessageDTO createExercise(ExerciseDTO exerciseDTO) {
        if(exerciseDao.getExercise(exerciseDTO.getAuthor(), exerciseDTO.getName()).isPresent())
            throw new ExerciseAlreadyExistsException(exerciseDTO.getAuthor(), exerciseDTO.getName());

        exerciseDao.save(exerciseMapper.map(exerciseDTO));
        if(exerciseDTO instanceof ListeningExerciseDTO) {
            createAndUploadSoundIfRequired(exerciseDTO);
        }
        return new MessageDTO(true, "Pomyślnie utworzono zadanie!");
    }

    public MessageDTO editExercise(ExerciseDTO exerciseDTO) {
        if(exerciseDao.getExercise(exerciseDTO.getAuthor(), exerciseDTO.getName()).isEmpty())
            throw new ExerciseNotFoundException(exerciseDTO.getAuthor(), exerciseDTO.getName());

        exerciseDao.update(exerciseMapper.map(exerciseDTO));
        if(exerciseDTO instanceof ListeningExerciseDTO) {
            createAndUploadSoundIfRequired(exerciseDTO);
        }
        return new MessageDTO(true, "Pomyślnie edytowano zadanie!");
    }

    public MessageDTO deleteExercise(String author, String name) {
        Exercise exercise = exerciseDao.getExercise(author, name)
                .orElseThrow(() -> new ExerciseNotFoundException(author, name));

        exerciseDao.delete(author, name);
        if(exercise.getType().equals(ExerciseType.LISTENING_EXERCISE)) {
            String key = getKey(exercise.getAuthor(), exercise.getName());
            s3Service.deleteObject(key);
        }
        return new MessageDTO(true, "Pomyślnie usunięto zadanie!");
    }

    private void createAndUploadSoundIfRequired(ExerciseDTO dto) {
        if(dto instanceof ListeningExerciseDTO) {
            ListeningExerciseDTO request = (ListeningExerciseDTO) dto;
            byte[] sound = pollyService.synthesize(request.getText(), LanguageCode.EN);
            String key = getKey(request.getAuthor(), request.getName());
            s3Service.uploadObject(key, RequestBody.fromBytes(sound));
        }
    }

    private String getKey(String author, String name) {
        return author + "-" + name;
    }

}

