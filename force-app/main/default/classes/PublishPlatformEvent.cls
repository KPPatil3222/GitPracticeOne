public with sharing class PublishPlatformEvent {

    public static void publishPlatformEvent() {

        List<Order_Detail__e> orderDetailsEvents = new List<Order_Detail__e>();

        Order_Detail__e event1 = new Order_Detail__e(
            Order_Number__c = 'ORD12345',
            Generate_Invoice__c = true
        );

        Order_Detail__e event2 = new Order_Detail__e(
            Order_Number__c = 'ORD10001',
            Generate_Invoice__c = true
        );

        Order_Detail__e event3 = new Order_Detail__e(
            Order_Number__c = 'ORD10002',
            Generate_Invoice__c = false
        );

        orderDetailsEvents.add(event1);
        orderDetailsEvents.add(event2);
        orderDetailsEvents.add(event3);

        Database.SaveResult[] results = EventBus.publish(orderDetailsEvents);

        for(Database.SaveResult result : results){

            if(result.isSuccess()){

                System.debug('Published Successfully : ' + result.getId());

            }else{

                for(Database.Error error : result.getErrors()){

                    System.debug('Error : ' + error.getMessage());

                }

            }

        }

    }

}