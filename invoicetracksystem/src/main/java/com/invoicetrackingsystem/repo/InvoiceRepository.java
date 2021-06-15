package com.invoicetrackingsystem.repo;

import com.invoicetrackingsystem.model.Invoice;
import com.invoicetrackingsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice,Long> {
    List<Invoice> findAll();
    List<Invoice> findByOwner(User user);

}