package com.zrcaw.langshub.model.pupil;

import lombok.Getter;
import lombok.Setter;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;

import java.util.List;

@DynamoDbBean
@Getter
@Setter
public class Solution {

    private String exerciseName;
    private String groupName;
    private List<SingleAnswer> answers;

}