import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delivery } from '../models/delivery';
import * as firebase from 'firebase';

export interface DeliveryEvent {
    type: 'added' | 'removed';
    delivery: Delivery
}

@Injectable({
    providedIn: 'root'
})
export class DeliveryRepositoryService {
    private db = firebase.firestore();

    constructor() { }

    on(): Observable<DeliveryEvent> {
        return new Observable(observer => {
            const unsubscribe = this.db.collection('deliveries').onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        const delivery = this.createDeliveryFromDoc(change.doc);
                        observer.next({
                            type: 'added',
                            delivery: delivery
                        });
                    } else if (change.type === 'modified') {
                        // empty
                    } else if (change.type === 'removed') {
                        const salesOrder = this.createDeliveryFromDoc(change.doc);
                        observer.next({
                            type: 'removed',
                            delivery: salesOrder
                        });
                    }
                });
            });

            return () => {
                unsubscribe();
            };
        });
    }

    private createDeliveryFromDoc(doc: firebase.firestore.QueryDocumentSnapshot) {
        const data = doc.data();
        const delivery = new Delivery();
        delivery.id = doc.id;
        delivery.coto = data.coto;
        delivery.home = data.home;
        delivery.total = data.total;
        delivery.lineOrders = data.lineOrders;
        return delivery;
    }
}
