package com.zrcaw.langshub.dto.message;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class MessageDTO {

    private boolean success;
    private String messageText;

}
