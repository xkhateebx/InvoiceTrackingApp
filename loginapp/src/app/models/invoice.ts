import { Items } from "../items";

export class Invoice {
    id:number;
    customerName:string;
    invoiceNumber:number;
    totalPrice:number;
    invoiceDate:string;
    InvoicePic:string;
    owner:string;
    invoiceItems: Array<Items>

}
