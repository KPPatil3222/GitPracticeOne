public class OpportunityTriggerHandler
{
    public static void onAfterInsert(List<Opportunity> oppList)
    {
        OpportunityTriggerHelper.updateOppCountOnAccount(oppList);
    }
    
    public static void onAfterUpdate(List<Opportunity> oppList)
    {
        OpportunityTriggerHelper.updateOppCountOnAccount(oppList);
    }
    
    public static void onAfterDelete(List<Opportunity> oppList)
    {
     OpportunityTriggerHelper.updateOppCountOnAccount(oppList);
    }

    public static void onAfterUndelete(List<Opportunity> oppList)
    {
      OpportunityTriggerHelper.updateOppCountOnAccount(oppList);
    }
  
    
}