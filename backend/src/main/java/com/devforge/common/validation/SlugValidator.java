package com.devforge.common.validation;

import com.devforge.common.constant.Constants;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class SlugValidator implements ConstraintValidator<Slug, String> {

    private static final Pattern SLUG_PATTERN = Pattern.compile(Constants.REGEX_SLUG);

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) {
            return true;
        }
        return SLUG_PATTERN.matcher(value).matches();
    }
}
