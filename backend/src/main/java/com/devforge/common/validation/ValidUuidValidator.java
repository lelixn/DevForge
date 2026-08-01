package com.devforge.common.validation;

import com.devforge.common.constant.Constants;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class ValidUuidValidator implements ConstraintValidator<ValidUuid, String> {

    private static final Pattern UUID_PATTERN = Pattern.compile(Constants.REGEX_UUID);

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) {
            return true; // Use @NotNull/@NotBlank for mandatory checking
        }
        return UUID_PATTERN.matcher(value).matches();
    }
}
