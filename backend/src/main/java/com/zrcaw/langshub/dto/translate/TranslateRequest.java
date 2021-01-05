package com.zrcaw.langshub.dto.translate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TranslateRequest {

    private LanguageCode sourceLanguageCode;
    private LanguageCode targetLanguageCode;
    private String text;

}
