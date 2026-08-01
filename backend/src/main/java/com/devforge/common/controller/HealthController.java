package com.devforge.common.controller;

import com.devforge.common.api.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/health")
@Tag(name = "Health Check", description = "Foundation System Health Verification API")
public class HealthController {

    @GetMapping
    @Operation(summary = "Check foundation platform health", description = "Returns operational status and timestamp of backend foundation platform.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkHealth() {
        Map<String, Object> healthInfo = Map.of(
                "status", "UP",
                "service", "devforge-backend",
                "version", "1.0.0-SNAPSHOT",
                "timestamp", Instant.now().toString()
        );
        return ResponseEntity.ok(ApiResponse.success(healthInfo, "DevForge backend foundation is operational"));
    }
}
