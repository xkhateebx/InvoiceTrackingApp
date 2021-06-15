import { Component, OnInit } from '@angular/core';
import {Invoice} from '../../models/invoice'
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';
import {Items} from '../../items'


@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {

  items:Items
  id: number
  invoice: Invoice
  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.invoice = new Invoice();
    this.invoiceService.getInvoiceById(this.id).subscribe( data => {
      this.invoice = data;
    });
  }

  print() {
    window.print();
    }

}
