import { LightningElement, wire } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import getContactsList from '@salesforce/apex/datatableController.getContactsList';

const actions = [
    { label: 'Show details', name: 'details' },
    { label: 'Delete', name: 'delete' },
];

const columns = [
            { label: 'Name', fieldName: 'recordUrl', type:'url',
                typeAttributes: {
                     label:  {
                         fieldName: 'Name'
                         }, 
                         target: '_blank'
                         },
                cellAttributes: {
                    iconName:{ fieldName: 'contactIcon' },
                     alignment: 'left', 
                    iconalternateText: 'Contact Icon'
                }
                          
            },
            { label: 'Title', fieldName: 'Title', type : 'text',  sortable: true, editable:true},
            { label: 'Email', fieldName: 'Email', type : 'email', sortable: true, editable:true},
            { label: 'Phone', fieldName: 'Phone', type : 'phone', sortable: true, editable:true}, 
            { label: 'AccountId', fieldName: 'AccountId', type : 'text' },
            { label: 'Account Name', fieldName: 'accountUrl', type : 'url', 
                  typeAttributes: {
                     label:  {
                         fieldName: 'Account.Name'
                         }, 
                         target: '_blank'
                         } ,
                cellAttributes: {
                    iconName:{ fieldName: 'accountIcon' },
                     alignment: 'left', 
                    iconalternateText: 'Account Icon'
                }
            }, 
            {type : 'button-icon', typeAttributes: { iconName: 'utility:preview', name: 'preview', title: 'Preview', variant: 'border-filled', alternativeText: 'Preview' } },
            { type: 'action', typeAttributes: { rowActions: actions }} ,

];

export default class DatatableComponent extends LightningElement {

contactData;
columnList= columns;
error;

refreshApexData;

/** Attributes for datatable draft values*/
draftValues = [];

/* Attributes for selected row */
selectedRows =[];
selectedRowList=[];

/* Attributes for datatable sorting*/
sortedBy   ='Phone';
sortedDirection = 'asc';


@wire(getContactsList)
wiredContacts(result) {
    this.refreshApexData = result;
    const { data, error } = result;    
    if (data) {
        const parsedData = JSON.parse(JSON.stringify(data));
        console.log('Parsed Data==>:', parsedData);
        let baseUrl = 'https://'+location.host+'/'
        parsedData.forEach(contact => { 
            contact['Account.Name'] = contact.Account ? contact.Account.Name : '';
            contact.recordUrl = baseUrl + contact.Id;
            contact.accountUrl = contact.Account ? baseUrl + contact.Account.Id : ''; 
            contact.contactIcon = 'standard:contact';
            contact.accountIcon = 'standard:account';

        });
        this.contactData = parsedData;
        this.error = undefined;
    }
    else if (error) {
        this.error = error;
        this.contactData = undefined;
    }
    

}

    handleSave(event) {
    const recordInputs = event.detail.draftValues.map(draft => ({
        fields: { ...draft, Id: draft.Id } // ensure Id is present
    }));
    Promise.all(recordInputs.map(recordInput => updateRecord(recordInput)))
        .then(() => {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message: 'Contacts updated successfully!',
                variant: 'success'
            }));
            this.draftValues = [];
            return refreshApex(this.refreshApexData);
        })
        .catch(error => {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: 'Error updating contacts: ' + JSON.stringify(error),
                variant: 'error'
            }));
        });
}
 

  handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;
    switch (actionName) {
        case 'details':
            this.showRowDetails(row.Id);
            break;
        case 'delete':
            this.handledeleteRow(row.Id);  
            break;
        case 'preview':
            this.previewRow(row.Id); 
            break;
        default:
    } 
}   
    handledeleteRow(recordId) {
        // Implement the logic to delete the row
          alert('Deleting record with Id: ' + JSON.stringify(recordId));
    }   

    showRowDetails(recordId) {
        // Implement the logic to show row details
        console.log('Showing details for row:', JSON.stringify(recordId));
    }

    previewRow(rowId) {
        // Implement the logic to preview the row
        console.log('Previewing row with Id:', JSON.stringify(rowId));
    }

    handleSortData(event) {
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
        this.sortData(this.sortedBy, this.sortedDirection);
    }
    
    sortData(fieldname, direction) {    
        let parseData = JSON.parse(JSON.stringify(this.contactData));
        let keyValue = (a) => {
            return a[fieldname];
        };
        let isReverse = direction === 'asc' ? 1: -1;
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; 
            y = keyValue(y) ? keyValue(y) : '';
            return isReverse * ((x > y) - (y > x));
        });
        this.contactData = parseData;
    }


}