import { LightningElement, api } from 'lwc';
import logo from '@salesforce/resourceUrl/CarOnRentalLogo';
export default class PlaceHolder extends LightningElement {
    @api message;
    logoUrl = logo;     
}