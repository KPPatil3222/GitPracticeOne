import { LightningElement, api } from 'lwc';

export default class RecordEditForm extends LightningElement {

    @api objectApiName;
    @api recordId;


    connectedCallback() {
        console.log('Record ID:', this.recordId);
        console.log('Object API Name:', this.objectApiName);
    }

    handleSuccess(event){
        alert('record is saved');
        console.log(JSON.stringify(event.detail));
    }

    handleError(event){
        console.log(JSON.stringify(event));

    }
}