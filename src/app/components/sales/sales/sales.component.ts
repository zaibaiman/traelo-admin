import { Component, OnInit } from '@angular/core';
import { SalesOrderRepositoryService, SalesOrderEvent } from '../../../services/sales-order-repository.service';
import { SalesOrder } from '../../../models/sales-order';

declare var $: any;

@Component({
    selector: 'app-sales',
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
    orders: SalesOrder[] = [];
    selectedOrder: SalesOrder;

    constructor(private salesOrderRepository: SalesOrderRepositoryService) {
        this.selectedOrder = {
            id: null,
            coto: null,
            home: null,
            lineOrders: [],
            total: 0
        };
    }

    ngOnInit() {
        this.salesOrderRepository.on().subscribe(event => {
            this.handleSalesOrderEvent(event);
        });
    }

    onDetailsClick(order: SalesOrder) {
        this.selectedOrder = order;
        $('#order-details-modal').modal('show');
    }

    markLineOrderAsTaken(lineOrder: any) {
        lineOrder.markedAsTaken = !lineOrder.markedAsTaken;
        let allLineOrdersMarkedAsTaken = true;
        this.selectedOrder.lineOrders.forEach(lineOrder => {
            allLineOrdersMarkedAsTaken = allLineOrdersMarkedAsTaken && (<any> lineOrder).markedAsTaken;
        });
        (<any> this.selectedOrder).allLineOrdersMarkedAsTaken = allLineOrdersMarkedAsTaken;
    }

    onSelectedOrderDelivery() {
        $('#order-details-modal').modal('hide');
        this.salesOrderRepository.deliveryOrder(this.selectedOrder);
        this.selectedOrder = null;
    }

    private handleSalesOrderEvent(event: SalesOrderEvent) {
        if (event.type === 'added') {
            this.orders.push(event.salesOrder);
        } else if (event.type === 'removed') {
            let index = this.orders.findIndex(x => x.id === event.salesOrder.id);
            this.orders.splice(index, 1);
        }
    }
}
