package com.zrcaw.langshub.service.polly;

import com.zrcaw.langshub.dto.translate.LanguageCode;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.polly.PollyClient;
import software.amazon.awssdk.services.polly.model.OutputFormat;
import software.amazon.awssdk.services.polly.model.SynthesizeSpeechRequest;
import software.amazon.awssdk.services.polly.model.VoiceId;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.Base64;

@Service
public class PollyService {

    private static final VoiceId[] PL_VOICES =
            {VoiceId.EWA, VoiceId.MAJA, VoiceId.JACEK, VoiceId.JAN};
    private static final VoiceId[] EN_VOICES =
            {VoiceId.EMMA, VoiceId.BRIAN, VoiceId.KENDRA, VoiceId.KIMBERLY, VoiceId.SALLI, VoiceId.JOEY};

    private static final Region region = Region.US_EAST_1;
    private PollyClient pollyClient;

    @PostConstruct
    public void init() {
        pollyClient = PollyClient.builder().region(region).build();
    }

    public byte[] synthesize(String text, LanguageCode languageCode) {
        VoiceId voiceId = null;
        switch (languageCode) {
            case PL:
                voiceId = PL_VOICES[(int) (Math.random() % PL_VOICES.length)];
                break;
            case EN:
                voiceId = EN_VOICES[(int) (Math.random() % EN_VOICES.length)];
                break;
        }

        SynthesizeSpeechRequest synthesizeSpeechRequest = SynthesizeSpeechRequest.builder()
                .text(text)
                .voiceId(voiceId)
                .outputFormat(OutputFormat.MP3)
                .build();

        byte[] bytes = new byte[1024];
        try {
            bytes = pollyClient.synthesizeSpeech(synthesizeSpeechRequest).readAllBytes();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return bytes;
    }

    public String synthesizeEncoded(String text, String language) {
        LanguageCode languageCode = LanguageCode.ofValue(language);
        byte[] bytes = synthesize(text, languageCode);
        return Base64.getEncoder().encodeToString(bytes);
    }
}
