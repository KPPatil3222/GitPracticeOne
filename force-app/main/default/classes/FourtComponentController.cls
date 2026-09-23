public  class FourtComponentController {
    @AuraEnabled(cacheable=true)
    public static Account getAccountInfo(String recordId) {
        Account acc =[SELECT Id,Name,SLA__c FROM Account WHERE Id = :recordId];
        return acc;

    }
}