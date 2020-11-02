package com.growingplantapp.controllers;

import com.growingplantapp.JsonError;
import com.growingplantapp.builders.JsonErrorBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;

@ControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(NumberFormatException.class)
    public ResponseEntity<List<JsonError>> numberFormatHandler(NumberFormatException numberFormatException) {
        List<JsonError> jsonErrorList = List.of(JsonErrorBuilder.aJsonError()
                .withMessage(numberFormatException.getMessage())
                .build());
        return ResponseEntity.badRequest().body(jsonErrorList);
    }
}
