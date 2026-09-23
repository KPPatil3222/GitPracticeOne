public class AccountTriggerHelper {
    public static void updateDescriptionOnOpp(List<Account> listOfAccounts, Map<Id, Account> listOfOldAccount){
      
        set<Id> setOfUpdatedAccountId = New set<Id>();
        Map<Id,String> mapDescriptionByAccId = New Map<Id, String>();
        
        for(Account acc : listOfAccounts){
            
            if(acc.Description != listOfOldAccount.get(acc.Id).Description)
            {
            setOfUpdatedAccountId.add(acc.Id);
            mapDescriptionByAccId.put(acc.Id, acc.Description);
            }
    	}
        if(setOfUpdatedAccountId.isEmpty())
        {
            return;
        }
        
        List<Opportunity> oppList = New List<Opportunity>([SELECT Id, Description, AccountId FROM Opportunity 
                                                           WHERE AccountId IN: setOfUpdatedAccountId]);
        
        for(Opportunity opp : oppList){
		     opp.Description= mapDescriptionByAccId.get(opp.AccountId);	
        }
        
        if(!oppList.isEmpty()){
            update oppList;
        }
    }     
    
   /*restrict account deletion when related opportunity is open. that means not closed won or closed Lost */
    
    
        public static void restrictAccountDeletion(List<Account> listOfAccounts)
    	{
            set<Id> setOfAccIds = new set<Id>();
            Map<Id, list<Opportunity>> mapOfDescriptionByAccID = new Map<Id, List<Opportunity>>();
            
            for(Account acc : listOfAccounts)
            {
             setOfAccIds.add(acc.Id);   
            }
            
            List<Opportunity> oppList = [SELECT Id, StageName, AccountId FROM Opportunity WHERE AccountId IN:setOfAccIds ];
            
            if(!oppList.isEmpty())
            {
                for(Opportunity opp : oppList)
                {
                    if(opp.StageName != 'Closed Lost' && opp.StageName != 'Closed Lost')
                    {
                        if(!mapOfDescriptionByAccID.containsKey(opp.AccountId))
                        {
                            List<Opportunity> oppLocalList = New List<Opportunity>();
                            oppLocalList.add(opp);
                            mapOfDescriptionByAccID.put(opp.AccountId, oppLocalList);
                        }
                        else
                        {
                            mapOfDescriptionByAccID.get(opp.AccountId).add(opp);
                        }
                    }
                }
            }
            
            for(Account acc : listOfAccounts)
            {
                if(mapOfDescriptionByAccID.containsKey(acc.Id)){
                    
                   acc.addError(' Opportunity is Open ,Can not delete opportunity');
                }
            }
        
        }    

   }