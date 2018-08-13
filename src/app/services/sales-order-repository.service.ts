import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesOrder } from '../models/sales-order';
import * as firebase from 'firebase';

export interface SalesOrderEvent {
    type: 'added' | 'removed';
    salesOrder: SalesOrder
}

@Injectable({
    providedIn: 'root'
})
export class SalesOrderRepositoryService {
    private db = firebase.firestore();

    constructor() { }

    on(): Observable<SalesOrderEvent> {
        return new Observable(observer => {
            const unsubscribe = this.db.collection('orders').onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        const salesOrder = this.createOrderFromDoc(change.doc);
                        observer.next({
                            type: 'added',
                            salesOrder: salesOrder
                        });
                    } else if (change.type === 'modified') {
                        // empty
                    } else if (change.type === 'removed') {
                        const salesOrder = this.createOrderFromDoc(change.doc);
                        observer.next({
                            type: 'removed',
                            salesOrder: salesOrder
                        });
                    }
                });
            });

            return () => {
                unsubscribe();
            };
        });
    }

    async deliveryOrder(saleOrder: SalesOrder) {
        await this.db.collection('orders').doc(saleOrder.id).delete();
        await this.db.collection('deliveries').add({
            coto: saleOrder.coto,
            home: saleOrder.home,
            lineOrders: saleOrder.lineOrders,
            total: saleOrder.total
        });
    }

    private createOrderFromDoc(doc: firebase.firestore.QueryDocumentSnapshot) {
        const data = doc.data();
        const salesOrder = new SalesOrder();
        salesOrder.id = doc.id;
        salesOrder.createdAt = data.createdAt && new Date(data.createdAt) || null;
        salesOrder.coto = data.coto;
        salesOrder.home = data.home;
        salesOrder.total = data.total;
        salesOrder.lineOrders = data.lineOrders;
        return salesOrder;
    }
}
