package com.zrcaw.langshub.service.transcribe;

import com.google.gson.Gson;
import com.zrcaw.langshub.model.transcribe.AmazonTranscription;
import com.zrcaw.langshub.model.transcribe.Transcript;
import com.zrcaw.langshub.service.s3.S3Service;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.transcribe.TranscribeClient;
import software.amazon.awssdk.services.transcribe.model.*;

import javax.annotation.PostConstruct;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.stream.Collectors;

@Service
public class TranscribeService {

    private static final Region region = Region.US_EAST_1;

    private final S3Service s3Service;
    private TranscribeClient transcribeClient;

    public TranscribeService(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    @PostConstruct
    public void init() {
        transcribeClient = TranscribeClient.builder().region(region).build();
    }

    public String transcribeSound(String sound, String language) {
        byte[] bytes = Base64.getDecoder().decode(sound);
        String key = generateKey();
        String keyTranscribed = generateResultKey(key);
        s3Service.uploadObject(key, RequestBody.fromBytes(bytes));

        StartTranscriptionJobRequest request = getTranscriptionJobRequest(key, keyTranscribed, language);

        transcribeClient.startTranscriptionJob(request);
        waitUntilTranscriptionIsDone(key);

        String transcription = getTranscription(keyTranscribed);

        s3Service.deleteObject(key);
        s3Service.deleteObject(generateKey());

        return transcription;
    }

    private String generateKey() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("ddMMyyyyhhmmss");
        return "transcription-" + simpleDateFormat.format(new Date());
    }

    private String generateResultKey(String key) {
        return key + "-transcribed";
    }

    private StartTranscriptionJobRequest getTranscriptionJobRequest(String key,
                                                                    String keyTranscribed,
                                                                    String language) {
        Media media = Media.builder()
                .mediaFileUri(s3Service.getObjectUri(key))
                .build();

        return StartTranscriptionJobRequest.builder()
                .media(media)
                .languageCode(language)
                .transcriptionJobName(key)
                .mediaFormat("mp3")
                .outputBucketName(s3Service.getBucketName())
                .outputKey(keyTranscribed)
                .build();
    }

    private boolean waitUntilTranscriptionIsDone(String key) {
        GetTranscriptionJobRequest jobRequest = GetTranscriptionJobRequest.builder()
                .transcriptionJobName(key)
                .build();

        TranscriptionJob transcriptionJob;

        while (true) {
            transcriptionJob = transcribeClient.getTranscriptionJob(jobRequest).transcriptionJob();
            if (transcriptionJob.transcriptionJobStatus().equals(TranscriptionJobStatus.COMPLETED)) {
                return true;
            } else if (transcriptionJob.transcriptionJobStatus().equals(TranscriptionJobStatus.FAILED)) {
                System.out.println(transcriptionJob.failureReason());
                return false;
            }
            wait(100);
        }
    }

    private void wait(int milliseconds) {
        try {
            Thread.sleep(milliseconds);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    private String getTranscription(String keyTranscribed) {
        byte[] result = s3Service.downloadObject(keyTranscribed);
        AmazonTranscription transcription = new Gson().fromJson(new String(result), AmazonTranscription.class);
        return transcription.getResults().getTranscripts().stream().map(Transcript::getTranscript)
                .collect(Collectors.joining(" "));
    }
}
