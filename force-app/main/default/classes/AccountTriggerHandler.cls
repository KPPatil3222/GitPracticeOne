public class AccountTriggerHandler {
    public static void onAfterUpdate( List<Account> listOfAccounts, Map<Id, Account> listOfOldAccount)
    {
        AccountTriggerHelper.updateDescriptionOnOpp(listOfAccounts, listOfOldAccount);
    }
    
    public static void onBeforeDelete(List<Account> listOfAccounts)
    {
      AccountTriggerHelper.restrictAccountDeletion(listOfAccounts);
    }
}