public class RetryQueueable
implements Queueable,
Database.AllowsCallouts{

    List<Id> logIds;

    public RetryQueueable(List<Id> ids){

        logIds=ids;

    }

    public void execute(
        QueueableContext qc){

        List<Integration_Log__c> logs=[

        SELECT Id,
               Request_Body__c,
               Retry_Count__c

        FROM Integration_Log__c

        WHERE Id IN:logIds

        ];

        Http http=new Http();

        for(Integration_Log__c log:logs){

            try{

                HttpRequest req=
                new HttpRequest();

                req.setEndpoint(
                'callout:SAP_API/order');

                req.setMethod('POST');

                req.setBody(
                log.Request_Body__c);

                HttpResponse res=
                http.send(req);

                if(res.getStatusCode()==200){

                    log.Status__c='Success';

                }

                else{

                    log.Retry_Count__c++;

                    log.Last_Attempt__c=
                    System.now();

                }

            }

            catch(Exception ex){

                log.Retry_Count__c++;

                log.Last_Attempt__c=
                System.now();

            }

        }

        update logs;

    }

}