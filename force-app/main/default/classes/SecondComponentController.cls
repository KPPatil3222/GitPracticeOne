public class SecondComponentController {
    @AuraEnabled(cacheable=true)
    public static Account getAccountInfo(String recordId){
        Account acc = [select Id, Name, Support_Tier__C FROM Account WHERE Id=: recordId];
        return acc;
    }
    @AuraEnabled(cacheable=false)
    public static String updateAccountInfo(String add,String supportTier, String recordId){
        Account acc = new Account();
        acc.Id = recordId;
        acc.Name = add;
        acc.Support_Tier__C =supportTier;
        system.System.debug('before update line no 13==>' +acc);
        update acc;
        system.System.debug('After update line no 15==>' +acc);
        return 'Update Succesfull';
    }

    @AuraEnabled(cacheable=false)
    public static Contact updateAccountAndContactInfo(String firstName,String lastName, String email, String recordId){
        
        Contact con = new Contact();
        con.FirstName = firstName;
        con.LastName = lastName;
        con.Email=email;
        con.AccountId=recordId;
        insert con;
        return con;
    }
}