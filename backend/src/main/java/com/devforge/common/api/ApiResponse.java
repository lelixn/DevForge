package com.devforge.common.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import org.slf4j.MDC;

import java.time.Instant;

import static com.devforge.common.constant.Constants.CORRELATION_ID_LOG_KEY;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    private final boolean success;
    private final String message;
    private final T data;
    private final Instant timestamp;
    private final String correlationId;
    private final PagedResponse<?> meta;

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
}
