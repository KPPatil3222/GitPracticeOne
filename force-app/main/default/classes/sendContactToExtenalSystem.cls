public class sendContactToExtenalSystem {

    public void sendContact(String firstName, String lastName, String title, String email, id id2)
    {
        sendDataSalesforceChildSystem(id2);
    }
    
    @future(callout=True)
        public static void sendDataSalesforceChildSystem(id id2)
        {
             contact con =[select firstName, lastName, title, email from contact where id =: id2];
            
            partnerSoapSforceCom.Soap myPartnerSoap = New  partnerSoapSforceCom.Soap(); 
            
             partnerSoapSforceCom.LoginResult partnerLoginResult = 
                 	myPartnerSoap.login('patil.kuldeep2121@mindful-hawk-3axjfu.com', 'Shine@3760OLnKNLO3b1TwTqWae6VK89HK');
            
            system.debug('session id --->'+partnerLoginResult.sessionId );
            string sessionIdFetched = partnerLoginResult.sessionId;
            soapSforceComSchemasClassRecievepar.SessionHeader_element websevicesSessionHeader = 
                								new soapSforceComSchemasClassRecievepar.SessionHeader_element();
            websevicesSessionHeader.sessionId=sessionIdFetched;
            soapSforceComSchemasClassRecievepar.recieveParameterOrg2 objA =
                								new soapSforceComSchemasClassRecievepar.recieveParameterOrg2();
            objA.SessionHeader=websevicesSessionHeader;
            string status =  objA.createContactRecord(con.firstName, con.lastName, con.title, con.email);
            system.debug('status---->'+status);
            
        }
    
    
}