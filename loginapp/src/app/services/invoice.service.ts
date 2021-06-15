import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Invoice} from '../models/invoice'
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private baseURL="http://localhost:8080/api/v1/invoices";


  constructor(private httpClient: HttpClient) { }

  getInvoicesList(): Observable<any>{
    const header = new HttpHeaders().set('Authorization' , 'Bearer ' + localStorage.getItem('token') );
    return this.httpClient.get<Invoice[]>(AppComponent.API_URL+`UserInvoices`,{headers:header});
  }

  createInvoice(invoice:Invoice):Observable<Object>{
    console.log(localStorage.getItem('token'))
    const header = new HttpHeaders().set('Authorization' , 'Bearer ' + localStorage.getItem('token') );

    return this.httpClient.post(`${this.baseURL}`,invoice , {headers: header});
  }

getInvoiceById(id:number):Observable<Invoice>{
  return this.httpClient.get<Invoice>( `${this.baseURL}/${id}` );
}


updateInvoice(id: number, invoice: Invoice): Observable<Object>{
  return this.httpClient.put(`${this.baseURL}/${id}`, invoice);
}

deleteInvoice(id: number): Observable<Object>{
  return this.httpClient.delete(`${this.baseURL}/${id}`);
}

searching(customerName?: string |any , pageNumber?:number | any): Observable<any> {
  const headers = new HttpHeaders().set('Authorization' , 'Bearer ' + localStorage.getItem('token'));
  let params;

  if(customerName){
    params = new HttpParams().set('customerName',customerName);
  }
  if(pageNumber){
    params = new HttpParams().set('pageNumber', (pageNumber - 1).toString());
  }else
  
  if (customerName){   params = new HttpParams().set('customerName', customerName);

}else
if(!pageNumber && !customerName){
  params = new HttpParams().set('pageNumber', '0');
}
  return this.httpClient.get<Invoice[]>(AppComponent.API_URL, {headers , params});
}



}
