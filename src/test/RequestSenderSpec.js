var assert = require("assert");
let mockito = require("testdouble");

global.MainWindowState = mockito.replace(
	"../main/js/com/github/pigovsky/rest_client_jsonpath_jq/ui/MainWindowState.js"
).MainWindowState;
mockito.when(MainWindowState.getRequestMethodAndUrl()).thenReturn("get /api/something");
MainWindowState.responseJsonEditor = mockito.object({set: () => {}});
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
			mockito.verify(MainWindowState.showProgress());
			mockito.verify(MainWindowState.hideProgress());
			done();
		})   
	}) 
})

