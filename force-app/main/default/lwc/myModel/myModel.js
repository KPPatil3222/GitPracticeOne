import {  api } from 'lwc';
import LightningModel from './myModel.js';

export default class MyModel extends LightningModel {

    @api content;

    handleOkay() {
        this.close('okay');
    }
}