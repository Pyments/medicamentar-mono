package com.medicamentar.medicamentar_api.application.dtos.responsesDto;

import java.util.List;

    public class PaginatedResponse<T> {
        private final List<T> content;
        private final int totalPages;
        private final long totalElements;
    
        public PaginatedResponse(List<T> content, int totalPages, long totalElements) {
            this.content = content;
            this.totalPages = totalPages;
            this.totalElements = totalElements;
        }
    
        public List<T> getContent() {
            return content;
        }
    
        public int getTotalPages() {
            return totalPages;
        }
    
        public long getTotalElements() {
            return totalElements;
        }
    }


