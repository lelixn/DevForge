package com.devforge;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
class DevForgeApplicationTests {

    @Test
    @DisplayName("Verify Spring context loads successfully in test profile")
    void contextLoads() {
        assertThat(true).isTrue();
    }
}
