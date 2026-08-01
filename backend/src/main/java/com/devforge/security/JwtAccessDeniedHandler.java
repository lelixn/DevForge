package com.devforge.security;

import com.devforge.common.api.ApiError;
import com.devforge.common.constant.ErrorCode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;

import static com.devforge.common.constant.Constants.CORRELATION_ID_LOG_KEY;

@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    private static final Logger log = LoggerFactory.getLogger(JwtAccessDeniedHandler.class);
    private final ObjectMapper objectMapper;

    public JwtAccessDeniedHandler(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void handle(
            HttpServletRequest request,
            HttpServletResponse response,
            AccessDeniedException accessDeniedException) throws IOException {

        log.warn("Access denied for request to {}: {}", request.getRequestURI(), accessDeniedException.getMessage());

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);

        ApiError apiError = ApiError.builder()
                .errorCode(ErrorCode.FORBIDDEN_ACCESS.getCode())
                .message("You do not have permission to access this resource")
                .status(HttpServletResponse.SC_FORBIDDEN)
                .path(request.getRequestURI())
                .timestamp(Instant.now())
                .correlationId(MDC.get(CORRELATION_ID_LOG_KEY))
                .build();

        objectMapper.writeValue(response.getOutputStream(), apiError);
    }
}
