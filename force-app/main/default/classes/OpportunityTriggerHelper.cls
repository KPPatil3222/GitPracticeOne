public class OpportunityTriggerHelper {
 
	public static void updateOppCountOnAccount(List<Opportunity> oppList)
    {
       set<Id> accId = New Set<Id>();
       Map<Id, List<Opportunity>> mapOfOppurtunityByAccId = New   Map<Id, List<Opportunity>>();
        
        for(Opportunity opp : oppList){
            accId.add(opp.AccountId);
        }
        List<Opportunity> oppRelatedAccount = [SELECT Id, AccountId, Name FROM Opportunity WHERE AccountId IN : accId];
        
        for(Opportunity opp : oppRelatedAccount){
            if(!mapOfOppurtunityByAccId.containsKey(opp.AccountId)){
                mapOfOppurtunityByAccId.put(opp.AccountId, New List<Opportunity>{opp});
            }
            else{
                mapOfOppurtunityByAccId.get(opp.AccountId).add(opp);
            }
        }
        
        List<Account> accListToBeUpdated =  New List<Account>();
        
        for( Id accountId : accId){
            List<Opportunity> listOfOppRelatedTOAccId = mapOfOppurtunityByAccId.get(accountId);
            Integer Count= listOfOppRelatedTOAccId.size();
            Account acc = New Account();
            acc.Id= accountId;
            acc.Opportunity_Count__c = Count;
            accListToBeUpdated.add(acc);
        }
        
        update accListToBeUpdated;
    }

}