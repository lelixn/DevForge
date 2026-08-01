package com.devforge.common.api;

import com.devforge.common.constant.Constants;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.MDC;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class ApiResponseTest {

    private String testCorrelationId;

    @BeforeEach
    void setUp() {
        testCorrelationId = UUID.randomUUID().toString();
        MDC.put(Constants.CORRELATION_ID_LOG_KEY, testCorrelationId);
    }

    @AfterEach
    void tearDown() {
        MDC.clear();
    }

    @Test
    @DisplayName("Should build success response envelope correctly with correlation ID")
    void successResponse_buildingEnvelope() {
        String data = "Test Data";

        ApiResponse<String> response = ApiResponse.success(data, "Success Message");

        assertThat(response.isSuccess()).isTrue();
        assertThat(response.getData()).isEqualTo(data);
        assertThat(response.getMessage()).isEqualTo("Success Message");
        assertThat(response.getCorrelationId()).isEqualTo(testCorrelationId);
        assertThat(response.getTimestamp()).isNotNull();
    }

    @Test
    @DisplayName("Should build error response envelope correctly")
    void errorResponse_buildingEnvelope() {
        ApiResponse<Void> response = ApiResponse.error("Error Message");

        assertThat(response.isSuccess()).isFalse();
        assertThat(response.getData()).isNull();
        assertThat(response.getMessage()).isEqualTo("Error Message");
        assertThat(response.getCorrelationId()).isEqualTo(testCorrelationId);
    }
}
