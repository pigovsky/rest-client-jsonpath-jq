const mockito = require("testdouble");

global.MainWindowView = mockito.replace(
	"../main/js/com/github/pigovsky/rest_client_jsonpath_jq/views/MainWindowView.js"
).MainWindowView;
mockito.when(MainWindowView.getRequestMethodAndUrl()).thenReturn("get /api/something");
MainWindowView.responseJsonEditor = mockito.object({set: () => {}});
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
				"methodAndUrl": "get /api/old-request",
				"headers": '{"a": "b"}',
				"body": ""
			}, 0);
			MainWindowPresenter.showHistoricalRequest();
			mockito.verify(MainWindowView.setRequestMethodAndUrl("get /api/old-request"));
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
})

