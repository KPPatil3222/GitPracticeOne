@IsTest
global class SAPSuccessMock implements HttpCalloutMock {

    global HttpResponse respond(HttpRequest req) {

        HttpResponse res = new HttpResponse();
        res.setStatusCode(200);
        res.setBody('{"status":"SUCCESS","sapOrderId":"SO12345"}');

        return res;
    }
}