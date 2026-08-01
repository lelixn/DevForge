package com.devforge.common.util;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;

public final class DateTimeUtils {

    private DateTimeUtils() {
        // Utility class
    }

    public static Instant nowUtc() {
        return Instant.now();
    }

    public static LocalDateTime toLocalDateTimeUtc(Instant instant) {
        if (instant == null) return null;
        return LocalDateTime.ofInstant(instant, ZoneOffset.UTC);
    }

    public static Instant toInstantUtc(LocalDateTime localDateTime) {
        if (localDateTime == null) return null;
        return localDateTime.toInstant(ZoneOffset.UTC);
    }
}
