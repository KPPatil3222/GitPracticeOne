import { LightningElement, api, wire } from 'lwc';
import GET_ACCOUNT from '@salesforce/apex/SecondComponentController.getAccountInfo';
import UPDATE_ACCOUNT from '@salesforce/apex/SecondComponentController.updateAccountInfo';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import INSERT_ACCOUNT_AND_CONTACT from '@salesforce/apex/SecondComponentController.updateAccountAndContactInfo';
import { NavigationMixin } from 'lightning/navigation';
import { CurrentPageReference } from 'lightning/navigation';
export default class Secondcmp extends NavigationMixin(LightningElement){
  accountName;
  supportTier;
  concatedValue;
  showContact;
  firstName;
  lastName;
  email;
  contactId;
  @api recordId;
  @api objectApiName;
  @wire(CurrentPageReference)
  pageRef;


  constructor(){
    super();
    console.log('Constuctor called');
  }
  connectedCallback() {
    console.log('connectedCallback is  called');
    console.log('record Id=====>', this.recordId);
    console.log('objectApiName=====>', this.objectApiName);
  }

  @wire(GET_ACCOUNT, { recordId: '$recordId' })
  accountHandle({ data, error }) {
    if (data) {
      this.accountName = data.Name;
      this.supportTier = data.Support_Tier__c;
      console.log('data===>', data);
      console.log('data stringify===>', JSON.stringify(data));
    }

    if (error) {
      console.error('error===>'+JSON.stringify(error));
    }
  }

  handleAccountName(event) {
    this.accountName = event.target.value;
    console.log('accountName===>', this.accountName);
  }

  shubham(event) {
    this.supportTier = event.target.value;
    console.log('supportTier===>', this.supportTier);
    this.concatInputYashwant();
  }

  concatInputYashwant() {
    console.log('concat method called')
    this.concatedValue = this.accountName+" "+this.supportTier
  }

  handleUpdateClick() {
    UPDATE_ACCOUNT({add:this.accountName, supportTier:this.supportTier, recordId:this.recordId})
    .then(()=>{
      console.log('Account updated successfully');
      this.showToastMSG();
    }).catch(error => {
      console.log('Caught error:'+ JSON.stringify(error));
      //this.showErrorToast(error.body.pageErrors[0].message);
    });
    
  }

  handleRecordId(event){
    this.recordId=event.target.value;
  }

  showToastMSG(){
    const event= new ShowToastEvent({
      title:'Success...!',
      message:'Record updated Successfully!',
      variant:'success'
    });
    this.dispatchEvent(event);
    this.handleNavigation();
  }

  showErrorToast(message) {
    const event = new ShowToastEvent({
      title: 'Error..!',
      message: message,
      variant: 'error',
      mode: 'sticky'
    });
    this.dispatchEvent(event);
  }
  
  
    
  handleNavigation() {
    // Generate a URL to a User record page
    console.log('Navigation called');
    console.log('navigateToAccountRecordPage called');
    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: {
          recordId: this.contactId,
        actionName: 'view'
      }
    });
    setTimeout(() => {
     //window.location.reload();
    }, 2000);
    }
    handleShowContact(){
      this.showContact=true;
    }

  handleFirstName(event){
    this.firstName=event.target.value;
  }

  handleLastName(event){
    this.lastName=event.target.value;
  }

  handleEmail(event){
    this.email=event.target.value;
  }
  handleHideContact(){
    this.showContact=false;
  }

  handleUpdateContact(){
    INSERT_ACCOUNT_AND_CONTACT({firstName:this.firstName, lastName:this.lastName, email:this.email, recordId:this.recordId})
    .then((result)=>{
      console.log('Contact updated successfully', result);
      this.contactId=result.Id;
      this.showToastMSG();
    }).catch(error => {
      console.log('Caught error:'+ JSON.stringify(error));
      //this.showErrorToast(error.body.pageErrors[0].message);
  })
  }
    
}