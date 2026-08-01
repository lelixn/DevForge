package com.devforge.common.validation;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class StrongPasswordTest {

    private StrongPasswordValidator validator;

    @BeforeEach
    void setUp() {
        validator = new StrongPasswordValidator();
    }

    @Test
    @DisplayName("Should accept passwords satisfying 12+ chars, upper, lower, digit, special char rule")
    void validPasswords() {
        assertThat(validator.isValid("P@ssword12345", null)).isTrue();
        assertThat(validator.isValid("DevForge#2026!", null)).isTrue();
        assertThat(validator.isValid("Complex!Password99", null)).isTrue();
    }

    @Test
    @DisplayName("Should reject passwords failing any strong password policy criteria")
    void invalidPasswords() {
        assertThat(validator.isValid("Short1!", null)).isFalse(); // Less than 12 chars
        assertThat(validator.isValid("alllowercase123!", null)).isFalse(); // No uppercase
        assertThat(validator.isValid("ALLUPPERCASE123!", null)).isFalse(); // No lowercase
        assertThat(validator.isValid("NoDigitsHere!!", null)).isFalse(); // No digit
        assertThat(validator.isValid("NoSpecialChar123", null)).isFalse(); // No special char
        assertThat(validator.isValid(null, null)).isFalse();
    }
}
