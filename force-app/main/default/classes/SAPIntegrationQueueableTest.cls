@IsTest
private class SAPIntegrationQueueableTest {

    /*
     * Test Successful Callout
     */
    @IsTest
    static void testSuccessfulCallout() {

        // Register Success Mock
        Test.setMock(HttpCalloutMock.class, new SAPSuccessMock());

        // Create Test Account
        Account acc = new Account(
            Name = 'Test Account'
        );
        insert acc;

        // Create Opportunity in Prospecting Stage
        Opportunity opp = new Opportunity(
            Name = 'Test Opportunity',
            StageName = 'Prospecting',
            CloseDate = Date.today(),
            Amount = 10000,
            AccountId = acc.Id
        );

        insert opp;

        Test.startTest();

        // Change Stage to Closed Won
        opp.StageName = 'Closed Won';
        update opp;

        Test.stopTest();

        // Verify Integration Log
        Integration_Log__c log = [

            SELECT Status__c,
                   Request_Body__c,
                   Response_Body__c

            FROM Integration_Log__c

            WHERE Related_Record_Id__c = :opp.Id

            LIMIT 1

        ];

        System.assertEquals(
            'Success',
            log.Status__c
        );

        System.assertNotEquals(
            null,
            log.Request_Body__c
        );

        System.assert(
            log.Response_Body__c.contains('SUCCESS')
        );

    }

    /*
     * Test Failed Callout
     */
    @IsTest
    static void testFailedCallout() {

        // Register Failure Mock
        Test.setMock(HttpCalloutMock.class, new SAPFailureMock());

        // Create Account
        Account acc = new Account(
            Name = 'Failure Account'
        );

        insert acc;

        // Create Opportunity
        Opportunity opp = new Opportunity(

            Name = 'Failure Opportunity',

            StageName = 'Prospecting',

            CloseDate = Date.today(),

            Amount = 5000,

            AccountId = acc.Id

        );

        insert opp;

        Test.startTest();

        // Trigger executes Queueable
        opp.StageName = 'Closed Won';

        update opp;

        Test.stopTest();

        // Verify Log Record
        Integration_Log__c log = [

            SELECT Status__c,

                   Retry_Count__c,

                   Error_Message__c,

                   Response_Body__c

            FROM Integration_Log__c

            WHERE Related_Record_Id__c = :opp.Id

            LIMIT 1

        ];

        System.assertEquals(
            'Pending',
            log.Status__c
        );

        System.assertEquals(
            0,
            log.Retry_Count__c
        );

        System.assertEquals(
            'Internal Server Error',
            log.Response_Body__c
        );

    }

}