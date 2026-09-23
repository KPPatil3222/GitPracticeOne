import { LightningElement } from 'lwc';

export default class FirstComponent extends LightningElement {

    accountName
  supoortTier
  mobileNumber
  concatedValue

  handleAccountName(event) {


    this.accountName = event.target.value;


  }
  shubham(event) {

    var tier = event.target.value;
    this.conacatInputYashwant(tier);
  }
  handleMobilenumber(event) {

    this.mobileNumber = event.target.value;
    this.conacatInputYashwant();
  }
  conacatInputYashwant(kuldeep) {
    this.concatedValue = this.accountName + "  " + kuldeep+ " "+ this.mobileNumber;
  }
}