import { Component, OnInit } from '@angular/core';
import { DeliveryRepositoryService, DeliveryEvent } from '../../../services/delivery-repository.service';
import { Delivery } from '../../../models/delivery';

declare var $: any;

@Component({
    selector: 'app-deliveries',
    templateUrl: './deliveries.component.html',
    styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {
    deliveries: Delivery[] = [];
    selectedDelivery: Delivery;

    constructor(private deliveryRepositoryService: DeliveryRepositoryService) {
        this.selectedDelivery = {
            id: null,
            coto: null,
            home: null,
            lineOrders: [],
            total: 0
        };
    }

    ngOnInit() {
        this.deliveryRepositoryService.on().subscribe(event => {
            this.handleDeliveryEvent(event);
        });
    }

    onDetailsClick(delivery: Delivery) {
        this.selectedDelivery = delivery;
        $('#order-details-modal').modal('show');
    }

    onCancelledOrderClick(delivery: Delivery) {
        $('#order-details-modal').modal('hide');
    }

    onDeliveriedOrderClick(delivery: Delivery) {
        $('#order-details-modal').modal('hide');
    }

    private handleDeliveryEvent(event: DeliveryEvent) {
        if (event.type === 'added') {
            this.deliveries.push(event.delivery);
        } else if (event.type === 'removed') {

        }
    }
}
