package com.devforge.common.constant;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    INVALID_INPUT("ERR_40001", "Invalid input parameters provided.", HttpStatus.BAD_REQUEST),
    VALIDATION_FAILED("ERR_40002", "Request validation failed.", HttpStatus.BAD_REQUEST),
    RESOURCE_NOT_FOUND("ERR_40401", "The requested resource was not found.", HttpStatus.NOT_FOUND),
    UNAUTHORIZED_ACCESS("ERR_40101", "Authentication required to access this resource.", HttpStatus.UNAUTHORIZED),
    FORBIDDEN_ACCESS("ERR_40301", "You do not have permission to perform this action.", HttpStatus.FORBIDDEN),
    RESOURCE_CONFLICT("ERR_40901", "Resource state conflict detected.", HttpStatus.CONFLICT),
    OPTIMISTIC_LOCK_FAILURE("ERR_40902", "Resource was updated by another transaction. Please retry.", HttpStatus.CONFLICT),
    RATE_LIMIT_EXCEEDED("ERR_42901", "Too many requests. Please try again later.", HttpStatus.TOO_MANY_REQUESTS),
    INTERNAL_SERVER_ERROR("ERR_50001", "An unexpected internal server error occurred.", HttpStatus.INTERNAL_SERVER_ERROR),
    SERVICE_UNAVAILABLE("ERR_50301", "Service temporarily unavailable.", HttpStatus.SERVICE_UNAVAILABLE);

    private final String code;
    private final String message;
    private final HttpStatus httpStatus;

    ErrorCode(String code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
