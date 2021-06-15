import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import{MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { UpdateInvoiceComponent } from './components/update-invoice/update-invoice.component'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NgxPaginationModule} from 'ngx-pagination';
import { SignupComponent } from './components/signup/signup.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTableExporterModule} from 'mat-table-exporter';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from "@angular/flex-layout";
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import{Methods} from './methods';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    InvoiceListComponent,
    CreateInvoiceComponent,
    InvoiceDetailsComponent,
    UpdateInvoiceComponent,
    SignupComponent,
    FooterComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatDatepickerModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatSnackBarModule,
    ProgressbarModule.forRoot(),
    NgbModule,
    MatTableExporterModule,
    MatIconModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
     MatDialogModule,
      MatFormFieldModule,

  ],
  entryComponents:[UpdateInvoiceComponent],
  providers: [Methods],
  bootstrap: [AppComponent]
})
export class AppModule { }
