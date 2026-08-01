package com.devforge.common.exception;

import com.devforge.common.constant.ErrorCode;

public class InternalServerErrorException extends BaseException {

    public InternalServerErrorException(String message) {
        super(ErrorCode.INTERNAL_SERVER_ERROR, message);
    }

    public InternalServerErrorException(String message, Throwable cause) {
        super(ErrorCode.INTERNAL_SERVER_ERROR, message, cause);
    }
}
