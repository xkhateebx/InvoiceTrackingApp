import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Invoice} from '../../models/invoice'
import {InvoiceService} from '../../services/invoice.service'
import { MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrls: ['./update-invoice.component.css']
})
export class UpdateInvoiceComponent implements OnInit {

  id: number;
  invoice: Invoice = new Invoice();
  constructor(private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.invoiceService.getInvoiceById(this.id).subscribe(data => {
      this.invoice = data;
    }, error => console.log(error));
  }
  onSubmit(){
    this.invoiceService.updateInvoice(this.id, this.invoice).subscribe( data =>{
      this.goToInvoiceList();
      this._snackBar.open('Updated Successfully', 'Ok', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
        verticalPosition:'top'
        
      });
    }
    , error => console.log(error));
  }
  goToInvoiceList(){
    this.router.navigate(['/invoices']);

  }

}
