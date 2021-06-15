package com.invoicetrackingsystem.controller;
import com.invoicetrackingsystem.config.JwtUtil;
import com.invoicetrackingsystem.model.Invoice;
import com.invoicetrackingsystem.model.InvoicePage;
import com.invoicetrackingsystem.model.InvoiceSearchCriteria;
import com.invoicetrackingsystem.model.User;
import com.invoicetrackingsystem.repo.InvoiceRepository;
import com.invoicetrackingsystem.repo.UserRepository;
import com.invoicetrackingsystem.services.InvoiceService;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")

public class InvoiceController {

    private final InvoiceService invoiceService;

    private final JwtUtil jwtUtil;

    private final UserRepository userRepository;

    public InvoiceController(InvoiceService invoiceService, JwtUtil jwtUtil, UserRepository userRepository) {
        this.invoiceService = invoiceService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }


    @Autowired
    private InvoiceRepository invoiceRepository;


    @GetMapping
    public ResponseEntity <Page<Invoice>> getInvoices(@RequestHeader("Authorization") String header, InvoicePage invoicePage,
                                                      @RequestParam(value = "customerName" , required = false) String customerName,
                                                      @RequestParam(value = "pageNumber",required = false) String pageNumber,
                                                      InvoiceSearchCriteria invoiceSearchCriteria){
        String token = header.substring("Bearer ".length());
        String userNameFromToken = jwtUtil.getUserNameFromToken(token);
        User user = userRepository.findByUsername(userNameFromToken);
        invoiceSearchCriteria.setOwner(user);
        if (customerName !=null){
            invoiceSearchCriteria.setCustomerName(customerName);
            return new ResponseEntity<>(invoiceService.getInvoices(invoicePage,invoiceSearchCriteria),
                    HttpStatus.OK);
        }
        invoicePage.setPageNumber(Integer.parseInt(pageNumber));
        return new ResponseEntity<>(invoiceService.getInvoices(invoicePage,invoiceSearchCriteria),
                HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity<Invoice> addInvoice(@RequestBody Invoice invoice){
        return new ResponseEntity<>(invoiceService.addInvoice(invoice),HttpStatus.OK);

    }

    @GetMapping("/invoices")

    public List<Invoice> getAllInvoices(){
        return invoiceRepository.findAll();
    }

    //Create invoice REST API
    @PostMapping("/invoices")
    public Invoice createInvoice(@RequestBody Invoice invoice ,
                                 @RequestHeader("Authorization") String header

                                 )  {


        String token = header.substring("Bearer ".length());
        String userNameFromToken = jwtUtil.getUserNameFromToken(token);
        User user = userRepository.findByUsername(userNameFromToken);

        //// uploading file
//                    if (file.isEmpty())
//                    {
//                        /////
//                        System.out.println("File is empty");
//
//
//                    }
//                    else {
//                        ///
//                        invoice.setInvoicePic(file.getOriginalFilename());
//
//                        File saveFile = new ClassPathResource("static/img").getFile();
//
//                        Path path = Paths.get(saveFile.getAbsolutePath() + File.separator + file.getOriginalFilename());
//
//
//                        Files.copy(file.getInputStream(),path,StandardCopyOption.REPLACE_EXISTING);
//                        System.out.println("Image is uploaded");
//                    }
        invoice.setOwner(user);

        return invoiceRepository.save(invoice);
    }

    // get invoice by id rest api
    @GetMapping("/invoices/{id}")
    public ResponseEntity<Invoice> getInvoiceById(@PathVariable Long id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not exist with id :" + id));
        return ResponseEntity.ok(invoice);
    }

    // update invoice rest api

    @PutMapping("/invoices/{id}")
    public ResponseEntity<Invoice> updateInvoice(@PathVariable Long id, @RequestBody Invoice invoiceDetails){
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not exist with id :" + id));

        invoice.setCustomerName(invoiceDetails.getCustomerName());
        invoice.setInvoiceDate(invoiceDetails.getInvoiceDate());
        invoice.setInvoiceNumber(invoiceDetails.getInvoiceNumber());
        invoice.setTotalPrice(invoiceDetails.getTotalPrice());
        invoice.setInvoicePic(invoiceDetails.getInvoicePic());


        Invoice updatedInvoice = invoiceRepository.save(invoice);
        return ResponseEntity.ok(updatedInvoice);
    }

    //delete invoice rest api
    @DeleteMapping("/invoices/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteInvoice(@PathVariable Long id){
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not exist with id :" + id));

        invoiceRepository.delete(invoice);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/UserInvoices")
    public List<Invoice> getUserInvoice(@RequestHeader("Authorization") String header){
        String token = header.substring("Bearer ".length());
        String userNameFromToken = jwtUtil.getUserNameFromToken(token);
        User user = userRepository.findByUsername(userNameFromToken);
        return invoiceRepository.findByOwner(user);
    }


}
