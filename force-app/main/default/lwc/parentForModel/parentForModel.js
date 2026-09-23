import { LightningElement, track } from 'lwc';

export default class ParentForPopUp extends LightningElement {
    @track isPopUpVisible = false;
    @track content = 'This is the modal content';

    openPopUp() {
        this.isPopUpVisible = true;
    }

    handleOkay() {
        this.isPopUpVisible = false;
    }
}