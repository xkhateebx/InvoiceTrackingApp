package com.invoicetrackingsystem.model;

import org.springframework.data.domain.Sort;

public class InvoicePage {

    private int pageNumber;
    private int pageSize = 8;
    private Sort.Direction sortDirection = Sort.Direction.ASC;
    private String sortBy = "customerName";


    public int getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public Sort.Direction getSortDirection() {
        return sortDirection;
    }

    public void setSortDirection(Sort.Direction sortDirection) {
        this.sortDirection = sortDirection;
    }

    public String getSortBy() {
        return sortBy;
    }

    public void setSortBy(String sortBy) {
        this.sortBy = sortBy;
    }
}
