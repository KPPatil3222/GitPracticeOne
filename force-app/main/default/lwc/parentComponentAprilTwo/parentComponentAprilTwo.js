import { LightningElement } from 'lwc';

export default class ParentComponentAprilTwo extends LightningElement {
    parentData = '';
    childData = '';
    handleInputField(event) {
        this.parentData = event.target.value;
        console.log('this.parentData ==> ' + this.parentData);

        if (this.parentData) {
            const childComponent = this.template.querySelector('c-child-component-april[data-id="childcmp"]');
            if (childComponent) {
                console.log('Passing to childComponent ==> ' + this.parentData);
                childComponent.getAccount(this.parentData);
            }
        }
    }

    handleSend(event) {
        console.log('event.detail line no 20 ==> ' + event.detail);
        this.childData = event.detail;
        console.log('this.childData ==> line no 22==>' + this.childData);
  }
}