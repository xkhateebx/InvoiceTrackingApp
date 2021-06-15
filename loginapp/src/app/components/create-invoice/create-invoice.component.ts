import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Invoice} from '../../models/invoice'
import {InvoiceService} from '../../services/invoice.service'
import {UploadService} from '../../services/upload.service'
import {Items} from '../../items'
import { Input, TemplateRef, Injectable, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators,  FormBuilder, FormGroup  } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: AppComponent}   
  ]

})
export class CreateInvoiceComponent implements OnInit {
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  items:FormGroup | any;
  createdItems:Items[] = [];
  invoice:FormGroup | any;
  inv:Invoice = new Invoice;
  //upload
  title = 'Upload your invoice';
  selectedFile: File;
  error: string;
  fileUpload = { status: '', message: 0, filePath: '' };


  constructor(private invoiceService:InvoiceService,
    private router: Router,private http : HttpClient ,
     private uploadService: UploadService,
     public dialog: MatDialog,
     private formBuilder: FormBuilder,
     private newInvoice:InvoiceService,
     private _snackBar: MatSnackBar
     ) { }

  ngOnInit(): void {

    this.invoice = this.formBuilder.group({
      customerName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ].{3,20}')]),
      totalPrice: new FormControl(''),
      invoiceDate: new FormControl(''),
      invoiceNumber: new FormControl('', Validators.required),
      invoiceItems: new FormControl(''),
    });


    this.items = this.formBuilder.group({
      itemName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ].{3,20}')]),
      unitPrice: new FormControl(''),
      quantity: new FormControl('')
    });



  }

 

  onSelectFile(event: { target: { files: any[]; }; })
  {
    const file = event.target.files[0];
    console.log(file);

  }

  saveInvoice() {
    const obj = this.invoice.controls.invoiceDate.value;
    const myJSON = obj.toString();
    this.inv.customerName = this.invoice.controls.customerName.value;
    this.inv.totalPrice = this.invoice.totalPrice;
    this.inv.invoiceDate = myJSON;
    this.inv.invoiceNumber = this.invoice.controls.invoiceNumber.value;
    this.inv.invoiceItems = this.createdItems;
    console.log(this.inv);
    this.newInvoice.createInvoice(this.inv).subscribe(data => {
      window.location.reload();
          //   // this.handleItems();
    }, error => console.log(error));
  }


    // saveInvoice(){
    //   this.invoiceService.createInvoice(this.invoice).subscribe(data => {
    //     console.log(data);
    //     this.goToInvoiceList();
        

    //   },
    //   error => console.log(error));
    // }

    addItemToArry() {
      const pushedItems: Items = new Items();
      pushedItems.itemName = this.items.get('itemName').value;
      pushedItems.unitPrice = this.items.get('unitPrice').value;
      pushedItems.quantity = this.items.get('quantity').value;
      this.createdItems.push(pushedItems);
      this.calculateToatalPrice('sum');
      this.items.get('itemName').reset();
      this.items.get('unitPrice').reset();
      this.items.get('quantity').reset();
    }

    calculateToatalPrice(type: string) {
      const prices = this.createdItems.map((p) => p.unitPrice);
      const quantities = this.createdItems.map((q) => q.quantity);
      let sum = 0;
      if (type === 'sum') {
        for (let i = 0; i < prices.length; i++) {
          sum += prices[i] * quantities[i];
        }
      } else {
        for (let i = 0; i < prices.length; i++) {
          sum += (prices[i] * quantities[i]);
        }
      }
      this.invoice.totalPrice= sum;

    }

    getErrorMessage(controlName: string, validationType: string) {
      switch (validationType) {
        case 'required':
          return this.invoice.get(controlName)!.hasError('required') ? 'You must enter a value' : '';
        case 'pattern':
          return this.invoice.get(controlName)!.hasError('pattern') ? 'Only letter between 3 to 20 character' : '';
        default :
          return 'undefined type';
      }
    }

    getItemsError(controlName: string, validationType: string) {
      switch (validationType) {
        case 'required':
          return this.items.get(controlName)!.hasError('required') ? 'You must enter a value' : '';
        case 'patternNumber':
          return this.items.get(controlName)!.hasError('pattern') ? 'Only numbers ' : '';
        case 'patternChar':
          return this.items.get(controlName)!.hasError('pattern') ? 'Only characters' : '';
        default :
          return 'undefined type';
      }
    }
  
  
    onDelete(i: number) {
      this.createdItems.splice(i, 1);
      this.calculateToatalPrice('sub');
    }
  


  goToInvoiceList(){
    this.router.navigate(['/invoices']);

  }
  onSubmit(){
    if (this.invoice.invalid !== true ) {
      this.saveInvoice();
      this._snackBar.open('invoice added successfully', 'Ok', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
        verticalPosition:'top'
        
      });
    } else {
      window.location.reload();

    }

  }

  
  
  onFileSelected(event) {
    console.log('File Changed: ', event);
    if (event) {
      this.selectedFile = event.target.files[0] as File;
    } else {
      this.selectedFile = null;
    }
  }

  onUpload() {
    console.log(this.selectedFile);
    if (this.selectedFile == null) {
      console.log('You not Choose file.');
    } else if (this.uploadService.checkSize(this.selectedFile)) {
      console.log('File size larger than ' + this.uploadService.maxSize + ' bytes. [' + (this.selectedFile.size) + ']');
    } else {
      console.log('Event: upload file start.');
      const fd = new FormData();
      fd.append('file', this.selectedFile, this.selectedFile.name);
      this.uploadService.postUploadFile(fd)
        .subscribe(res => {
          console.log('success component', res);
          this.fileUpload = res;
        }, err => {
          console.log('error component', err);
          this.error = err;
        });
    }
  }

  openDialog() {
    let dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
            if (result !== 'no') {
              const enabled = "Y"
                console.log(result);
            } else if (result === 'no') {
               console.log('User clicked no.');
            }
        }
    })
}


onSend(form: NgForm){  
  if(form.status === 'INVALID')
  {
    // display error in your form
  }else{
      console.log(form.value)
      this.dialog.closeAll(); // Close opened diaglo
    // do whatever you want to do with your data
  }
  
  
}


}
