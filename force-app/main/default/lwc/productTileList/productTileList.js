import { LightningElement, wire } from 'lwc';
import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubsub';
import getProducts from '@salesforce/apex/ProductController.getProducts';
import { CurrentPageReference } from 'lightning/navigation';

export default class ProductTileList extends LightningElement {
    pageNumber = 1;
    pageSize;
    totalItemCount = 0;
    filters = {};

    @wire(CurrentPageReference) pageRef;
    @wire(getProducts, { filters: '$filters', pageNumber: '$pageNumber' }) products;

    connectedCallback() {
        registerListener('filterChange', this.filterChangeHandler, this);
    }

    productSelectHandler(event) {
        fireEvent(this.pageRef, 'productSelected', event.detail);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    filterChangeHandler(filters) {
        this.filters = { ...filters };
        this.pageNumber = 1;
    }

    previousPageHandler() {
        this.pageNumber -= 1;
    }

    nextPageHandler() {
        this.pageNumber += 1;
    }

}