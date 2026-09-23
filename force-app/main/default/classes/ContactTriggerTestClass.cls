@isTest
public class ContactTriggerTestClass {
    @isTest
    static void testSetDefaultEmail_whenEmailIsBlank() {
        // Create a contact with no email
        Contact testContact = new Contact(
            FirstName = 'John',
            LastName = 'Doe'
            // Email intentionally left blank
        );

        // Insert the contact - this will trigger your logic
        insert testContact;

        // Fetch the inserted contact
        Contact insertedContact = [SELECT Id, Email FROM Contact WHERE Id = :testContact.Id];

        // Assert that default email was set
        System.assertEquals('default@example.com', insertedContact.Email);
    }

    @isTest
    static void testSetDefaultEmail_whenEmailExists() {
        // Create a contact with a valid email
        Contact testContact = new Contact(
            FirstName = 'Jane',
            LastName = 'Smith',
            Email = 'jane@example.com'
        );

        // Insert the contact
        insert testContact;

        // Fetch the inserted contact
        Contact insertedContact = [SELECT Id, Email FROM Contact WHERE Id = :testContact.Id];

        // Assert that the original email remains unchanged
        System.assertEquals('jane@example.com', insertedContact.Email);
    }
}