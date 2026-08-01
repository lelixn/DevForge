package com.devforge.common.persistence;

import org.springframework.data.jpa.domain.Specification;

public class BaseSpecification {

    private BaseSpecification() {
        // Utility class
    }

    public static <T extends AuditableEntity> Specification<T> isNotDeleted() {
        return (root, query, cb) -> cb.equal(root.get("deleted"), false);
    }

    public static <T> Specification<T> attributeEquals(String attributeName, Object value) {
        return (root, query, cb) -> value == null ? cb.conjunction() : cb.equal(root.get(attributeName), value);
    }

    public static <T> Specification<T> attributeContainsIgnoreCase(String attributeName, String value) {
        return (root, query, cb) -> (value == null || value.isBlank())
                ? cb.conjunction()
                : cb.like(cb.lower(root.get(attributeName)), "%" + value.toLowerCase() + "%");
    }
}
