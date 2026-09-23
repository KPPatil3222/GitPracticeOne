import { LightningElement,wire } from 'lwc';
import GET_CONTACTS from '@salesforce/apex/ContactDataTableController.getContacts';
export default class ContactDataTable extends LightningElement {
    columns = [
        { label: 'Id', fieldName: 'Id' },
        { label: 'Contact Name', fieldName: 'Name', initialWidth: 200, editable: true },
        { label: 'Title', fieldName: 'Title' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' },
        { label: 'Email', fieldName: 'Email', type: 'email', editable: true, initialWidth: 200 },
        { label: 'Department', fieldName: 'Department' },
      ];
      dataForInput = [];
    
      @wire(GET_CONTACTS)
      contactListFromApex({ data, error }) {
        if (data) {
          this.dataForInput = data;
          console.log('contactListFromApex==> ' + JSON.stringify(data));
        }
        else if (error) {
    
        }
      }
    
      handleCellchange(event) {
        console.log('event==> ' + JSON.stringify(event));
      }
    
      handleRowSelection(event) {
        console.log('event handleRowSelection==> ' + JSON.stringify(event.detail));
    
    }
    
}