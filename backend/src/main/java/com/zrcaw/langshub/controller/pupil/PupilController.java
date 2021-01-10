package com.zrcaw.langshub.controller.pupil;

import com.zrcaw.langshub.dto.message.MessageDTO;
import com.zrcaw.langshub.dto.pupil.PupilAssignRequest;
import com.zrcaw.langshub.service.pupil.PupilService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pupil")
public class PupilController {

    private final PupilService pupilService;

    public PupilController(PupilService pupilService) {
        this.pupilService = pupilService;
    }

    @GetMapping
    public ResponseEntity getPupils(
            @RequestParam(name = "tutor", required = false, defaultValue = "") String tutorName,
            @RequestParam(name = "pupil", required = false, defaultValue = "") String pupilName) {
        if(pupilName.isEmpty()) {
            return ResponseEntity.ok(pupilService.getPupils(tutorName));
        }else {
            return ResponseEntity.ok(pupilService.getPupil(pupilName));
        }
    }

    @PutMapping("assignations")
    public ResponseEntity<MessageDTO> manageExerciseAssignations(@RequestBody PupilAssignRequest request) {
        return ResponseEntity.ok(pupilService.manageExerciseAssignations(request));
    }

}
