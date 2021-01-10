package com.zrcaw.langshub.service.exercise;

import com.zrcaw.langshub.dao.exercise.ExerciseDao;
import com.zrcaw.langshub.dao.exercise.ExerciseDaoImpl;
import com.zrcaw.langshub.dao.pupil.PupilDao;
import com.zrcaw.langshub.dao.pupil.PupilDaoImpl;
import com.zrcaw.langshub.dto.exercise.ExerciseDTO;
import com.zrcaw.langshub.dto.exercise.ListeningExerciseDTO;
import com.zrcaw.langshub.dto.exercise.PupilAssignInformationDTO;
import com.zrcaw.langshub.dto.message.MessageDTO;
import com.zrcaw.langshub.dto.translate.LanguageCode;
import com.zrcaw.langshub.exception.exercise.ExerciseAlreadyExistsException;
import com.zrcaw.langshub.exception.exercise.ExerciseNotFoundException;
import com.zrcaw.langshub.model.exercise.Exercise;
import com.zrcaw.langshub.model.exercise.ExerciseType;
import com.zrcaw.langshub.model.pupil.AssignedExercise;
import com.zrcaw.langshub.model.pupil.Pupil;
import com.zrcaw.langshub.service.mapper.ExerciseMapper;
import com.zrcaw.langshub.service.polly.PollyService;
import com.zrcaw.langshub.service.s3.S3Service;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExerciseService {

    private final ExerciseDao exerciseDao;
    private final ExerciseMapper exerciseMapper;
    private final PollyService pollyService;
    private final S3Service s3Service;
    private final PupilDao pupilDao;

    public ExerciseService(ExerciseDaoImpl exerciseDao,
                           ExerciseMapper exerciseMapper,
                           PollyService pollyService,
                           S3Service s3Service,
                           PupilDaoImpl pupilDaoImpl) {
        this.exerciseDao = exerciseDao;
        this.exerciseMapper = exerciseMapper;
        this.pollyService = pollyService;
        this.s3Service = s3Service;
        this.pupilDao = pupilDaoImpl;
    }

    public ExerciseDTO getExercise(String author, String name) {
        Exercise exercise = exerciseDao.getExercise(author, name)
                .orElseThrow(() -> new ExerciseNotFoundException(author, name));
        ExerciseDTO dto = exerciseMapper.map(exercise);
        setPupilAssignInformation(dto);
        return dto;
    }

    public List<ExerciseDTO> getAllExercises(String author) {
        List<ExerciseDTO> exercises = exerciseDao.getAllExercises(author).stream().map(exerciseMapper::map)
                .collect(Collectors.toList());
        exercises.forEach(this::setPupilAssignInformation);
        return exercises;
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
        if(exercise.getType().equals(ExerciseType.ListeningExercise)) {
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

    private void setPupilAssignInformation(ExerciseDTO dto) {
        List<Pupil> pupils = pupilDao.getAllPupils(dto.getAuthor());
        dto.setPupils(
        pupils.stream().map(pupil -> {
            Optional<AssignedExercise> assignedExercise = pupil.getAssignedExercises()
                    .stream().filter(ex -> ex.getExerciseName().equals(dto.getName())).findFirst();
            if(assignedExercise.isPresent()) {
                return new PupilAssignInformationDTO(pupil.getName(), true, assignedExercise.get().getAnswers() != null);
            } else {
                return new PupilAssignInformationDTO(pupil.getName(), false, false);
            }
        }).collect(Collectors.toList()));
    }

}

