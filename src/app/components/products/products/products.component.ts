import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductsRepositoryService, ProductEvent } from '../../../services/products-repository.service';
import * as firebase from 'firebase';

declare var $: any;

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    products: Product[] = [];
    productsFiltered: Product[] = [];
    selectedProduct: Product;
    searchValue: string;

    private db = firebase.firestore();

    constructor(private productsRepository: ProductsRepositoryService) { }

    ngOnInit() {
        this.productsRepository.on().subscribe(event => {
            this.handleProductEvent(event);
        });
        this.productsFiltered = this.products;
    }

    onDetailsClick(product: Product) {
        this.selectedProduct = product;
        $('#details-modal').modal('show');
    }

    onSaveChangesClick() {
        this.saveChanges().then(_ => {
            $('#details-modal').modal('hide');
        });
    }

    onPublishChangesClick() {

    }

    onSearchChange(value: string) {
        this.filterProducts(value);
    }

    private handleProductEvent(event: ProductEvent) {
        if (event.type === 'added') {
            this.products.push(event.product);
        } else if (event.type === 'removed') {
        }
    }

    private async saveChanges() {
        await this.db.collection('products').doc(this.selectedProduct.id).update({
            shortDescription: this.selectedProduct.name,
            longDescription: this.selectedProduct.description || null,
            price: this.selectedProduct.salePrice || 0,
            costPrice: this.selectedProduct.costPrice || 0,
            qty: this.selectedProduct.qty || 0,
            active: this.selectedProduct.active || false
        });
        const newDocRef = this.db.collection('settings').doc();
        await this.db.collection('settings').doc('web').update({
            productsVersion: newDocRef.id
        });
    }

    private async publishChanges() {

    }

    private filterProducts(search: string) {
        if (search === null || search === '') {
            this.productsFiltered = this.products;
        } else {
            this.productsFiltered = this.products.filter(x => x.name.toLowerCase().indexOf(search.toLowerCase()) != -1);
        }
    }
}
