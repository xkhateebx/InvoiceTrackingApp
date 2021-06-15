package com.invoicetrackingsystem.services;

import com.invoicetrackingsystem.model.Invoice;
import com.invoicetrackingsystem.model.InvoicePage;
import com.invoicetrackingsystem.model.InvoiceSearchCriteria;
import com.invoicetrackingsystem.repo.InvoiceCriteriaRepository;
import com.invoicetrackingsystem.repo.InvoiceRepository;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final InvoiceCriteriaRepository invoiceCriteriaRepository;


    public InvoiceService(InvoiceRepository invoiceRepository, InvoiceCriteriaRepository invoiceCriteriaRepository) {
        this.invoiceRepository = invoiceRepository;
        this.invoiceCriteriaRepository = invoiceCriteriaRepository;
    }

    public Page<Invoice> getInvoices(InvoicePage invoicePage,
                                     InvoiceSearchCriteria invoiceSearchCriteria){
        return invoiceCriteriaRepository.findAllWithFilters(invoicePage,invoiceSearchCriteria);


    }
    public Invoice addInvoice(Invoice invoice){
        return invoiceRepository.save(invoice);


    }
}
