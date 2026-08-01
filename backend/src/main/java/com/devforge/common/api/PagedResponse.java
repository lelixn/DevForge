package com.devforge.common.api;

import org.springframework.data.domain.Page;

public class PagedResponse<T> {

    private final int page;
    private final int size;
    private final long totalElements;
    private final int totalPages;
    private final boolean first;
    private final boolean last;

    public PagedResponse(int page, int size, long totalElements, int totalPages, boolean first, boolean last) {
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.first = first;
        this.last = last;
    }

    public int getPage() {
        return page;
    }

    public int getSize() {
        return size;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public boolean isFirst() {
        return first;
    }

    public boolean isLast() {
        return last;
    }

    public static <T> PagedResponseBuilder<T> builder() {
        return new PagedResponseBuilder<>();
    }

    public static <T> PagedResponse<T> fromPage(Page<T> page) {
        return PagedResponse.<T>builder()
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .first(page.isFirst())
                .last(page.isLast())
                .build();
    }

    public static class PagedResponseBuilder<T> {
        private int page;
        private int size;
        private long totalElements;
        private int totalPages;
        private boolean first;
        private boolean last;

        public PagedResponseBuilder<T> page(int page) {
            this.page = page;
            return this;
        }

        public PagedResponseBuilder<T> size(int size) {
            this.size = size;
            return this;
        }

        public PagedResponseBuilder<T> totalElements(long totalElements) {
            this.totalElements = totalElements;
            return this;
        }

        public PagedResponseBuilder<T> totalPages(int totalPages) {
            this.totalPages = totalPages;
            return this;
        }

        public PagedResponseBuilder<T> first(boolean first) {
            this.first = first;
            return this;
        }

        public PagedResponseBuilder<T> last(boolean last) {
            this.last = last;
            return this;
        }

        public PagedResponse<T> build() {
            return new PagedResponse<>(page, size, totalElements, totalPages, first, last);
        }
    }
}
