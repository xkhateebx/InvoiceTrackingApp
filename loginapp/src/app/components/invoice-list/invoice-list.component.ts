import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/models/invoice';
import {InvoiceService} from '../../services/invoice.service'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as XLSX from 'xlsx'; 
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateInvoiceComponent } from '../create-invoice/create-invoice.component';
import { InvoiceDetailsComponent } from '../invoice-details/invoice-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  invoices:Array<Invoice> = [];
  searchValue : string;
  invoiceList:Invoice[];
  public pageNumber :number | any = 0;
  public pageSize :number | undefined;
  public total :number | undefined;


  fileName= 'ExcelSheet.xlsx';


  
  constructor(private    invoiceService: InvoiceService, 
    private router:Router,private _snackBar: MatSnackBar,
    
    private dialog:MatDialog
    
    ) { }

  ngOnInit(): void {

    this.getInvoices();


  }
  private getInvoices(pageNumber?:any){
    this.invoiceService.searching( undefined , pageNumber).subscribe(data=> {

      console.log(data);
      this.invoices = data.content;
      this.pageSize=data.pageable.pageSize;
      this.pageNumber=data.pageable.pageNumber + 1;
      this.total = data.totalElements;
    
    });
  }

  invoiceDetails(id: number){
    this.router.navigate(['invoice-details',id]);

    // const dialogConfig = new MatDialogConfig();
    //   dialogConfig.data=id;


    // dialogConfig.autoFocus = true;
    // dialogConfig.width="50%";


    // this.dialog.open(InvoiceDetailsComponent,);

  }

  updateInvoice(id:number){
    this.router.navigate(['update-invoice',id]);
    

  }
  createInvoice(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width="60%";


    this.dialog.open(CreateInvoiceComponent,dialogConfig);
  }
  

  deleteInvoice(id: number){
    if(confirm("Are you sure to delete "+id)) 

    this.invoiceService.deleteInvoice(id).subscribe( data => {
      console.log(data);
      this.getInvoices();

      this._snackBar.open('Deleted Successfully', 'Ok', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
        verticalPosition:'top'
        
      });
      
    
    })
  }


exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }

    search(event: any){
      this.searchValue = event.target.value;
      this.invoiceService.searching(this.searchValue).subscribe( data => {
        this.invoices = data.content;
      });
    
    }

    pageChange(event:any){
      this.getInvoices(event)

    }
    

  }

    

