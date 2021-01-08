package com.zrcaw.langshub.model.transcribe;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AmazonTranscription {

    private String jobName;
    private String accountId;
    private Result results;
    private String status;

}
