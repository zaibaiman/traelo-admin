import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkbenchComponent } from './components/workbench/workbench.component';
import { SalesComponent } from './components/sales/sales/sales.component';
import { ClientsComponent } from './components/contacts/clients/clients.component';
import { ProductsComponent } from './components/products/products/products.component';
import { DeliveriesComponent } from './components/deliveries/deliveries/deliveries.component';

const routes: Routes = [
    {
        path: '',
        component: WorkbenchComponent,
        children: [
            { path: 'clients', component: ClientsComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'sales', component: SalesComponent },
            { path: 'deliveries', component: DeliveriesComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
