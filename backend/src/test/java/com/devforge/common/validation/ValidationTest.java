package com.devforge.common.validation;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class ValidationTest {

    private ValidUuidValidator uuidValidator;
    private SlugValidator slugValidator;

    @BeforeEach
    void setUp() {
        uuidValidator = new ValidUuidValidator();
        slugValidator = new SlugValidator();
    }

    @Test
    @DisplayName("ValidUuidValidator should accept valid UUIDs and null/blank strings")
    void validUuidValidator_testCases() {
        assertThat(uuidValidator.isValid(UUID.randomUUID().toString(), null)).isTrue();
        assertThat(uuidValidator.isValid(null, null)).isTrue();
        assertThat(uuidValidator.isValid("", null)).isTrue();

        assertThat(uuidValidator.isValid("invalid-uuid-string", null)).isFalse();
        assertThat(uuidValidator.isValid("12345", null)).isFalse();
    }

    @Test
    @DisplayName("SlugValidator should accept valid slugs and reject malformed slugs")
    void slugValidator_testCases() {
        assertThat(slugValidator.isValid("my-devforge-workspace", null)).isTrue();
        assertThat(slugValidator.isValid("devforge123", null)).isTrue();
        assertThat(slugValidator.isValid(null, null)).isTrue();

        assertThat(slugValidator.isValid("My Workspace!", null)).isFalse();
        assertThat(slugValidator.isValid("slug_with_underscores", null)).isFalse();
        assertThat(slugValidator.isValid("-invalid-leading-hyphen", null)).isFalse();
    }
}
