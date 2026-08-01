package com.devforge.common.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.slf4j.MDC;

import java.time.Instant;

import static com.devforge.common.constant.Constants.CORRELATION_ID_LOG_KEY;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    private final boolean success;
    private final String message;
    private final T data;
    private final Instant timestamp;
    private final String correlationId;
    private final PagedResponse<?> meta;

    public ApiResponse(boolean success, String message, T data, Instant timestamp, String correlationId, PagedResponse<?> meta) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.timestamp = timestamp != null ? timestamp : Instant.now();
        this.correlationId = correlationId;
        this.meta = meta;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public String getCorrelationId() {
        return correlationId;
    }

    public PagedResponse<?> getMeta() {
        return meta;
    }

    public static <T> ApiResponseBuilder<T> builder() {
        return new ApiResponseBuilder<>();
    }

    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.<T>builder()
                .success(true)
                .message("Operation completed successfully")
                .data(data)
                .timestamp(Instant.now())
                .correlationId(MDC.get(CORRELATION_ID_LOG_KEY))
                .build();
    }

    public static <T> ApiResponse<T> success(T data, String message) {
        return ApiResponse.<T>builder()
                .success(true)
                .message(message)
                .data(data)
                .timestamp(Instant.now())
                .correlationId(MDC.get(CORRELATION_ID_LOG_KEY))
                .build();
    }

    public static <T> ApiResponse<T> success(T data, PagedResponse<?> meta) {
        return ApiResponse.<T>builder()
                .success(true)
                .message("Operation completed successfully")
                .data(data)
                .timestamp(Instant.now())
                .correlationId(MDC.get(CORRELATION_ID_LOG_KEY))
                .meta(meta)
                .build();
    }

    public static <T> ApiResponse<T> error(String message) {
        return ApiResponse.<T>builder()
                .success(false)
                .message(message)
                .timestamp(Instant.now())
                .correlationId(MDC.get(CORRELATION_ID_LOG_KEY))
                .build();
    }

    public static class ApiResponseBuilder<T> {
        private boolean success;
        private String message;
        private T data;
        private Instant timestamp;
        private String correlationId;
        private PagedResponse<?> meta;

        public ApiResponseBuilder<T> success(boolean success) {
            this.success = success;
            return this;
        }

        public ApiResponseBuilder<T> message(String message) {
            this.message = message;
            return this;
        }

        public ApiResponseBuilder<T> data(T data) {
            this.data = data;
            return this;
        }

        public ApiResponseBuilder<T> timestamp(Instant timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public ApiResponseBuilder<T> correlationId(String correlationId) {
            this.correlationId = correlationId;
            return this;
        }

        public ApiResponseBuilder<T> meta(PagedResponse<?> meta) {
            this.meta = meta;
            return this;
        }

        public ApiResponse<T> build() {
            return new ApiResponse<>(success, message, data, timestamp, correlationId, meta);
        }
    }
}
