import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
    clients: Client[] = [];

    constructor() {
        this.clients.push({
            id: '1',
            name: 'Francisco Mendoza',
            coto: 'Manyara',
            home: '188',
            phone: '33 1557 3973'
        });
        this.clients.push({
            id: '2',
            name: 'Nayely Bojorquez',
            coto: 'Manitoba',
            home: '25',
            phone: '667 274 2713'
        });
    }

    ngOnInit() {
    }

}
