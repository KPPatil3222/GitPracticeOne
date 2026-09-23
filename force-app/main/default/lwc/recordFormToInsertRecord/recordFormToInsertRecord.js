import { LightningElement, api } from 'lwc';

export default class RecordFormToInsertRecord extends LightningElement {

fields=
    [
        "Name",
        "Industry",
        "Rating",
        "Type",
        "Active__c",
        "Description",
        "Phone"
];

        connectedCallback(event) {
                console.log()
                }   

        handleSuccess(event)
        {
            alert("Record Saved Successfully");
        }

        hanldeError(event)
        {
            console.log(JSON.stringify(event.detail));
        }







}