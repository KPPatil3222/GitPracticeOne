import { LightningElement } from 'lwc';

export default class IfElse extends LightningElement {

    showTom = false;
    showJerry = false;

    handleShowTom(event) {
        this.showTom = true;
     }

     handleShowJerry(event) {       
        this.showJerry = true;
     }
     
}