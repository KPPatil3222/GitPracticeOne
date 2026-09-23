public class ContactTriggerHelper {
    // Sets a default email address for contacts that have no email
    public static void setDefaultEmail(List<Contact> contacts) {
        for (Contact con : contacts) {
            if (String.isBlank(con.Email)) {
                String namePart = '';
                if (!String.isBlank(con.FirstName)) {
                    namePart += con.FirstName;
                }
                if (!String.isBlank(con.LastName)) {
                    namePart += '.' + con.LastName;
                }
                if (String.isBlank(namePart)) {
                    namePart = 'default.user';
                }
                con.Email = namePart.toLowerCase() + '@gmail.com';
            
            
        }
    }
}
}