package com.devforge.config.filter;

import com.devforge.common.constant.Constants;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.MDC;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class CorrelationIdFilterTest {

    private CorrelationIdFilter correlationIdFilter;

    @BeforeEach
    void setUp() {
        correlationIdFilter = new CorrelationIdFilter();
    }

    @Test
    @DisplayName("Should preserve existing correlation ID header if supplied in request")
    void doFilterInternal_existingHeader() throws ServletException, IOException {
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();
        FilterChain filterChain = mock(FilterChain.class);

        String existingCorrelationId = "custom-correlation-123";
        request.addHeader(Constants.CORRELATION_ID_HEADER, existingCorrelationId);

        correlationIdFilter.doFilterInternal(request, response, filterChain);

        assertThat(response.getHeader(Constants.CORRELATION_ID_HEADER)).isEqualTo(existingCorrelationId);
        verify(filterChain).doFilter(request, response);
        assertThat(MDC.get(Constants.CORRELATION_ID_LOG_KEY)).isNull(); // Cleared in finally block
    }

    @Test
    @DisplayName("Should generate new UUID correlation ID if not supplied in request")
    void doFilterInternal_generateNew() throws ServletException, IOException {
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();
        FilterChain filterChain = mock(FilterChain.class);

        correlationIdFilter.doFilterInternal(request, response, filterChain);

        String headerValue = response.getHeader(Constants.CORRELATION_ID_HEADER);
        assertThat(headerValue).isNotNull().isNotBlank();
        verify(filterChain).doFilter(request, response);
    }
}
