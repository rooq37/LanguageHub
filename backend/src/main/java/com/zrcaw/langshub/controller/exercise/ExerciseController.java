package com.zrcaw.langshub.controller.exercise;

import com.zrcaw.langshub.dto.exercise.ExerciseDTO;
import com.zrcaw.langshub.dto.message.MessageDTO;
import com.zrcaw.langshub.service.exercise.ExerciseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exercise")
public class ExerciseController {

    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping("/getExercise")
    public ResponseEntity<ExerciseDTO> getExercise(
            @RequestParam(name = "author") String author,
            @RequestParam(name = "name") String name) {
        return ResponseEntity.ok(exerciseService.getExercise(author, name));
    }

    @GetMapping("/getAllExercises")
    public ResponseEntity<List<ExerciseDTO>> getExercises(
            @RequestParam(name = "author") String author) {
        return ResponseEntity.ok(exerciseService.getAllExercises(author));
    }

    @PostMapping("/createExercise")
    public ResponseEntity<MessageDTO> createExercise(@RequestBody ExerciseDTO request) {
        return ResponseEntity.ok(exerciseService.createExercise(request));
    }

    @PutMapping("/editExercise")
    public ResponseEntity<MessageDTO> editExercise(@RequestBody ExerciseDTO request) {
        return ResponseEntity.ok(exerciseService.editExercise(request));
    }

    @DeleteMapping("/deleteExercise")
    public ResponseEntity<MessageDTO> deleteExercise(
            @RequestParam(name = "author") String author,
            @RequestParam(name = "name") String name) {
        return ResponseEntity.ok(exerciseService.deleteExercise(author, name));
    }
}
