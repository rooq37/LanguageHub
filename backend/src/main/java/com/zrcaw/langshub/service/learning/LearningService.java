package com.zrcaw.langshub.service.learning;

import com.zrcaw.langshub.dao.exercise.ExerciseDao;
import com.zrcaw.langshub.dao.exercise.ExerciseDaoImpl;
import com.zrcaw.langshub.dao.pupil.PupilDao;
import com.zrcaw.langshub.dao.pupil.PupilDaoImpl;
import com.zrcaw.langshub.dto.exercise.ExerciseDTO;
import com.zrcaw.langshub.dto.learning.SolutionDTO;
import com.zrcaw.langshub.dto.message.MessageDTO;
import com.zrcaw.langshub.exception.exercise.ExerciseNotFoundException;
import com.zrcaw.langshub.exception.pupil.PupilNotFoundException;
import com.zrcaw.langshub.model.exercise.ClosedAnswer;
import com.zrcaw.langshub.model.exercise.Exercise;
import com.zrcaw.langshub.model.pupil.Pupil;
import com.zrcaw.langshub.model.pupil.SingleAnswer;
import com.zrcaw.langshub.model.pupil.Solution;
import com.zrcaw.langshub.service.mapper.ExerciseMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LearningService {

    private final PupilDao pupilDao;
    private final ExerciseDao exerciseDao;
    private final ExerciseMapper exerciseMapper;

    public LearningService(PupilDaoImpl pupilDaoImpl,
                           ExerciseDaoImpl exerciseDaoImpl,
                           ExerciseMapper exerciseMapper) {
        this.pupilDao = pupilDaoImpl;
        this.exerciseDao = exerciseDaoImpl;
        this.exerciseMapper = exerciseMapper;
    }

    public List<ExerciseDTO> getAssignedExercises(String pupilName) {
        Pupil pupil = pupilDao.getPupil(pupilName)
                .orElseThrow(() -> new PupilNotFoundException(pupilName));
        List<String> groups = pupil.getExerciseGroups();
        List<Exercise> exercises = new ArrayList<>();
        for(String group : groups){
            exercises.addAll(exerciseDao.getGroup(pupil.getTutorName(), group));
        }
        return exercises.stream().map(exerciseMapper::map).collect(Collectors.toList());
    }

    public MessageDTO updateSolution(SolutionDTO solutionDTO) {
        Pupil pupil = pupilDao.getPupil(solutionDTO.getPupilName())
                .orElseThrow(() -> new PupilNotFoundException(solutionDTO.getPupilName()));
        Exercise exercise = exerciseDao.getExercise(pupil.getTutorName(), solutionDTO.getExerciseName())
                .orElseThrow(() -> new ExerciseNotFoundException(pupil.getTutorName(), solutionDTO.getExerciseName()));

        if(pupil.getSolutions().stream().map(Solution::getExerciseName).collect(Collectors.toList())
                .contains(solutionDTO.getExerciseName())) {
            for(Solution solution : pupil.getSolutions()) {
                if(solution.getExerciseName().equals(solutionDTO.getExerciseName())) {
                    solution.setAnswers(parseAnswers(solutionDTO.getAnswers(), exercise));
                }
            }
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
                case OPEN_QUESTION_EXERCISE:
                    singleAnswer.setCorrect(exercise.getAcceptableOpenAnswers().contains(answer));
                    break;
                case CLOSED_QUESTION_EXERCISE:
                    singleAnswer
                            .setCorrect(exercise.getClosedAnswers()
                                    .stream().filter(ClosedAnswer::isCorrect).map(ClosedAnswer::getAnswer)
                                    .collect(Collectors.toList())
                            .contains(answer));
                    break;
                case LISTENING_EXERCISE:
                case SPEAKING_EXERCISE:
                    singleAnswer.setCorrect(exercise.getText().equals(answer));
                    break;
            }
            return singleAnswer;
        }).collect(Collectors.toList());
    }
}
