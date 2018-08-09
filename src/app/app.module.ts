import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WorkbenchComponent } from './components/workbench/workbench.component';
import { SalesComponent } from './components/sales/sales/sales.component';
import { ClientsComponent } from './components/contacts/clients/clients.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkbenchComponent,
    SalesComponent,
    ClientsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
