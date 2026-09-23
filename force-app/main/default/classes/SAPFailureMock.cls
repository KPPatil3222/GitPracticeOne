@IsTest
global class SAPFailureMock implements HttpCalloutMock {

    global HttpResponse respond(HttpRequest req) {

        HttpResponse res = new HttpResponse();
        res.setStatusCode(500);
        res.setBody('Internal Server Error');

        return res;
    }
}