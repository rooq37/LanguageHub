package com.zrcaw.langshub.controller.learning;

import com.zrcaw.langshub.dto.exercise.ExerciseDTO;
import com.zrcaw.langshub.dto.learning.SolutionDTO;
import com.zrcaw.langshub.dto.message.MessageDTO;
import com.zrcaw.langshub.service.learning.LearningService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learning")
public class LearningController {

    private final LearningService learningService;

    public LearningController(LearningService learningService) {
        this.learningService = learningService;
    }

    @GetMapping
    public ResponseEntity<List<ExerciseDTO>> getAssignedExercises(
            @RequestParam(name = "pupilName") String pupilName) {
        return ResponseEntity.ok(learningService.getAssignedExercises(pupilName));
    }

    @PostMapping
    public ResponseEntity<MessageDTO> updateSolution(@RequestBody SolutionDTO solution) {
        return ResponseEntity.ok(learningService.updateSolution(solution));
    }
}
