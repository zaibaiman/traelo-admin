import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkbenchComponent } from './components/workbench/workbench.component';
import { SalesComponent } from './components/sales/sales/sales.component';
import { ClientsComponent } from './components/contacts/clients/clients.component';

const routes: Routes = [
    {
        path: '',
        component: WorkbenchComponent,
        children: [
            { path: 'clients', component: ClientsComponent },
            { path: 'sales', component: SalesComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
