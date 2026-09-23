public with sharing class MyFirstComponentController {
    @AuraEnabled(cacheable=true)
    public static Account getAccountInfo(String recordId) {
        Account acc = [SELECT Id, Name, Support_Tier__c FROM Account WHERE Id = :recordId];
        return acc;
    }

    @AuraEnabled(cacheable=false)
    public static Account updateAccount(String accountName, String supportTier, String recordId) {
        Account acc = new Account();
        acc.Id = recordId;
        acc.Name = accountName;
        acc.Support_Tier__c = supportTier;
        System.debug('before update => ' + acc);
        update acc;
        System.debug('after update => ' + acc);
        return acc;
    }

    @AuraEnabled(cacheable=false)
    public static Account saveAccount(String accountName, String supportTier) {
        Account acc = new Account();
        acc.Name = accountName;
        acc.Support_Tier__c = supportTier;
        System.debug('before insert => ' + acc);
        insert acc;
        System.debug('after insert => ' + acc);
        return acc;
    }
}