package com.devforge.common.util;

import com.devforge.common.constant.Constants;
import org.slf4j.MDC;

import java.util.UUID;

public final class CorrelationUtils {

    private CorrelationUtils() {
        // Utility class
    }

    public static String generateCorrelationId() {
        return UUID.randomUUID().toString();
    }

    public static String getOrGenerateCorrelationId(String existingCorrelationId) {
        if (existingCorrelationId != null && !existingCorrelationId.isBlank()) {
            return existingCorrelationId;
        }
        return generateCorrelationId();
    }

    public static String getCurrentCorrelationId() {
        return MDC.get(Constants.CORRELATION_ID_LOG_KEY);
    }
}
