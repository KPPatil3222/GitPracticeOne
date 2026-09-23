public class IntegrationLogger{

    public static void logFailure(

        Id recordId,

        String request,

        String response,

        String error){

        Integration_Log__c log=
        new Integration_Log__c(

            Related_Record_Id__c=recordId,

            Request_Body__c=request,

            Response_Body__c=response,

            Status__c='Pending',

            Retry_Count__c=0,

            Error_Message__c=error,

            Last_Attempt__c=System.now()

        );

        insert log;

    }

    public static void logSuccess(

        Id recordId,

        String request,

        String response){
			system.debug('Inside IntegrationLogger LogSuccess');
        Integration_Log__c log=
        new Integration_Log__c(

            Related_Record_Id__c=recordId,

            Request_Body__c=request,

            Response_Body__c=response,

            Status__c='Success'

        );
		system.debug('Log body' +log);
     	
        insert log;
        System.debug('Inserted Log Id = ' + log.Id);

    }

}