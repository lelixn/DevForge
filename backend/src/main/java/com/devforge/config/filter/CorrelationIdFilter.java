package com.devforge.config.filter;

import com.devforge.common.constant.Constants;
import com.devforge.common.util.CorrelationUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.MDC;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorrelationIdFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String incomingCorrelationId = request.getHeader(Constants.CORRELATION_ID_HEADER);
        String correlationId = CorrelationUtils.getOrGenerateCorrelationId(incomingCorrelationId);

        MDC.put(Constants.CORRELATION_ID_LOG_KEY, correlationId);
        response.setHeader(Constants.CORRELATION_ID_HEADER, correlationId);

        try {
            filterChain.doFilter(request, response);
        } finally {
            MDC.remove(Constants.CORRELATION_ID_LOG_KEY);
        }
    }
}
