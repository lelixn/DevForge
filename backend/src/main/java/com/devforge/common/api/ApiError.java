package com.devforge.common.api;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiError {

    private final String errorCode;
    private final String message;
    private final int status;
    private final String path;
    private final Instant timestamp;
    private final String correlationId;
    private final List<ValidationErrorDetail> validationErrors;

    public ApiError(String errorCode, String message, int status, String path, Instant timestamp, String correlationId, List<ValidationErrorDetail> validationErrors) {
        this.errorCode = errorCode;
        this.message = message;
        this.status = status;
        this.path = path;
        this.timestamp = timestamp != null ? timestamp : Instant.now();
        this.correlationId = correlationId;
        this.validationErrors = validationErrors;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public String getMessage() {
        return message;
    }

    public int getStatus() {
        return status;
    }

    public String getPath() {
        return path;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public String getCorrelationId() {
        return correlationId;
    }

    public List<ValidationErrorDetail> getValidationErrors() {
        return validationErrors;
    }

    public static ApiErrorBuilder builder() {
        return new ApiErrorBuilder();
    }

    public static class ApiErrorBuilder {
        private String errorCode;
        private String message;
        private int status;
        private String path;
        private Instant timestamp;
        private String correlationId;
        private List<ValidationErrorDetail> validationErrors;

        public ApiErrorBuilder errorCode(String errorCode) {
            this.errorCode = errorCode;
            return this;
        }

        public ApiErrorBuilder message(String message) {
            this.message = message;
            return this;
        }

        public ApiErrorBuilder status(int status) {
            this.status = status;
            return this;
        }

        public ApiErrorBuilder path(String path) {
            this.path = path;
            return this;
        }

        public ApiErrorBuilder timestamp(Instant timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public ApiErrorBuilder correlationId(String correlationId) {
            this.correlationId = correlationId;
            return this;
        }

        public ApiErrorBuilder validationErrors(List<ValidationErrorDetail> validationErrors) {
            this.validationErrors = validationErrors;
            return this;
        }

        public ApiError build() {
            return new ApiError(errorCode, message, status, path, timestamp, correlationId, validationErrors);
        }
    }

    public static class ValidationErrorDetail {
        private final String field;
        private final String message;
        private final Object rejectedValue;

        public ValidationErrorDetail(String field, String message, Object rejectedValue) {
            this.field = field;
            this.message = message;
            this.rejectedValue = rejectedValue;
        }

        public String getField() {
            return field;
        }

        public String getMessage() {
            return message;
        }

        public Object getRejectedValue() {
            return rejectedValue;
        }

        public static ValidationErrorDetailBuilder builder() {
            return new ValidationErrorDetailBuilder();
        }

        public static class ValidationErrorDetailBuilder {
            private String field;
            private String message;
            private Object rejectedValue;

            public ValidationErrorDetailBuilder field(String field) {
                this.field = field;
                return this;
            }

            public ValidationErrorDetailBuilder message(String message) {
                this.message = message;
                return this;
            }

            public ValidationErrorDetailBuilder rejectedValue(Object rejectedValue) {
                this.rejectedValue = rejectedValue;
                return this;
            }

            public ValidationErrorDetail build() {
                return new ValidationErrorDetail(field, message, rejectedValue);
            }
        }
    }
}
