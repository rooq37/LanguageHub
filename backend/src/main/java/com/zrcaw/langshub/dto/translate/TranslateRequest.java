package com.zrcaw.langshub.dto.translate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TranslateRequest {

    private String sourceLanguageCode;
    private String targetLanguageCode;
    private String text;

}
