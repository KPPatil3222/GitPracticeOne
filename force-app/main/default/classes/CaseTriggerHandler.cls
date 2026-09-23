public class CaseTriggerHandler {
    public static void onBeforeInsert(List<Case> caseList){
        CaseTriggerHelper.insertPrimaryContactWhileSavingCase(caseList);
    }
}