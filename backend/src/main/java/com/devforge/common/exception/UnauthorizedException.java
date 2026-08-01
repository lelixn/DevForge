package com.devforge.common.exception;

import com.devforge.common.constant.ErrorCode;

public class UnauthorizedException extends BaseException {

    public UnauthorizedException(String message) {
        super(ErrorCode.UNAUTHORIZED_ACCESS, message);
    }

    public UnauthorizedException() {
        super(ErrorCode.UNAUTHORIZED_ACCESS);
    }
}
