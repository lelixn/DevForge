package com.devforge.common.exception;

import com.devforge.common.constant.ErrorCode;

public class ForbiddenException extends BaseException {

    public ForbiddenException(String message) {
        super(ErrorCode.FORBIDDEN_ACCESS, message);
    }

    public ForbiddenException() {
        super(ErrorCode.FORBIDDEN_ACCESS);
    }
}
