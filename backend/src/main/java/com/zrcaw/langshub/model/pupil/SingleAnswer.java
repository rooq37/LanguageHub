package com.zrcaw.langshub.model.pupil;

import lombok.Getter;
import lombok.Setter;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;

@DynamoDbBean
@Getter
@Setter
public class SingleAnswer {

    private String answer;
    private boolean isCorrect;

}
