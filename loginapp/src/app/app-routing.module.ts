import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { LoginComponent } from './components/login/login.component';
import{AuthGuard} from './services/auth.guard'
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { UpdateInvoiceComponent } from './components/update-invoice/update-invoice.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:"login",
    component:LoginComponent,
    pathMatch:'full'
    
  },
  {
    path:"dashboard",
    component:DashboardComponent,
    pathMatch:'full',
    canActivate:[AuthGuard]
  },
  {
    path:"invoices",
    component:InvoiceListComponent,
    pathMatch:'full',
    canActivate:[AuthGuard]

  },
  {path:'create-invoice',
  component:CreateInvoiceComponent,
  pathMatch:'full',
  canActivate:[AuthGuard]

  },
  {path: 'invoice-details/:id',
   component: InvoiceDetailsComponent,
   pathMatch:'full',
   canActivate:[AuthGuard]

  
  },
  {path:'update-invoice/:id',
  component: UpdateInvoiceComponent,
  pathMatch:'full',
  canActivate:[AuthGuard]

},
{
  path:"signup",
  component:SignupComponent,
  pathMatch:'full'
},


  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
