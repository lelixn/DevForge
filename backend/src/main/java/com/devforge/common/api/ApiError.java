package com.devforge.common.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.List;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiError {

    private final String errorCode;
    private final String message;
    private final int status;
    private final String path;
    private final Instant timestamp;
    private final String correlationId;
    private final List<ValidationErrorDetail> validationErrors;

    @Getter
    @Builder
    public static class ValidationErrorDetail {
        private final String field;
        private final String message;
        private final Object rejectedValue;
    }
}
