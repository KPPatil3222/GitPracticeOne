public with sharing class RecordNameController {

    @AuraEnabled
    public static String getRecordName(Id recordId, String objectApiName) {

        String query = 'SELECT Name FROM ' + objectApiName +
                       ' WHERE Id = :recordId  LIMIT 1';

        SObject record = Database.query(query);

        return (String) record.get('Name');
    }
}