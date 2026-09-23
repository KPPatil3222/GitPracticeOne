import { LightningElement, api } from 'lwc';
import GET_ACCOUNT from '@salesforce/apex/SecondComponentController.getAccountInfo';
export default class ChildComponentApril extends LightningElement {
    @api parentvalue;
    account
    connectedCallback() {
      console.log('this.parentvalue in connectedCallback => ' + this.parentvalue);
      if (this.parentvalue) {
        this.getAccount();
      }
    }
    @api
    getAccount(data) {
      console.log('data from template==> ' + data);
      if (data) {
        this.parentvalue = data;
      }
  
      GET_ACCOUNT({ recordId: this.parentvalue })
        .then(result => {
          this.account = JSON.stringify(result);
          console.log('result line 41==> ' + JSON.stringify(result));
        }).catch(error => {
  })
}
  
handleClickSend() {
    console.log('this.account line no 28 ==> ' + this.account);
    const myEvent= new CustomEvent('addition', {
      detail: this.account
    });
    this.dispatchEvent(myEvent);
    console.log('this.account line no 33 ==> ' + this.detail);
}
}