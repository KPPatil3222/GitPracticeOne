import { LightningElement,api, wire, track } from 'lwc';
import getRecordName from '@salesforce/apex/RecordNameController.getRecordName';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import USER_ID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import EMAIL_FIELD from '@salesforce/schema/User.Email';

const FIELDS = [NAME_FIELD, EMAIL_FIELD];
export default class ShowName extends LightningElement {

    @api recordId;
    @api objectApiName;
    userId = USER_ID;

    @wire(getRecord, {
        recordId: '$userId',
        fields: FIELDS
    })
    user;

    get userName() {
        return getFieldValue(this.user.data, NAME_FIELD);
    }

    get userEmail() {
        return getFieldValue(this.user.data, EMAIL_FIELD);
    }

    
    recordName;
    error;

    connectedCallback() {
        this.fetchRecordName();
    }

    fetchRecordName() {

        getRecordName({
            recordId: this.recordId,
            objectApiName: this.objectApiName
        })
        .then(result => {
            this.recordName = result;
            this.error = undefined;
        })
        .catch(error => {
            this.error = error.body?.message || 'Something went wrong';
            this.recordName = undefined;
        });
    }

}