/**
 * @description Controller for retrieving car review information,
 *              including average rating, total reviews,
 *              rating distribution, and review records.
 */
public with sharing class CarReviewController {

    /**
     * @description Retrieves review information for a specific car.
     * @param carId The Id of the Car__c record.
     * @return ReviewWrapper containing rating and review information.
     */
    @AuraEnabled(cacheable=true)
    public static ReviewWrapper getCarReview(Id carId) {

        if (carId == null) {
            throw new AuraHandledException('Car Id is required.');
        }

        Car__c car = [
            SELECT Id, Average_Rating__c
            FROM Car__c
            WHERE Id = :carId
            LIMIT 1
        ];

        Decimal averageRating = car.Average_Rating__c == null
            ? 0
            : car.Average_Rating__c;

        List<Review__c> allReviews = [
            SELECT Id,
                   Rating__c,
                   Comments__c,
                   CreatedDate,
                   Booking__c,
                   Booking__r.Car__c
            FROM Review__c
            WHERE Booking__r.Car__c = :carId
            ORDER BY CreatedDate DESC
        ];

        Integer totalReviews = allReviews.size();

        Map<Integer, Integer> ratingDistribution =
            new Map<Integer, Integer>();

        for (Integer i = 1; i <= 5; i++) {
            ratingDistribution.put(i, 0);
        }

        for (Review__c review : allReviews) {

            if (review.Rating__c != null) {

                Integer rating = Integer.valueOf(review.Rating__c);

                Integer count = ratingDistribution.get(rating);

                if (count != null) {
                    ratingDistribution.put(rating, count + 1);
                }
            }
        }

        return new ReviewWrapper(
            averageRating,
            totalReviews,
            ratingDistribution,
            allReviews
        );
    }


    /**
     * @description Wrapper class used to return car review information
     *              from Apex to the Lightning Web Component.
     */
    public class ReviewWrapper {

        @AuraEnabled
        public Decimal averageRating { get; set; }

        @AuraEnabled
        public Integer totalReviews { get; set; }

        @AuraEnabled
        public Map<Integer, Integer> ratingDistribution { get; set; }

        @AuraEnabled
        public List<Review__c> reviews { get; set; }


        /**
         * @description Initializes the review wrapper with review information.
         * @param averageRating Average rating of the car.
         * @param totalReviews Total number of reviews.
         * @param ratingDistribution Number of reviews for each rating from 1 to 5.
         * @param reviews List of reviews associated with the car.
         */
        public ReviewWrapper(
            Decimal averageRating,
            Integer totalReviews,
            Map<Integer, Integer> ratingDistribution,
            List<Review__c> reviews
        ) {
            this.averageRating = averageRating;
            this.totalReviews = totalReviews;
            this.ratingDistribution = ratingDistribution;
            this.reviews = reviews;
        }
    }
}