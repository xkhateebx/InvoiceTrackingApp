package com.invoicetrackingsystem.repo;


import com.invoicetrackingsystem.model.Invoice;
import com.invoicetrackingsystem.model.InvoicePage;
import com.invoicetrackingsystem.model.InvoiceSearchCriteria;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Repository
public class InvoiceCriteriaRepository {

    private final EntityManager entityManager;

    private final CriteriaBuilder criteriaBuilder;


    public InvoiceCriteriaRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
        this.criteriaBuilder = entityManager.getCriteriaBuilder();
    }

    public Page<Invoice> findAllWithFilters(InvoicePage invoicePage, InvoiceSearchCriteria invoiceSearchCriteria) {

        CriteriaQuery<Invoice> criteriaQuery = criteriaBuilder.createQuery(Invoice.class);
        Root<Invoice> invoiceRoot = criteriaQuery.from(Invoice.class);
        Predicate predicate = getPredicate(invoiceSearchCriteria, invoiceRoot);
        criteriaQuery.where(predicate);
        setOrder(invoicePage,criteriaQuery,invoiceRoot);

        TypedQuery<Invoice> typedQuery = entityManager.createQuery(criteriaQuery);
        typedQuery.setFirstResult(invoicePage.getPageNumber() * invoicePage.getPageSize());
        typedQuery.setMaxResults(invoicePage.getPageSize());

        Pageable pageable = getPageable(invoicePage);
        long invoicesCount = getInvoicesCount(predicate);

        return new PageImpl<>(typedQuery.getResultList(),pageable,invoicesCount);

    }




    private Predicate getPredicate(InvoiceSearchCriteria invoiceSearchCriteria,
                                   Root<Invoice> invoiceRoot) {

        List<Predicate> predicates = new ArrayList<>();
        if (Objects.nonNull(invoiceSearchCriteria.getCustomerName())) {
            predicates.add(
                    criteriaBuilder.like(invoiceRoot.get("customerName"),
                            "%" + invoiceSearchCriteria.getCustomerName() + "%")
            );
        }
        if (Objects.nonNull(invoiceSearchCriteria.getInvoiceDate())) {
            predicates.add(
                    criteriaBuilder.like(invoiceRoot.get("invoiceDate"),
                            "%" + invoiceSearchCriteria.getInvoiceDate() + "%")
            );

        }
        if (Objects.nonNull(invoiceSearchCriteria.getOwner())) {
            predicates.add(
                    criteriaBuilder.equal(invoiceRoot.get("owner"),invoiceSearchCriteria.getOwner())
            );

        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));

    }
    private void setOrder(InvoicePage invoicePage,
                          CriteriaQuery<Invoice> criteriaQuery, Root<Invoice> invoiceRoot) {

        if (invoicePage.getSortDirection().equals(Sort.Direction.ASC)){
            criteriaQuery.orderBy(criteriaBuilder.asc(invoiceRoot.get(invoicePage.getSortBy())));
        }else {
            criteriaQuery.orderBy(criteriaBuilder.desc(invoiceRoot.get(invoicePage.getSortBy())));

        }
    }
    private Pageable getPageable(InvoicePage invoicePage) {

        Sort sort = Sort.by(invoicePage.getSortDirection(),invoicePage.getSortBy());
        return PageRequest.of(invoicePage.getPageNumber(),invoicePage.getPageSize(),sort);
    }


    private long getInvoicesCount(Predicate predicate) {
        CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
        Root<Invoice> countRoot = countQuery.from(Invoice.class);
        countQuery.select(criteriaBuilder.count(countRoot)).where(predicate);
        return entityManager.createQuery(countQuery).getSingleResult();
    }

}
