package com.zrcaw.langshub.service.learning;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.zrcaw.langshub.dao.exercise.ExerciseDaoImpl;
import com.zrcaw.langshub.dao.pupil.PupilDaoImpl;
import com.zrcaw.langshub.dto.learning.*;
import com.zrcaw.langshub.dto.message.MessageDTO;
import com.zrcaw.langshub.exception.exercise.ExerciseNotFoundException;
import com.zrcaw.langshub.exception.learning.ExerciseAlreadySolvedException;
import com.zrcaw.langshub.exception.learning.ExerciseNotAssignedException;
import com.zrcaw.langshub.exception.pupil.PupilNotFoundException;
import com.zrcaw.langshub.model.exercise.Exercise;
import com.zrcaw.langshub.model.pupil.Pupil;
import com.zrcaw.langshub.service.s3.S3Service;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class LearningServiceTest {

    @Mock private PupilDaoImpl pupilDao;
    @Mock private ExerciseDaoImpl exerciseDao;
    @Mock private S3Service s3Service;

    @InjectMocks private LearningService learningService;

    private List<Pupil> pupils;
    private List<Exercise> exercises;

    @BeforeEach
    void setUp() {
        prepareExercises();
        preparePupils();
    }

    @Test
    void getAssignedExercises() {
        //given
        Mockito.when(pupilDao.getPupil("Krzysztof Z"))
                .thenReturn(Optional.of(pupils.get(0)));
        Mockito.when(exerciseDao.getAllExercises("John"))
                .thenReturn(exercises.stream()
                        .filter(exercise -> exercise.getAuthor().equals("John")).collect(Collectors.toList()));

        //when
        List<ExerciseForPupilDTO> result = learningService.getAssignedExercises("Krzysztof Z");

        //then
        assertEquals(6, result.size());
        assertEquals("The exercise number 1", result.get(0).getName());
        assertEquals("The exercise number 2", result.get(1).getName());
        assertEquals("The exercise number 3", result.get(2).getName());
        assertEquals("The exercise number 4", result.get(3).getName());
        assertEquals("The exercise number 5", result.get(4).getName());
        assertEquals("The exercise number 6", result.get(5).getName());

        assertEquals("ClosedQuestionExercise", result.get(0).getType());
        ClosedQuestionExerciseForPupilDTO closedQuestionExerciseForPupilDTO = (ClosedQuestionExerciseForPupilDTO) result.get(0);
        assertTrue(closedQuestionExerciseForPupilDTO.isSolved());
        assertEquals(1, closedQuestionExerciseForPupilDTO.getPercentageScore());
        assertEquals("Przetłumacz słowo pies.", closedQuestionExerciseForPupilDTO.getQuestion());
        assertEquals(3, closedQuestionExerciseForPupilDTO.getAnswers().size());
        assertEquals("Dog", closedQuestionExerciseForPupilDTO.getAnswers().get(0));

        assertEquals("OpenQuestionExercise", result.get(1).getType());
        OpenQuestionExerciseForPupilDTO openQuestionExerciseForPupilDTO = (OpenQuestionExerciseForPupilDTO) result.get(1);
        assertFalse(openQuestionExerciseForPupilDTO.isSolved());
        assertEquals(0, openQuestionExerciseForPupilDTO.getPercentageScore());
        assertEquals("Napisz po angielsku zdanie \"Kocham koty\".", openQuestionExerciseForPupilDTO.getQuestion());

        assertEquals("ListeningExercise", result.get(3).getType());
        ListeningExerciseForPupilDTO listeningExerciseForPupilDTO = (ListeningExerciseForPupilDTO) result.get(3);
        assertFalse(listeningExerciseForPupilDTO.isSolved());
        assertEquals(0, listeningExerciseForPupilDTO.getPercentageScore());
        assertEquals("The sound file is missing!", listeningExerciseForPupilDTO.getEncodedSound());

        assertEquals("SpeakingExercise", result.get(5).getType());
        SpeakingExerciseForPupilDTO speakingExerciseForPupilDTO = (SpeakingExerciseForPupilDTO) result.get(5);
        assertTrue(speakingExerciseForPupilDTO.isSolved());
        assertEquals(1, speakingExerciseForPupilDTO.getPercentageScore());
        assertEquals("I am Andrzej and I was born in Poland", speakingExerciseForPupilDTO.getText());
    }

    @Test
    void getAssignedExercisesWhenPupilDoesntExist() {
        //given
        Mockito.when(pupilDao.getPupil("Marian U"))
                .thenReturn(Optional.empty());

        //when
        Exception exception = assertThrows(PupilNotFoundException.class,
                () -> learningService.getAssignedExercises("Marian U"));

        //then
        assertEquals("The pupil with name Marian U not found!", exception.getMessage());
    }

    @Test
    void updateSolution() {
        //given
        SolutionDTO solutionDTO = new SolutionDTO();
        solutionDTO.setPupilName("Krzysztof Z");
        solutionDTO.setExerciseName("The exercise number 2");
        solutionDTO.setExerciseType("OpenQuestionExercise");
        solutionDTO.setAnswers(Collections.singletonList("I love cats"));
        Mockito.when(pupilDao.getPupil("Krzysztof Z"))
                .thenReturn(Optional.of(pupils.get(0)));
        Mockito.when(exerciseDao.getExercise("John", "The exercise number 2"))
                .thenReturn(Optional.of(exercises.get(1)));

        //when
        MessageDTO result = learningService.updateSolution(solutionDTO);

        //then
        assertEquals("The solution for exercise The exercise number 2 has been added successfully!", result.getMessageText());
        assertTrue(result.isSuccess());
    }

    @Test
    void updateSolutionWhenExerciseIsSolved() {
        //given
        SolutionDTO solutionDTO = new SolutionDTO();
        solutionDTO.setPupilName("Krzysztof Z");
        solutionDTO.setExerciseName("The exercise number 1");
        solutionDTO.setExerciseType("ClosedQuestionExercise");
        solutionDTO.setAnswers(Collections.singletonList("Dog"));
        Mockito.when(pupilDao.getPupil("Krzysztof Z"))
                .thenReturn(Optional.of(pupils.get(0)));
        Mockito.when(exerciseDao.getExercise("John", "The exercise number 1"))
                .thenReturn(Optional.of(exercises.get(1)));

        //when
        Exception exception = assertThrows(ExerciseAlreadySolvedException.class,
                () -> learningService.updateSolution(solutionDTO));

        //then
        assertEquals("Exercise with name The exercise number 1 has already been solved!", exception.getMessage());
    }

    @Test
    void updateSolutionWhenExerciseNotAssigned() {
        //given
        SolutionDTO solutionDTO = new SolutionDTO();
        solutionDTO.setPupilName("Mateusz P");
        solutionDTO.setExerciseName("The exercise number 5");
        solutionDTO.setExerciseType("ClosedQuestionExercise");
        solutionDTO.setAnswers(Collections.singletonList("I was born in Poland"));
        Mockito.when(pupilDao.getPupil("Mateusz P"))
                .thenReturn(Optional.of(pupils.get(1)));
        Mockito.when(exerciseDao.getExercise("John", "The exercise number 5"))
                .thenReturn(Optional.of(exercises.get(4)));

        //when
        Exception exception = assertThrows(ExerciseNotAssignedException.class,
                () -> learningService.updateSolution(solutionDTO));

        //then
        assertEquals("Exercise with name The exercise number 5 is not assigned to you!", exception.getMessage());
    }

    @Test
    void updateSolutionWhenExerciseDoesntExist() {
        //given
        SolutionDTO solutionDTO = new SolutionDTO();
        solutionDTO.setPupilName("Mateusz P");
        solutionDTO.setExerciseName("The exercise number 7");
        solutionDTO.setExerciseType("ClosedQuestionExercise");
        solutionDTO.setAnswers(Collections.singletonList("I was born in Poland"));
        Mockito.when(pupilDao.getPupil("Mateusz P"))
                .thenReturn(Optional.of(pupils.get(1)));
        Mockito.when(exerciseDao.getExercise("John", "The exercise number 7"))
                .thenReturn(Optional.empty());

        //when
        Exception exception = assertThrows(ExerciseNotFoundException.class,
                () -> learningService.updateSolution(solutionDTO));

        //then
        assertEquals("The exercise of author John with name The exercise number 7 doesn't exist!", exception.getMessage());
    }

    @Test
    void updateSolutionWhenPupilDoesntExist() {
        //given
        SolutionDTO solutionDTO = new SolutionDTO();
        solutionDTO.setPupilName("Marian U");
        solutionDTO.setExerciseName("The exercise number 4");
        solutionDTO.setExerciseType("ClosedQuestionExercise");
        solutionDTO.setAnswers(Collections.singletonList("I was born in Poland"));
        Mockito.when(pupilDao.getPupil("Marian U"))
                .thenReturn(Optional.empty());

        //when
        Exception exception = assertThrows(PupilNotFoundException.class,
                () -> learningService.updateSolution(solutionDTO));

        //then
        assertEquals("The pupil with name Marian U not found!", exception.getMessage());
    }

    private void preparePupils() {
        String samplesFile = "classpath:sample-data/pupils.json";
        try {
            File file = ResourceUtils.getFile(samplesFile);
            InputStream is = new FileInputStream(file);
            String json = new String(is.readAllBytes());
            Type listType = new TypeToken<List<Pupil>>() {
            }.getType();
            pupils = new Gson().fromJson(json, listType);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void prepareExercises() {
        String samplesFile = "classpath:sample-data/exercises.json";
        try {
            File file = ResourceUtils.getFile(samplesFile);
            InputStream is = new FileInputStream(file);
            String json = new String(is.readAllBytes());
            Type listType = new TypeToken<List<Exercise>>() {
            }.getType();
            exercises = new Gson().fromJson(json, listType);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
