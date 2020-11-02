package com.growingplantapp.builders;

import com.growingplantapp.JsonError;

public final class JsonErrorBuilder {
    private String message;
    private String field;

    private JsonErrorBuilder() {
    }

    public static JsonErrorBuilder aJsonError() {
        return new JsonErrorBuilder();
    }

    public JsonErrorBuilder withMessage(String message) {
        this.message = message;
        return this;
    }

    public JsonErrorBuilder withField(String field) {
        this.field = field;
        return this;
    }

    public JsonError build() {
        JsonError jsonError = new JsonError();
        jsonError.setMessage(message);
        jsonError.setField(field);
        return jsonError;
    }
}
