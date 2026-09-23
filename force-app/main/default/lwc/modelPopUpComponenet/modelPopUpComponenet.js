import { api} from 'lwc';
import LightningModal from 'lightning/modal';
export default class ModelPopUpComponenet extends LightningElement {
    @api content;

    handleOkay() {
        this.close('okay');
    } 
}