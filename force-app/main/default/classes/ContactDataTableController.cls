public with sharing class ContactDataTableController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        return [SELECT Id, Name, Title, Phone, Email,Department FROM Contact WHERE phone != Null AND Title != null AND Department != null];
    }
}