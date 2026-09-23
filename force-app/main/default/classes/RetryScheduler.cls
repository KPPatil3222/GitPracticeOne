global class RetryScheduler
implements Schedulable{

    global void execute(

        SchedulableContext sc){

        List<Id> ids=new List<Id>();

        for(Integration_Log__c log:

        [

        SELECT Id

        FROM Integration_Log__c

        WHERE Status__c='Pending'

        AND Retry_Count__c<3

        ]){

            ids.add(log.Id);

        }

        if(!ids.isEmpty()){

            System.enqueueJob(

                new RetryQueueable(ids)

            );

        }

    }

}