package com.growingplantapp.controllers;


import com.growingplantapp.JsonError;
import com.growingplantapp.builders.JsonErrorBuilder;
import com.growingplantapp.exceptions.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;
import java.util.Map;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class ExceptionHandlerController {
    Logger logger = LoggerFactory.getLogger(ExceptionHandlerController.class);

    @ExceptionHandler(value = {
            BadJwtException.class,
            BadUsernameException.class,
            NumberFormatException.class,
            EmailSendException.class,
            UserExistException.class})
    public ResponseEntity<List<JsonError>> badDateHandler(Exception exception) {
        logger.debug("badDateHandler");
        List<JsonError> jsonErrorList = List.of(JsonErrorBuilder.aJsonError()
                .withMessage(exception.getMessage())
                .build());
        return new ResponseEntity<>(jsonErrorList, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(value = {
            BadTokenException.class,
            BadBodyException.class,
    })
    public ResponseEntity<Map<String, Boolean>> responseMapWithFalseValue(ExceptionMapWithFalseValue exception) {
        logger.debug("responseMapWithFalseValue");
        return ResponseEntity.badRequest()
                .body(Map.of(exception.getMapArgName(), false));
    }

}
