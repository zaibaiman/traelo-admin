import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import * as firebase from 'firebase';

declare var $: any;

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    products: Product[] = [];
    private db = firebase.firestore();

    constructor() { }

    ngOnInit() {
        this.loadProducts();
    }

    onDetailsClick() {
        $('#details-modal').modal('show');
    }

    private async loadProducts() {
        let productsSnapshot = await this.db.collection('products').limit(30).get();
        productsSnapshot.forEach(snapshot => {
            const data = snapshot.data();
            this.products.push({
                id: data.id,
                name: data.shortDescription,
                salePrice: data.price,
                costPrice: 0,
                description: null,
                qty: 10,
                active: true,
                imageUrl: null
            });
        });
    }
}
