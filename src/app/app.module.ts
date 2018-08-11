import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WorkbenchComponent } from './components/workbench/workbench.component';
import { SalesComponent } from './components/sales/sales/sales.component';
import { ClientsComponent } from './components/contacts/clients/clients.component';
import { ProductsComponent } from './components/products/products/products.component';
import { DeliveriesComponent } from './components/deliveries/deliveries/deliveries.component';

import { SalesOrderRepositoryService } from './services/sales-order-repository.service';

import * as firebase from 'firebase';
import * as firestore from 'firebase/firestore';
import { DeliveryRepositoryService } from './services/delivery-repository.service';


@NgModule({
    declarations: [
        AppComponent,
        WorkbenchComponent,
        SalesComponent,
        ClientsComponent,
        ProductsComponent,
        DeliveriesComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
    ],
    providers: [
        SalesOrderRepositoryService,
        DeliveryRepositoryService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        firebase.initializeApp({
            apiKey: "AIzaSyABrz_s-Kno5bt1ovPOn55lN4pIoA0ra08",
            authDomain: "traelo-3630b.firebaseapp.com",
            databaseURL: "https://traelo-3630b.firebaseio.com",
            projectId: "traelo-3630b",
            storageBucket: "traelo-3630b.appspot.com",
            messagingSenderId: "337703983049"
        });

        firebase.firestore().settings({
            timestampsInSnapshots: true
        });
    }
}
