package com.devforge.common.constant;

public final class Constants {

    private Constants() {
        // Prevent instantiation
    }

    public static final String API_V1_PREFIX = "/api/v1";
    public static final String CORRELATION_ID_HEADER = "X-Correlation-ID";
    public static final String CORRELATION_ID_LOG_KEY = "correlationId";
    public static final String SYSTEM_USER = "SYSTEM";
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";

    public static final String REGEX_SLUG = "^[a-z0-9]+(?:-[a-z0-9]+)*$";
    public static final String REGEX_UUID = "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$";
}
