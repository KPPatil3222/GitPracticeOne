import { LightningElement, wire, api } from 'lwc';
import getCarReviews from '@salesforce/apex/CarReviewController.getCarReview';
export default class carRatingReview extends LightningElement {
@api recordId;
reviews = [];
averageRating=0;
totalReviews=0;
ratingDistribution = {};
error;
@wire(getCarReviews,{carId:'$recordId' })
wiredReviews({data,error}){
    if(data){
        this.reviews= data.reviews;
        this.averageRating = data.averageRating;
        this.totalReviews = data.totalReviews;
        this.ratingDistribution = data.ratingDistribution;
        this.processReviews();
        this.error= undefined;
        console.log('recordId:', this.recordId);
        console.log('data:', JSON.stringify(data));
        console.log('reviews:', JSON.stringify(data.reviews));
    }
    else if(error){
        this.error=error;
        this.allReviews= undefined;
        console.error('Error fetching reviews:', JSON.stringify(error));
    }
}


    processReviews(){
        if(this.reviews){
           this.reviews =
            this.reviews.map((review)=>   
                   {return{...review,
                     CreatedDateFormatted :         this.formatDate(review.CreatedDate)
                    };
                });      
        }
    }

    formatDate(dateString){
        const date = new Date(dateString);
       return date.toLocaleDateString(
        'en-US', 
        {   year: 'numeric', 
            month: 'long', 
            day: 'numeric'
         });        
      }


      get ratingDistributionList(){
        const distribution =[];
        for(let i=5; i>=1; i--){
        const count= this.ratingDistribution[i] || 0;
        const totalReviews = this.totalReviews || 1; // Avoid division by zero
        const percentage = (count / totalReviews) * 100;
        const fixedPercentage = percentage.toFixed(2); // Round to 2 decimal places
        let ratingDistributionObj ={ rating:i, count:count, percentage:fixedPercentage };
        distribution.push(ratingDistributionObj);
        }
        return distribution;
      }
}