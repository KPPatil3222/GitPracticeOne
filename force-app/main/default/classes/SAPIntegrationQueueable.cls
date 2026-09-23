public class SAPIntegrationQueueable implements Queueable, Database.AllowsCallouts{
    List<Id> oppIds;
    public SAPIntegrationQueueable(List<Id> ids)
    {
        oppIds=ids;
    }

    public void execute(QueueableContext qc){

        List<Opportunity> oppList=[
            SELECT Id,Name,Amount
            FROM Opportunity
            WHERE Id IN:oppIds
        ];

        Http http=new Http();

        for(Opportunity opp:oppList){

            try{

                HttpRequest req=new HttpRequest();

                req.setEndpoint('callout:SAP_API/order');

                req.setMethod('POST');

                req.setHeader(
                    'Content-Type',
                    'application/json'
                );

                String body=JSON.serialize(opp);

                req.setBody(body);

                HttpResponse res=http.send(req);
                
                System.debug('Status Code : ' + res.getStatusCode());

                if(res.getStatusCode()==200){
                    
                    system.debug('Inside Success');
	
                    IntegrationLogger.logSuccess(
                        opp.Id,
                        body,
                        res.getBody()
                    );

                }
                else{
						System.debug('Inside Failure');
                    IntegrationLogger.logFailure(
                        opp.Id,
                        body,
                        res.getBody(),
                        res.getStatus()
                    );

                }

            }

            catch(Exception ex){

                IntegrationLogger.logFailure(
                    opp.Id,
                    JSON.serialize(opp),
                    '',
                    ex.getMessage()
                );

            }

        }

    }

}