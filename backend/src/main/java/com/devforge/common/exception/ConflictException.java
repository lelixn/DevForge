package com.devforge.common.exception;

import com.devforge.common.constant.ErrorCode;

public class ConflictException extends BaseException {

    public ConflictException(String message) {
        super(ErrorCode.RESOURCE_CONFLICT, message);
    }
}
