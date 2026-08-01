package com.devforge.common.exception;

import com.devforge.common.constant.ErrorCode;

public class ValidationException extends BaseException {

    public ValidationException(String message) {
        super(ErrorCode.VALIDATION_FAILED, message);
    }
}
