import { LightningElement, api } from 'lwc';
import fiveStar from '@salesforce/resourceUrl/fivestar';
import {loadStyle, loadScript} from 'lightning/platformResourceLoader';
export default class StarRating extends LightningElement {
    @api value = 0;
    @api max = 5;
    @api readOnly = false;
    isRendered= false;

    renderedCallback() {
        console.log('StarRating renderedCallback');
        if(this.isRendered) {
            return;
        }
        this.loadScriptAndStyle();
        this.isRendered = true;
    }
    
    loadScriptAndStyle() {

        console.log('Loading fiveStar resources...');
        Promise.all([
            loadStyle(this, fiveStar + '/rating.css'),
          loadScript(this, fiveStar + '/rating.js')
        ])
        .then(() => {
            this.afterScriptsLoaded();
        })
        .catch((error) => {
            console.error('Error loading star rating resources:', error);
        });
    }    

    get starClass() {
        return this.readOnly ? 'readonly c-rating' : 'c-rating';
    }

    afterScriptsLoaded() {

       console.log('afterScriptsLoaded() called');
        const domEl= this.template.querySelector('ul');

     console.log('UL element:', domEl);

        console.log('value:', this.value);

        console.log('max:', this.max);

        console.log('readOnly:', this.readOnly);

        console.log('window.Rating:', window.Rating);  
        
        if (!domEl) {

            console.error('UL element not found');

            return;
        }

        if (!window.Rating) {

            console.error(
                'window.Rating is not available'
            );

            return;
        }

        const callback= (rating)  => {
            this.value= rating;
            let myEvent= new CustomEvent('ratingchange', {
                detail: { rating: rating } 
            });
    
            this.dispatchEvent(myEvent);
        };

        this.ratingObj=  window.Rating(
            domEl, 
            this.value,
             this.max,
              callback,
               this.readOnly);

               console.log(
            'Rating object created:',
            this.ratingObj
        );

        }           

}