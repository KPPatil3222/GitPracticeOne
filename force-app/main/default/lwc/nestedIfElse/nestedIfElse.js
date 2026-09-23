import { LightningElement } from 'lwc';

export default class NestedIfElse extends LightningElement {
gradeAplus = false;
gradeA = false;
gradeB = false;

handleMarksChange(event) {
  const marks = parseInt(event.target.value, 10);
  this.gradeAplus = marks > 80;
  this.gradeA = marks > 70 && marks <= 80;
  this.gradeB = marks > 60 && marks <= 70;
    }

 person ={

    Name: 'John Doe',
    Age: 30,                         
    Address: {
        Street: '123 Main St',
        City: 'Anytown',
        State: 'CA',
        ZipCode: '12345'
    },
    gender: 'Male',
    phone: '555-1234',

 }
}