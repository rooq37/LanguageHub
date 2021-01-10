package com.zrcaw.langshub.service.learning;

import com.zrcaw.langshub.dao.exercise.ExerciseDao;
import com.zrcaw.langshub.dao.exercise.ExerciseDaoImpl;
import com.zrcaw.langshub.dao.pupil.PupilDao;
import com.zrcaw.langshub.dao.pupil.PupilDaoImpl;
import com.zrcaw.langshub.dto.learning.ExerciseForPupilDTO;
import com.zrcaw.langshub.dto.learning.ListeningExerciseForPupilDTO;
import com.zrcaw.langshub.dto.learning.SolutionDTO;
import com.zrcaw.langshub.dto.message.MessageDTO;
import com.zrcaw.langshub.exception.exercise.ExerciseNotFoundException;
import com.zrcaw.langshub.exception.learning.ExerciseAlreadySolvedException;
import com.zrcaw.langshub.exception.pupil.PupilNotFoundException;
import com.zrcaw.langshub.model.exercise.ClosedAnswer;
import com.zrcaw.langshub.model.exercise.Exercise;
import com.zrcaw.langshub.model.pupil.Pupil;
import com.zrcaw.langshub.model.pupil.SingleAnswer;
import com.zrcaw.langshub.model.pupil.Solution;
import com.zrcaw.langshub.service.mapper.ExerciseForPupilMapper;
import com.zrcaw.langshub.service.s3.S3Service;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LearningService {

    private final PupilDao pupilDao;
    private final ExerciseDao exerciseDao;
    private final ExerciseForPupilMapper exerciseMapper;
    private final S3Service s3Service;

    public LearningService(PupilDaoImpl pupilDaoImpl,
                           ExerciseDaoImpl exerciseDaoImpl,
                           ExerciseForPupilMapper exerciseForPupilMapper,
                           S3Service s3Service) {
        this.pupilDao = pupilDaoImpl;
        this.exerciseDao = exerciseDaoImpl;
        this.exerciseMapper = exerciseForPupilMapper;
        this.s3Service = s3Service;
    }

    public List<ExerciseForPupilDTO> getAssignedExercises(String pupilName) {
        Pupil pupil = pupilDao.getPupil(pupilName)
                .orElseThrow(() -> new PupilNotFoundException(pupilName));
        List<String> groups = pupil.getExerciseGroups();
        List<String> solved = pupil.getSolutions().stream().map(Solution::getExerciseName).collect(Collectors.toList());
        List<Exercise> exercises = new ArrayList<>();
        for(String group : groups){
            for(Exercise exercise : exerciseDao.getGroup(pupil.getTutorName(), group)) {
                if(!solved.contains(exercise.getName())) {
                    exercises.add(exercise);
                }
            }
        }
        List<ExerciseForPupilDTO> exerciseForPupilDTOS = exercises.stream().map(exerciseMapper::map)
                .collect(Collectors.toList());
        exerciseForPupilDTOS.forEach(this::setSoundIfRequired);
        return exerciseForPupilDTOS;
    }

    public MessageDTO updateSolution(SolutionDTO solutionDTO) {
        Pupil pupil = pupilDao.getPupil(solutionDTO.getPupilName())
                .orElseThrow(() -> new PupilNotFoundException(solutionDTO.getPupilName()));
        Exercise exercise = exerciseDao.getExercise(pupil.getTutorName(), solutionDTO.getExerciseName())
                .orElseThrow(() -> new ExerciseNotFoundException(pupil.getTutorName(), solutionDTO.getExerciseName()));

        if(pupil.getSolutions().stream().map(Solution::getExerciseName).collect(Collectors.toList())
                .contains(solutionDTO.getExerciseName())) {
            throw new ExerciseAlreadySolvedException(solutionDTO.getExerciseName());
        } else {
            Solution newSolution = new Solution();
            newSolution.setExerciseName(exercise.getName());
            newSolution.setGroupName(exercise.getGroupName());
            newSolution.setAnswers(parseAnswers(solutionDTO.getAnswers(), exercise));
            pupil.getSolutions().add(newSolution);
        }

        return new MessageDTO(true, "The solution has been added successfully!");
    }

    private List<SingleAnswer> parseAnswers(List<String> newAnswers, Exercise exercise) {
        return newAnswers.stream().map(answer -> {
            SingleAnswer singleAnswer = new SingleAnswer();
            singleAnswer.setAnswer(answer);
            switch (exercise.getType()) {
                case OpenQuestionExercise:
                    singleAnswer.setCorrect(exercise.getAcceptableOpenAnswers().contains(answer));
                    break;
                case ClosedQuestionExercise:
                    singleAnswer
                            .setCorrect(exercise.getClosedAnswers()
                                    .stream().filter(ClosedAnswer::isCorrect).map(ClosedAnswer::getAnswer)
                                    .collect(Collectors.toList())
                            .contains(answer));
                    break;
                case ListeningExercise:
                case SpeakingExercise:
                    singleAnswer.setCorrect(exercise.getText().equals(answer));
                    break;
            }
            return singleAnswer;
        }).collect(Collectors.toList());
    }

    private void setSoundIfRequired(ExerciseForPupilDTO dto) {
        if(dto instanceof ListeningExerciseForPupilDTO) {
            ListeningExerciseForPupilDTO response = (ListeningExerciseForPupilDTO) dto;
            String key = getKey(dto.getAuthor(), dto.getName());
            String encodedString = Base64.getEncoder().encodeToString(s3Service.downloadObject(key));
            response.setEncodedSound(encodedString);
        }
    }

    private String getKey(String author, String name) {
        return author + "-" + name;
    }
}
