public class ForLoopClass {
    @AuraEnabled(cacheable=true)
    public static List<Account> runForLoop(String kp){
        
        List<Account> listAccount = [SELECT Id, Name, Type,Support_Tier__c FROM Account WHERE Type = : kp  LIMIT 10];
        return listAccount;     
    }   
}