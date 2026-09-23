import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class LightningRecordEditFormPractice extends LightningElement {

  // nameField = NAME_FIELD;

  @api isModalOpen
  @api recordId;
  @api objectApiName = 'Account';
  connectedCallback() {
    console.log('recordId 11==> ' + this.recordId);
  }

  handleRecordId(event) {
    this.recordId = event.target.value;
  }
  handleSuccess() {
    this.showToast('Success', 'Contact Update Successfully..!', 'success');
  }

  handleError() {
    this.showToast('Error ', 'Error while creating record..!', 'error');

  }
  showToast(title, message, variant) {
    const event = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(event);
    this.handleCancel();
    //this.navigateToAccountRecordPage();
  }

  handleCancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }
  handleSave() {
    const submitBtn = this.template.querySelector('.real-submit-button button');
    if (submitBtn) {
      submitBtn.click();
    }
  }
}