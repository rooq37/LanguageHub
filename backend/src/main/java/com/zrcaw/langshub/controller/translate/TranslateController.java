package com.zrcaw.langshub.controller.translate;

import com.zrcaw.langshub.dto.translate.TranslateRequest;
import com.zrcaw.langshub.dto.translate.TranslateResponse;
import com.zrcaw.langshub.service.polly.PollyService;
import com.zrcaw.langshub.service.transcribe.TranscribeService;
import com.zrcaw.langshub.service.translate.TranslateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/translate")
public class TranslateController {

    private final TranslateService translateService;
    private final PollyService pollyService;
    private final TranscribeService transcribeService;

    public TranslateController(TranslateService translateService,
                               PollyService pollyService,
                               TranscribeService transcribeService) {
        this.translateService = translateService;
        this.pollyService = pollyService;
        this.transcribeService = transcribeService;
    }

    @PostMapping("/text")
    public ResponseEntity<TranslateResponse> translateText(@RequestBody TranslateRequest request) {
        return ResponseEntity.ok(translateService.translateText(request));
    }

    @PostMapping("/sound")
    public ResponseEntity<String> transcriptSound(
            @RequestParam(name = "sound") MultipartFile file,
            @RequestParam(name = "language", required = false, defaultValue = "en-US") String language) throws IOException {
        return ResponseEntity.ok(transcribeService.transcribeSound(file.getBytes(), language));
    }

    @GetMapping(value = "/synthesize" + "/{text}")
    public ResponseEntity<String> synthesizeText(
            @PathVariable String text,
            @RequestParam(name = "language", required = false, defaultValue = "en") String language) {
        return ResponseEntity.ok(pollyService.synthesizeEncoded(text, language));
    }

}
