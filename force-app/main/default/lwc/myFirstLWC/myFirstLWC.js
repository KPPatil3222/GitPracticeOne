import { LightningElement,api,wire} from 'lwc';
import GET_ACCOUNT from '@salesforce/apex/MyFirstComponentController.getAccountInfo';
import UPDATE_ACCOUNT from '@salesforce/apex/MyFirstComponentController.updateAccount';
import SAVE_ACCOUNT from '@salesforce/apex/MyFirstComponentController.saveAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import { CurrentPageReference } from 'lightning/navigation';
export default class MyFirstLWC extends NavigationMixin (LightningElement) {

    accountName
    supportTier
    concatedValue
    @api recordId
    @api objectApiName
    @wire(CurrentPageReference)
    pageRef;

    constructor(){
      super();
      console.log("I am constructor");
      
    }

    connectedCallback() {
      console.log("I am connectedCallBack Method");
      console.log("recordId  "+this.recordId);
      console.log("objectApiName  "+ this.objectApiName);
      this.getAccount();
    }

    renderedCallback() {
        console.log("I am RenderedCallBack Method");
      }
  
      errorCallback() {
        
      }
      disconnectedCallback() {
        
      }
  
      getAccount(){
        GET_ACCOUNT({recordId: this.recordId})
          .then(result=>{
         // console.log('wire method called imperatively call from connected call back line no 39' + JSON.stringify(result));
          }).catch(error=>{
  
          })
        
      }
  
      @wire(GET_ACCOUNT, { recordId: '$recordId' })
      accountHandle({ data, error }) {
      if (data) { 
        console.log("I am Wire Method on line no 49");
        this.accountName = data.Name;
        this.supportTier= data.Support_Tier__c;
        console.log('data==> ', data);
        console.log('data stringify==> ' + JSON.stringify(data.Name));
        console.log('data stringify==> ' + JSON.stringify(data.Support_Tier__c));
      }
      if (error) {
        console.log('error stringify==> ' + JSON.stringify(error));
        }
      }
    
        handleAccountName(event){
        this.accountName = event.target.value; 
        }
    
        handleSupportTier(event){
        console.log("line no 37"+ this.supportTier);
        this.supportTier = event.target.value;
        //this.concatedInputMethod(tier);
        
        }
    
        concatedInputMethod(tiercatch){
        this.concatedValue = this.accountName + " "+ tiercatch;
        }
    
        handleRecordId(event){
        this.recordId = event.target.value;
        }
    
        handleUpdateClick(){
          
          console.log('support tier line 47==> ' + this.supportTier);
          UPDATE_ACCOUNT({ accountName: this.accountName, supportTier: this.supportTier, recordId: this.recordId })
            .then((result) => {
              console.log('update successfull result ' + JSON.stringify(result));
              this.showToast();
            }).catch(error => {
                console.log('error occured ' + JSON.stringify(error.body.pageErrors[0].message));
              });
              this.showErrorToast(error.body.pageErrors[0].message);
          }
      
          handleSaveClick(){
            SAVE_ACCOUNT({ accountName: this.accountName, supportTier: this.supportTier })
              .then((result) => {
                console.log('update successfull result ' + JSON.stringify(result));
                this.showToast();
      
              }).catch(error => {
                console.log('error occured ' + JSON.stringify(error.body.pageErrors[0].message));
              });
              this.showErrorToast(error.body.pageErrors[0].message);
          }
          showToast() {
            const event = new ShowToastEvent({
              title: 'Success..!',
              message:
                'Record Updated Successfully.',
              variant: 'success'
            });
            this.dispatchEvent(event);
            this.navigateToAccountRecordPage();  
      
          }
          showErrorToast(errorCatch) {
            const event = new ShowToastEvent({
              title: 'Error..!',
              message:
                errorCatch,
              variant: 'error',
              mode: 'sticky'
            });
            this.dispatchEvent(event);
          }
          navigateToAccountRecordPage() {
            console.log('navigateToAccountRecordPage called');
            this[NavigationMixin.Navigate]({
              type: 'standard__recordPage',
              attributes: {
                recordId: this.recordId,
                actionName: 'view'
              }
            });
      }
      }