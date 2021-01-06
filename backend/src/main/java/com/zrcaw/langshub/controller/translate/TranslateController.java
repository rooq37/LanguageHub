package com.zrcaw.langshub.controller.translate;

import com.zrcaw.langshub.dto.translate.TranslateRequest;
import com.zrcaw.langshub.dto.translate.TranslateResponse;
import com.zrcaw.langshub.service.translate.TranslateService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/api/translate")
public class TranslateController {

    private final TranslateService translateService;

    public TranslateController(TranslateService translateService) {
        this.translateService = translateService;
    }

    @PostMapping("/text")
    public ResponseEntity<TranslateResponse> translateText(@RequestBody TranslateRequest request) {
        return ResponseEntity.ok(translateService.translateText(request));
    }

//    @PostMapping("/sound")
//    public ResponseEntity<TranslateResponse> translateSound() {
//
//    }

//    @GetMapping(value = "/synthesize" + "/{text}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
//    public ResponseEntity synthesizeText(@PathVariable String text) throws IOException {
//        InputStream stream = translateService.synthesize(text);
//        return ResponseEntity.ok(stream.readAllBytes());
//    }

}
