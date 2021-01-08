package com.zrcaw.langshub.dto.translate;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum LanguageCode {

    @JsonProperty("pl") PL("pl"),
    @JsonProperty("en") EN("en");

    private final String value;

    LanguageCode(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static LanguageCode ofValue(String value){
        for(LanguageCode lc : LanguageCode.values()){
            if(value.equals(lc.value)) return lc;
        }
        return null;
    }
}
