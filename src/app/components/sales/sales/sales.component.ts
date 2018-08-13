import { Component, OnInit } from '@angular/core';
import { SalesOrderRepositoryService, SalesOrderEvent } from '../../../services/sales-order-repository.service';
import { SalesOrder } from '../../../models/sales-order';

declare var $: any;

interface SalesOrderVm {
    order: SalesOrder;
    createdAtMinutes: number;
    allLineOrdersMarkedAsTaken: boolean;
}

@Component({
    selector: 'app-sales',
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
    orderVms: SalesOrderVm[] = [];
    selectedOrderVm: SalesOrderVm;

    constructor(private salesOrderRepository: SalesOrderRepositoryService) {
    }

    ngOnInit() {
        this.salesOrderRepository.on().subscribe(event => {
            this.handleSalesOrderEvent(event);
        });
    }

    onDetailsClick(orderVm: SalesOrderVm) {
        this.selectedOrderVm = orderVm;
        $('#order-details-modal').modal('show');
    }

    markLineOrderAsTaken(lineOrder: any) {
        lineOrder.markedAsTaken = !lineOrder.markedAsTaken;
        let allLineOrdersMarkedAsTaken = true;
        this.selectedOrderVm.order.lineOrders.forEach(lineOrder => {
            allLineOrdersMarkedAsTaken = allLineOrdersMarkedAsTaken && (<any> lineOrder).markedAsTaken;
        });
        (<any> this.selectedOrderVm).allLineOrdersMarkedAsTaken = allLineOrdersMarkedAsTaken;
    }

    onSelectedOrderCancel() {
        $('#order-details-modal').modal('hide');
    }

    onSelectedOrderDelivery() {
        if (this.selectedOrderVm.allLineOrdersMarkedAsTaken) {
            $('#order-details-modal').modal('hide');
            this.salesOrderRepository.deliveryOrder(this.selectedOrderVm.order);
            this.selectedOrderVm = null;
        }
    }

    private handleSalesOrderEvent(event: SalesOrderEvent) {
        if (event.type === 'added') {
            let createdAtMinutes = -1;
            if (event.salesOrder.createdAt) {
                const diffMs = new Date().getTime() - event.salesOrder.createdAt.getTime();
                createdAtMinutes = Math.floor((diffMs/1000)/60);
            }

            this.orderVms.push({
                order: event.salesOrder,
                createdAtMinutes: createdAtMinutes,
                allLineOrdersMarkedAsTaken: false
            });
        } else if (event.type === 'removed') {
            let index = this.orderVms.findIndex(x => x.order.id === event.salesOrder.id);
            this.orderVms.splice(index, 1);
        }
    }
}
