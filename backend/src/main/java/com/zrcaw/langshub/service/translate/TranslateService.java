package com.zrcaw.langshub.service.translate;

import com.zrcaw.langshub.dto.translate.TranslateRequest;
import com.zrcaw.langshub.dto.translate.TranslateResponse;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.transcribe.TranscribeClient;
import software.amazon.awssdk.services.translate.TranslateClient;
import software.amazon.awssdk.services.translate.model.TranslateTextRequest;
import software.amazon.awssdk.services.translate.model.TranslateTextResponse;

import javax.annotation.PostConstruct;

@Service
public class TranslateService {

    private static final Region region = Region.US_EAST_1;

    private TranslateClient translateClient;
    private TranscribeClient transcribeClient;

    @PostConstruct
    public void init() {
        translateClient = TranslateClient.builder().region(region).build();
        transcribeClient = TranscribeClient.builder().region(region).build();
    }

    public TranslateResponse translateText(TranslateRequest request) {
        TranslateResponse response = new TranslateResponse();

        TranslateTextRequest textRequest = TranslateTextRequest.builder()
                .sourceLanguageCode(request.getSourceLanguageCode().getValue())
                .targetLanguageCode(request.getTargetLanguageCode().getValue())
                .text(request.getText())
                .build();

        TranslateTextResponse textResponse = translateClient.translateText(textRequest);
        response.setTranslatedText(textResponse.translatedText());

        return response;
    }

}
