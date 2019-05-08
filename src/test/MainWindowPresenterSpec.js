const mockito = require("testdouble");

global.HeaderFetcher = {
	headers: (url, f) => {f()}
};
global.HttpRequester = function(){};
global.HttpRequester.prototype.sendRequest = function(method, url, headers, requestBody, responseFun){
	responseFun('{"data":[]}');
};


const MainWindowPresenter = require("../main/js/com/github/pigovsky/rest_client_jsonpath_jq/presenters/MainWindowPresenter.js").MainWindowPresenter;

describe('MainWindowPresenter', function(){   
	describe('#sendRequest', function(){     
		it('should show and hide request progress', function(done) {
      global.MainWindowView = mockito.replace(
	"../main/js/com/github/pigovsky/rest_client_jsonpath_jq/views/MainWindowView.js"
).MainWindowView;
      mockito.when(MainWindowView.getRequestMethodAndUrl()).thenReturn("get http://some.com:1234/api/something");
      MainWindowView.responseJsonEditor = mockito.object({set: () => {}});
			MainWindowPresenter.sendRequest();
			mockito.verify(MainWindowView.showProgress());
			mockito.verify(MainWindowView.hideProgress());
			done();
		})   
	});
	describe('#showHistoricalRequest', () => {
		it('should show a request from history', done => {
			global.RequestDao = mockito.replace("../main/js/com/github/pigovsky/rest_client_jsonpath_jq/daos/RequestDao.js").RequestDao;
			mockito.when(RequestDao.getRequest(0)).thenCallback({
				"methodAndUrl": "get https://oj.sw:4321/api/old-request",
				"headers": '{"a": "b"}',
				"body": ""
			}, 0);
			MainWindowPresenter.showHistoricalRequest();
			mockito.verify(MainWindowView.setRequestMethodAndUrl("get https://oj.sw:4321/api/old-request"));
			mockito.verify(MainWindowView.setRequestHeaders('{"a": "b"}'));
			mockito.verify(MainWindowView.setRequestBody(''));
			done();
		});
	});
	describe('#historyUp', () => {
		it('should show previous request from the history', done => {
			global.RequestDao = mockito.replace("../main/js/com/github/pigovsky/rest_client_jsonpath_jq/daos/RequestDao.js").RequestDao;
			mockito.when(RequestDao.getRequest(1)).thenCallback(null, 1);
			MainWindowPresenter.currentHistoricalRequest=0;
			MainWindowPresenter.historyUp();
			mockito.verify(RequestDao.getRequest(1, mockito.matchers.anything()));
			done();
		});
	});
	describe('#historyDown', () => {
		it('should show next request in the history', done => {
			global.RequestDao = mockito.replace("../main/js/com/github/pigovsky/rest_client_jsonpath_jq/daos/RequestDao.js").RequestDao;
			mockito.when(RequestDao.getRequest(-1)).thenCallback(null, 0);
			MainWindowPresenter.currentHistoricalRequest=0;
			MainWindowPresenter.historyDown();
			mockito.verify(RequestDao.getRequest(-1, mockito.matchers.anything()));
			done();
		});
	});

	describe('#saveAsMock', () => {
		it('should save mock json file under client', done => {
      global.MainWindowView = mockito.replace(
	"../main/js/com/github/pigovsky/rest_client_jsonpath_jq/views/MainWindowView.js"
).MainWindowView;
      mockito.when(MainWindowView.getRequestMethodAndUrl()).thenReturn("get http://hej.sw:5432/api/something");
			global.FileUtils = mockito.replace("../main/js/com/github/pigovsky/rest_client_jsonpath_jq/utils/FileUtils.js").FileUtils;
      mockito.when(MainWindowView.getResponseBody()).thenReturn('{"a": "b"}');
     MainWindowPresenter.saveAsMock(); 
     mockito.verify(FileUtils.saveFileToClient("get http://hej.sw:5432/api/something", {
     "context": "URI Regexp Matching",
		 "data": {
       "method": "GET",
       "uri-regexp": "/api/something",
       "response": {
         "status": 200,
         "body": {
           "a": "b"
				 }
			 }
		 }
    }));
    done();
		});
		it('should save mock json file screening regexp url', done => {
      global.MainWindowView = mockito.replace(
	"../main/js/com/github/pigovsky/rest_client_jsonpath_jq/views/MainWindowView.js"
).MainWindowView;
      mockito.when(MainWindowView.getRequestMethodAndUrl()).thenReturn("put http://dag.sw:7654/api/something?submit=true");
			global.FileUtils = mockito.replace("../main/js/com/github/pigovsky/rest_client_jsonpath_jq/utils/FileUtils.js").FileUtils;
      mockito.when(MainWindowView.getResponseBody()).thenReturn('{"b": "c"}');
     MainWindowPresenter.saveAsMock(); 
     mockito.verify(FileUtils.saveFileToClient("put http://dag.sw:7654/api/something?submit=true", {
     "context": "URI Regexp Matching",
		 "data": {
       "method": "PUT",
       "uri-regexp": "/api/something\\?submit=true",
       "response": {
         "status": 200,
         "body": {
           "b": "c"
				 }
			 }
		 }
    }));
    done();
		});
  });
})

