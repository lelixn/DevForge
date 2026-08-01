package com.devforge.common.exception;

import com.devforge.common.constant.ErrorCode;

public class BadRequestException extends BaseException {

    public BadRequestException(String message) {
        super(ErrorCode.INVALID_INPUT, message);
    }
}
