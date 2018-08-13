import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import * as firebase from 'firebase';

export interface ProductEvent {
    type:  'added' | 'modified' | 'removed';
    product: Product
}

@Injectable({
    providedIn: 'root'
})
export class ProductsRepositoryService {
    private db = firebase.firestore();

    constructor() { }

    on(): Observable<ProductEvent> {
        return new Observable(observer => {
            const unsubscribe = this.db.collection('products').onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        const product = this.createOrderFromDoc(change.doc);
                        observer.next({
                            type: 'added',
                            product: product
                        });
                    } else if (change.type === 'modified') {
                        const product = this.createOrderFromDoc(change.doc);
                        observer.next({
                            type: 'modified',
                            product: product
                        });
                    } else if (change.type === 'removed') {
                        const product = this.createOrderFromDoc(change.doc);
                        observer.next({
                            type: 'removed',
                            product: product
                        });
                    }
                });
            });

            return () => {
                unsubscribe();
            };
        });
    }

    private createOrderFromDoc(doc: firebase.firestore.QueryDocumentSnapshot) {
        const data = doc.data();
        const product = new Product();
        product.id = doc.id;
        product.name = data.shortDescription;
        product.salePrice = data.price || 0;
        product.costPrice = data.costPrice || 0;
        product.description = data.longDescription;
        product.qty = data.qty || 0;
        product.active = data.active || false;
        product.imageUrl = null;
        return product;
    }
}
