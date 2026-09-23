public with sharing class datatableController {

    @AuraEnabled(cacheable=true)
    public static list<contact> getContactsList() {

        List<contact> contactList = new List<contact>();
        try {
            contactList = [SELECT Id, Name, Email, Title, Phone, AccountId, Account.Name FROM Contact LIMIT 10];
        } catch (Exception e) {
            System.debug('Error: ' + e.getMessage());
            throw new AuraHandledException('An error occurred while fetching contacts: ' + e.getMessage());
        }

        return contactList  ;

    }
}