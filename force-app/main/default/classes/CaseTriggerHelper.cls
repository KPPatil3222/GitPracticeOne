public class CaseTriggerHelper {
    
    public static void insertPrimaryContactWhileSavingCase(List<Case> caseList){
        set<Id> setOfIds = new set<Id>();
        Map<Id,Id> contactIdOfPrimaryContactByAccountId = new Map<Id,Id>();

        for(Case caseRecord : caseList){
            if(caseRecord.AccountId != null){
                setOfIds.add(caseRecord.AccountId);
            }
        }
        
        List<contact> listOfContactToBeInsertedWhileSavingCase = [SELECT Id, AccountId, Name FROM Contact
                                                                  WHERE AccountId in : setOfIds AND Contact_Role__c= 'Primary Contact'];
        
        
        for(Contact con : listOfContactToBeInsertedWhileSavingCase){
            if(!contactIdOfPrimaryContactByAccountId.containsKey(con.AccountId)){
                contactIdOfPrimaryContactByAccountId.put(con.AccountId,con.Id);
            }
            
        }
        
        for(Case caseObj : caseList){
            caseObj.ContactId=contactIdOfPrimaryContactByAccountId.get(caseObj.AccountId);
        }    
    }

}