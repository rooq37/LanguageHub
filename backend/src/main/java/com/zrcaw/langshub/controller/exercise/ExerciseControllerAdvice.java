package com.zrcaw.langshub.controller.exercise;

import com.zrcaw.langshub.dto.message.MessageDTO;
import com.zrcaw.langshub.exception.exercise.ExerciseAlreadyExistsException;
import com.zrcaw.langshub.exception.exercise.ExerciseNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ExerciseControllerAdvice {

    @ResponseBody
    @ExceptionHandler(ExerciseNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    MessageDTO exerciseNotFoundHandler(ExerciseNotFoundException ex) {
        return new MessageDTO(false, ex.getMessage());
    }

    @ResponseBody
    @ExceptionHandler(ExerciseAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    MessageDTO exerciseAlreadyExistsHandler(ExerciseAlreadyExistsException ex) {
        return new MessageDTO(false, ex.getMessage());
    }

}
