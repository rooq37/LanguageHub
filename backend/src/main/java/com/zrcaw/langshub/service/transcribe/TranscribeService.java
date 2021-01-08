package com.zrcaw.langshub.service.transcribe;

import com.zrcaw.langshub.service.s3.S3Service;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.transcribe.TranscribeClient;
import software.amazon.awssdk.services.transcribe.model.*;

import javax.annotation.PostConstruct;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.TargetDataLine;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;

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
        System.out.println("TRANSKRYPCJA ROZPOCZENTA");
        System.out.println(sound);
        byte[] bytes = Base64.getDecoder().decode(sound);
        String key = generateKey();
        s3Service.uploadObject(key, RequestBody.fromBytes(bytes));

        String inputUrl = s3Service.getObjectUri(key);
        System.out.println("INPUT URL: " + inputUrl);

        Media media = Media.builder()
                .mediaFileUri(s3Service.getObjectUri(key))
                .build();

        StartTranscriptionJobRequest request = StartTranscriptionJobRequest.builder()
                .media(media)
                .languageCode(language)
                .transcriptionJobName(key)
                .mediaFormat("mp3")
                .build();

        transcribeClient.startTranscriptionJob(request);

        String uri = getTranscriptFileUri(key);


        return uri;
    }

    private String generateKey() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("ddMMyyyyhhmmss");
        return "transcription-" + simpleDateFormat.format(new Date());
    }

    private String getTranscriptFileUri(String key) {
        GetTranscriptionJobRequest jobRequest = GetTranscriptionJobRequest.builder()
                .transcriptionJobName(key)
                .build();

        TranscriptionJob transcriptionJob;

        while( true ){
            transcriptionJob = transcribeClient.getTranscriptionJob(jobRequest).transcriptionJob();
            if( transcriptionJob.transcriptionJobStatus().equals(TranscriptionJobStatus.COMPLETED) ){
                return transcriptionJob.transcript().transcriptFileUri();
            }else if( transcriptionJob.transcriptionJobStatus().equals(TranscriptionJobStatus.FAILED) ){
                System.out.println(transcriptionJob.failureReason());
                return "FAILURE";
            }
            wait(1);
        }
    }

    private void wait(int seconds) {
        try {
            Thread.sleep(seconds * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
