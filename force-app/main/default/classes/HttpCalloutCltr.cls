public class HttpCalloutCltr
{
      @AuraEnabled
    public static map<String,Object> getCalloutResponseContent(String url)
    {
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setMethod('GET');
        HttpResponse res = h.send(req);
        system.debug('response---->'+res.getBody());
       map<String,Object> resultsMap = (map<String,Object>)JSON.deSerializeUntyped(res.getBody());
       system.debug('resultmap---->'+resultsMap);
       return resultsMap;
       }
 }