package com.zrcaw.langshub.controller.pupil;

import com.zrcaw.langshub.dto.message.MessageDTO;
import com.zrcaw.langshub.dto.pupil.PupilGroupOperationDTO;
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
            @RequestParam(name = "tutor") String tutorName,
            @RequestParam(name = "pupil", required = false, defaultValue = "") String pupilName) {
        if(pupilName.isEmpty()) {
            return ResponseEntity.ok(pupilService.getPupils(tutorName));
        }else {
            return ResponseEntity.ok(pupilService.getPupil(tutorName, pupilName));
        }
    }

    @PutMapping("/assign")
    public ResponseEntity<MessageDTO> assignPupilToTheGroup(@RequestBody PupilGroupOperationDTO request) {
        return ResponseEntity
                .ok(pupilService.assignGroup(request.getTutorName(), request.getPupil(), request.getGroupName()));
    }

    @PutMapping("/withdraw")
    public ResponseEntity<MessageDTO> withdrawPupilFromTheGroup(@RequestBody PupilGroupOperationDTO request) {
        return ResponseEntity
                .ok(pupilService.withdrawGroup(request.getTutorName(), request.getPupil(), request.getGroupName()));
    }

}
