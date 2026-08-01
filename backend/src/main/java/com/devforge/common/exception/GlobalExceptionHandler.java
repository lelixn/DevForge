package com.devforge.common.exception;

import com.devforge.common.api.ApiError;
import com.devforge.common.constant.ErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.time.Instant;
import java.util.List;

import static com.devforge.common.constant.Constants.CORRELATION_ID_LOG_KEY;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ApiError> handleBaseException(BaseException ex, HttpServletRequest request) {
        log.warn("Business Exception [{}]: {}", ex.getErrorCode().getCode(), ex.getMessage());
        return buildErrorResponse(ex.getErrorCode(), ex.getMessage(), request.getRequestURI(), null);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationException(MethodArgumentNotValidException ex, HttpServletRequest request) {
        log.warn("Validation Exception on request to {}", request.getRequestURI());
        List<ApiError.ValidationErrorDetail> validationErrors = ex.getBindingResult().getAllErrors().stream()
                .map(error -> {
                    String fieldName = (error instanceof FieldError fieldError) ? fieldError.getField() : error.getObjectName();
                    Object rejectedValue = (error instanceof FieldError fieldError) ? fieldError.getRejectedValue() : null;
                    return ApiError.ValidationErrorDetail.builder()
                            .field(fieldName)
                            .message(error.getDefaultMessage())
                            .rejectedValue(rejectedValue)
                            .build();
                })
                .toList();

        return buildErrorResponse(ErrorCode.VALIDATION_FAILED, ErrorCode.VALIDATION_FAILED.getMessage(), request.getRequestURI(), validationErrors);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiError> handleConstraintViolation(ConstraintViolationException ex, HttpServletRequest request) {
        log.warn("Constraint Violation Exception on request to {}", request.getRequestURI());
        List<ApiError.ValidationErrorDetail> validationErrors = ex.getConstraintViolations().stream()
                .map(violation -> ApiError.ValidationErrorDetail.builder()
                        .field(violation.getPropertyPath().toString())
                        .message(violation.getMessage())
                        .rejectedValue(violation.getInvalidValue())
                        .build())
                .toList();

        return buildErrorResponse(ErrorCode.VALIDATION_FAILED, ErrorCode.VALIDATION_FAILED.getMessage(), request.getRequestURI(), validationErrors);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiError> handleAccessDeniedException(AccessDeniedException ex, HttpServletRequest request) {
        log.warn("Access Denied on request to {}: {}", request.getRequestURI(), ex.getMessage());
        return buildErrorResponse(ErrorCode.FORBIDDEN_ACCESS, ErrorCode.FORBIDDEN_ACCESS.getMessage(), request.getRequestURI(), null);
    }

    @ExceptionHandler(OptimisticLockingFailureException.class)
    public ResponseEntity<ApiError> handleOptimisticLocking(OptimisticLockingFailureException ex, HttpServletRequest request) {
        log.warn("Optimistic locking failure on request to {}: {}", request.getRequestURI(), ex.getMessage());
        return buildErrorResponse(ErrorCode.OPTIMISTIC_LOCK_FAILURE, ErrorCode.OPTIMISTIC_LOCK_FAILURE.getMessage(), request.getRequestURI(), null);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiError> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpServletRequest request) {
        log.warn("Malformed HTTP request body on {}: {}", request.getRequestURI(), ex.getMessage());
        return buildErrorResponse(ErrorCode.INVALID_INPUT, "Malformed JSON request body", request.getRequestURI(), null);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ApiError> handleMaxUploadSize(MaxUploadSizeExceededException ex, HttpServletRequest request) {
        log.warn("Max upload size exceeded on {}: {}", request.getRequestURI(), ex.getMessage());
        return buildErrorResponse(ErrorCode.INVALID_INPUT, "File size exceeds the maximum allowed limit", request.getRequestURI(), null);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGenericException(Exception ex, HttpServletRequest request) {
        log.error("Unhandled Exception on request to {}: ", request.getRequestURI(), ex);
        return buildErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR, ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), request.getRequestURI(), null);
    }

    private ResponseEntity<ApiError> buildErrorResponse(
            ErrorCode errorCode,
            String message,
            String path,
            List<ApiError.ValidationErrorDetail> validationErrors) {

        ApiError apiError = ApiError.builder()
                .errorCode(errorCode.getCode())
                .message(message)
                .status(errorCode.getHttpStatus().value())
                .path(path)
                .timestamp(Instant.now())
                .correlationId(MDC.get(CORRELATION_ID_LOG_KEY))
                .validationErrors(validationErrors)
                .build();

        return ResponseEntity.status(errorCode.getHttpStatus()).body(apiError);
    }
}
