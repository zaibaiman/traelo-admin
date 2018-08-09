import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-sales',
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    onDetailsClick() {
        $('#order-details-modal').modal('show');
    }
}
