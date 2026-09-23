trigger ContactTrigger on Contact (before insert, after insert, after update) {
    if (Trigger.isBefore && Trigger.isInsert) {
        ContactTriggerHandler.onBeforeInsert(Trigger.new);
    }
    
    
   // if(Trigger.isAfter && (Trigger.isInsert || Trigger.isUpdate)){
       contact con = new contact();
        string fname;
        string lname, title, emailtest;
        id id1;
        contact con2 = Trigger.new[0];
        system.debug('con2---->'+con2);
        if(con2.LastName != null)
        {
        system.debug('Trigger called');
           /* fname = con2.FirstName;
            lname= con2.LastName;
            title= con2.Title;
            emailtest= con2.Email;
            id1= con2.Id;*/
           sendContactToExtenalSystem con1 = new sendContactToExtenalSystem();
            con1.sendContact(con2.firstName,con2.lastName, con2.title, con2.email, con2.id); 
            system.debug('con1---->'+con1);
        }        
    }