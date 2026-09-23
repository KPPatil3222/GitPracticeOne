import { LightningElement } from 'lwc';

export default class ParentCompnetMarch extends LightningElement {
    parentDataMarch
  handleInputField(event) {
    this.parentDataMarch = event.target.value;
    console.log('this.parentData==> ' + this.parentData);
}

}