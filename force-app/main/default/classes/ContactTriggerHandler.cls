public class ContactTriggerHandler {
    public static void onBeforeInsert(list<Contact> listOfContacts){
        ContactTriggerHelper.setDefaultEmail(listOfContacts);
	}
}