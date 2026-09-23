import { LightningElement } from 'lwc';

import getCalloutResponseContent
from '@salesforce/apex/HttpCalloutCltr.getCalloutResponseContent';

export default class CurrencyExchange extends LightningElement {

    currencyList=[];

    columns=[
        {
            label:'Currency',
            fieldName:'currency',
            type:'text'
        },
        {
            label:'Exchange Rate',
            fieldName:'rate',
            type:'number'
        }
    ];

    loadRates(){

        getCalloutResponseContent({

            url:'https://data.fixer.io/api/latest?access_key=1b78067a7046646c33970f9964364a87'

        })

        .then(result=>{

            console.log(result);

            let rates=result.rates;

            let temp=[];

            for(let key in rates){

                temp.push({

                    currency:key,

                    rate:rates[key]

                });

            }

            this.currencyList=temp;

        })

        .catch(error=>{

            console.error(error);

        });

    }

}