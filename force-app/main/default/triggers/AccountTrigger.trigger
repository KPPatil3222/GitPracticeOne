trigger AccountTrigger on Account(after update, before delete){

    if(trigger.isUpdate && trigger.isAfter){
	AccountTriggerHandler.onAfterUpdate(trigger.new, trigger.oldMap);
    }
    
    if(trigger.isDelete && trigger.isBefore)
    {
        AccountTriggerHandler.onBeforeDelete(trigger.old);
    }

}