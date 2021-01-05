package com.zrcaw.langshub.model;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbConvertedBy;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;

import java.util.List;

@DynamoDbBean
public class Exercise {

    private String author;
    private String name;
    private ExerciseType type;

    private String text;
    private String question;
    private List<String> acceptableOpenAnswers;
    private List<ClosedAnswer> closedAnswers;

    @DynamoDbPartitionKey
    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    @DynamoDbSortKey
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ExerciseType getType() {
        return type;
    }

    public void setType(ExerciseType type) {
        this.type = type;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<String> getAcceptableOpenAnswers() {
        return acceptableOpenAnswers;
    }

    public void setAcceptableOpenAnswers(List<String> acceptableOpenAnswers) {
        this.acceptableOpenAnswers = acceptableOpenAnswers;
    }

    public List<ClosedAnswer> getClosedAnswers() {
        return closedAnswers;
    }

    public void setClosedAnswers(List<ClosedAnswer> closedAnswers) {
        this.closedAnswers = closedAnswers;
    }

}
