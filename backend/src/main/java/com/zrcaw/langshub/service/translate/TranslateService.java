package com.zrcaw.langshub.service.translate;

import com.zrcaw.langshub.dto.translate.LanguageCode;
import com.zrcaw.langshub.dto.translate.TranslateRequest;
import com.zrcaw.langshub.dto.translate.TranslateResponse;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.polly.PollyClient;
import software.amazon.awssdk.services.polly.model.OutputFormat;
import software.amazon.awssdk.services.polly.model.SynthesizeSpeechRequest;
import software.amazon.awssdk.services.polly.model.VoiceId;
import software.amazon.awssdk.services.transcribe.TranscribeClient;
import software.amazon.awssdk.services.translate.TranslateClient;
import software.amazon.awssdk.services.translate.model.TranslateTextRequest;
import software.amazon.awssdk.services.translate.model.TranslateTextResponse;

import javax.annotation.PostConstruct;
import java.io.InputStream;

@Service
public class TranslateService {

    private static final Region region = Region.US_EAST_1;

    private TranslateClient translateClient;
    private PollyClient pollyClient;
    private TranscribeClient transcribeClient;

    @PostConstruct
    public void init() {
        translateClient = TranslateClient.builder().region(region).build();
        pollyClient = PollyClient.builder().region(region).build();
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

    public InputStream synthesize(String text) {
        SynthesizeSpeechRequest synthesizeSpeechRequest = SynthesizeSpeechRequest.builder()
                .text(text)
                .voiceId(VoiceId.JACEK)
                .outputFormat(OutputFormat.MP3)
                .build();

        return pollyClient.synthesizeSpeech(synthesizeSpeechRequest);
    }

}
