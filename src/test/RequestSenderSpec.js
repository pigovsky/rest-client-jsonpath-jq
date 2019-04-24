var assert = require("assert");
let mockito = require("mocket");
let context = new mockito.Mocket();

let MainWindowState = context.createMock();
global.MainWindowState = MainWindowState;
MainWindowState.expects("saveRequest");
MainWindowState.expects("getRequestMethodAndUrl").returning("get /api/something");
MainWindowState.expects("getRequestBody");
MainWindowState.expects("setResponseBody");
MainWindowState.expects("showProgress");
MainWindowState.expects("hideProgress");
MainWindowState.responseJsonEditor = context.createMock();
MainWindowState.responseJsonEditor.expects("set");
global.HeaderFetcher = {
	headers: (url, f) => {f()}
};
global.HttpRequester = function(){};
global.HttpRequester.prototype.sendRequest = function(method, url, headers, requestBody, responseFun){
	responseFun('{"data":[]}');
};

let RequestSender = require("../main/js/com/github/pigovsky/rest_client_jsonpath_jq/ui/RequestSender.js").RequestSender;

describe('RequestSender', function(){   
	describe('#send', function(){     
		it('should show and hide request progress', function(done) {
			RequestSender.send();
			context.assertMocks();
			done();
		})   
	}) 
})

