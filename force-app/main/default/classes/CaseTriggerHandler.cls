public class CaseTriggerHandler {
    public static void onBeforeInsert(List<Case> caseList){
        CaseTriggerHelper.insertPrimaryContactWhileSavingCase(caseList);
        system.debug('My GitHub');
        system.debug('My GitHub version');
    }
}