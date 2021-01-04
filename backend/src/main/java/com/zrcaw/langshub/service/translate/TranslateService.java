package com.zrcaw.langshub.service.translate;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.polly.AmazonPolly;
import com.amazonaws.services.polly.AmazonPollyClient;
import com.amazonaws.services.polly.model.OutputFormat;
import com.amazonaws.services.polly.model.SynthesizeSpeechRequest;
import com.amazonaws.services.polly.model.SynthesizeSpeechResult;
import com.amazonaws.services.polly.model.VoiceId;
import com.amazonaws.services.transcribe.AmazonTranscribe;
import com.amazonaws.services.transcribe.AmazonTranscribeClient;
import com.amazonaws.services.translate.AmazonTranslate;
import com.amazonaws.services.translate.AmazonTranslateClient;
import com.amazonaws.services.translate.model.TranslateTextRequest;
import com.amazonaws.services.translate.model.TranslateTextResult;
import com.zrcaw.langshub.dto.translate.TranslateRequest;
import com.zrcaw.langshub.dto.translate.TranslateResponse;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.InputStream;

@Service
public class TranslateService {

    private AmazonTranslate translateClient;
    private AmazonPolly pollyClient;
    private AmazonTranscribe transcribeClient;

    @PostConstruct
    public void init() {
        AWSCredentialsProvider awsCreds = DefaultAWSCredentialsProviderChain.getInstance();

        translateClient = AmazonTranslateClient.builder()
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds.getCredentials()))
                .withRegion(Regions.US_EAST_1)
                .build();

        pollyClient = AmazonPollyClient.builder()
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds.getCredentials()))
                .withRegion(Regions.US_EAST_1)
                .build();

        transcribeClient = AmazonTranscribeClient.builder()
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds.getCredentials()))
                .withRegion(Regions.US_EAST_1)
                .build();
    }

    public TranslateResponse translateText(TranslateRequest request) {
        TranslateResponse response = new TranslateResponse();

        TranslateTextRequest req = new TranslateTextRequest()
                .withText(request.getText())
                .withSourceLanguageCode(request.getSourceLanguageCode())
                .withTargetLanguageCode(request.getTargetLanguageCode());
        TranslateTextResult result  = translateClient.translateText(req);
        response.setTranslatedText(result.getTranslatedText());

        return response;
    }

    public InputStream synthesize(String text) {
        SynthesizeSpeechRequest synthReq =
                new SynthesizeSpeechRequest().withText(text).withVoiceId(VoiceId.Jacek).withOutputFormat(OutputFormat.Mp3);
        SynthesizeSpeechResult synthRes = pollyClient.synthesizeSpeech(synthReq);

        return synthRes.getAudioStream();
    }

}
