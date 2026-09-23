import { LightningElement, api } from 'lwc';
import fiveStar from '@salesforce/resourceUrl/fivestar';
import {loadStyle, loadScript} from 'lightning/platformResourceLoader';
export default class StarRating extends LightningElement {
    @api value = 0;
    @api max = 5;
    @api readOnly = false;
    isRendered= false;

    renderedCallback() {
        if(this.isRendered) {
            return;
        }
        this.loadScriptAndStyle();
        this.isRendered = true;
    }
    
    loadScriptAndStyle() {
        Promise.all([
            loadStyle(this, fiveStar + '/starRating.css'),
            loadScript(this, fiveStar + '/starRating.js')
        ])
        .then(() => {
            this.afterScriptLoaded();
        })
        .catch(error => {
            console.error('Error loading star rating resources:', error);
        });
    }    

    get starClass() {
        return this.readOnly ? 'readonly c-rating' : 'c-rating';
    }

    afterScriptLoaded() {
        const domEl= this.template.querySelector('ul');
        const callback= rating => {
            this.value= rating;
            let myEvent= new CustomEvent('ratingchange', {
                detail: { rating: this.value }
            });
    
            this.dispatchEvent(myEvent);
        };

        this.ratingObj=  window.Rating(
            domEl, 
            this.value,
             this.maxValue,
              callback,
               this.readOnly);

        }           

}