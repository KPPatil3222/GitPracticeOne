import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
name;
email;
handleNameChange(event) {
    this.name = event.target.value;
    console.log('Name changed to:', this.name);
    console.log('what target contains', event.target);
    console.log('what value contians:--', event.target.value);
  }

  handleEmailchange=(event)=>{
    this.email=event.target.value;
    console.log('email--->', this.email);
  }

 handleClick=()=>{
    console.log('Click Event');
    
  }



}