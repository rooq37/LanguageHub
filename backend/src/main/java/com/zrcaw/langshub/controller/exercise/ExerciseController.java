package com.zrcaw.langshub.controller.exercise;

import com.zrcaw.langshub.dto.exercise.ExerciseDTO;
import com.zrcaw.langshub.dto.message.MessageDTO;
import com.zrcaw.langshub.service.exercise.ExerciseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping
    public ResponseEntity getExercise(
            @RequestParam(name = "author", required = true) String author,
            @RequestParam(name = "name", required = false) String name) {
        if(name == null || name.isEmpty()) {
            return ResponseEntity.ok(exerciseService.getAllExercises(author));
        } else {
            return ResponseEntity.ok(exerciseService.getExercise(author, name));
        }
    }

    @PostMapping
    public ResponseEntity<MessageDTO> createExercise(@RequestBody ExerciseDTO request) {
        return ResponseEntity.ok(exerciseService.createExercise(request));
    }

    @PutMapping
    public ResponseEntity<MessageDTO> editExercise(@RequestBody ExerciseDTO request) {
        return ResponseEntity.ok(exerciseService.editExercise(request));
    }

    @DeleteMapping
    public ResponseEntity<MessageDTO> deleteExercise(
            @RequestParam(name = "author") String author,
            @RequestParam(name = "name") String name) {
        return ResponseEntity.ok(exerciseService.deleteExercise(author, name));
    }
}
