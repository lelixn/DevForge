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
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;

import static com.devforge.common.constant.Constants.CORRELATION_ID_LOG_KEY;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);
    private final ObjectMapper objectMapper;

    public JwtAuthenticationEntryPoint(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException) throws IOException {

        log.warn("Unauthorized access attempt to {}: {}", request.getRequestURI(), authException.getMessage());

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        ApiError apiError = ApiError.builder()
                .errorCode(ErrorCode.UNAUTHORIZED_ACCESS.getCode())
                .message("Full authentication is required to access this resource")
                .status(HttpServletResponse.SC_UNAUTHORIZED)
                .path(request.getRequestURI())
                .timestamp(Instant.now())
                .correlationId(MDC.get(CORRELATION_ID_LOG_KEY))
                .build();

        objectMapper.writeValue(response.getOutputStream(), apiError);
    }
}
