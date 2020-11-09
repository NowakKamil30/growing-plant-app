package com.growingplantapp.controllers;


import com.growingplantapp.JsonError;
import com.growingplantapp.builders.JsonErrorBuilder;
import com.growingplantapp.exceptions.BadJwtException;
import com.growingplantapp.exceptions.BadUsernameException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(value = {
            BadJwtException.class,
            BadUsernameException.class,
            NumberFormatException.class})
    public ResponseEntity<List<JsonError>> badDateHandler(BadJwtException badJwtException) {
        List<JsonError> jsonErrorList = List.of(JsonErrorBuilder.aJsonError()
                .withMessage(badJwtException.getMessage())
                .build());
        return new ResponseEntity<>(jsonErrorList, HttpStatus.FORBIDDEN);
    }

}
