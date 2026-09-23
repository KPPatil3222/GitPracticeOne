public with sharing class carImageController {
   
 @AuraEnabled
    public static void createFile(
        string recordId,
        string documentId,
        boolean isPrimaryImage
    ){
     
        List<ContentVersion> contentVersionList =[ Select Id, ContentDocumentId FROM ContentVersion WHERE ContentDocumentId =: documentId AND IsLatest = true order by CreatedDate DESC LIMIT 1];

        if(contentVersionList.isEmpty()){
            throw new AuraHandledException('No ContentVersion found for the given documentId'+documentId);
        }
        Car_Image__c carImage = new Car_Image__c(
            Car__c = recordId,
            Image_Url__c = '/sfc/servlet.shepherd/version/download/'+contentVersionList[0].Id
        );

        if(isPrimaryImage){
            carImage.Primary_Image__c = true;
        }   
        try{
            insert carImage;
             system.debug('I am at line no 27');
        }
        catch (DmlException e) {
         throw new AuraHandledException(
        'Unable to create Car Image: ' + e.getMessage()
               );
         }

    }

    @AuraEnabled(Cacheable=true)
    public static List<Car_Image__c> getCarImages(Id productId){
           system.debug('I am at line no 37');
        try {
            return[ SELECT Id, Car__r.Name, Image_Url__c,Primary_Image__C
            FROM Car_Image__c 
            WHERE Car__c =:productId
            WITH USER_MODE 
            ];
          
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}