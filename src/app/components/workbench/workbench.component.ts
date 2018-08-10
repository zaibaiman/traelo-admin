import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-workbench',
    templateUrl: './workbench.component.html',
    styleUrls: ['./workbench.component.css']
})
export class WorkbenchComponent implements OnInit {
    activeMenu: 'clients' | 'orders' | 'products' | 'delivery';

    constructor() { }

    ngOnInit() {
    }
}
