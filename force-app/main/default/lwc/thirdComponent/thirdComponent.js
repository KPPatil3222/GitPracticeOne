import { LightningElement } from 'lwc';
import GET_ACCOUNT from '@salesforce/apex/ForLoopClass.runForLoop';
export default class ThirdComponent extends LightningElement {
  accountType 
  accountList
  get options() {
    return [
      { label: 'Prospect', value: 'Prospect' },
      { label: 'Customer - Direct', value: 'Customer - Direct' },
      { label: 'Technology Partner', value: 'Technology Partner' },
      { label: 'Tatya', value: 'Tatya' },
    ];
  }

  handleChange(event) {
    this.accountType = event.target.value;
    console.log('this.accountType==> ' + this.accountType);
    GET_ACCOUNT({ kp: this.accountType })
      .then(result => {
        this.accountList = result;
        for (var acc of this.accountList) {
          console.log('acc==> ', acc);
          console.log('acc Id==> ' + acc.Id);
          console.log('acc Name==> ' + acc.Name);
          console.log('acc Type==> ' + acc.Type);
        }
        //console.log('result line 18==> ' + JSON.stringify(result));
      }).catch(error => {

      })
    }
}



/*
    for(Account acc : listAccount){
            system.debug('acc==> ' +acc);
            system.debug('acc Id==> ' +acc.Id);
            system.debug('acc Name==> ' +acc.Name);
            system.debug('acc Type==> ' +acc.Type);
        }
*/