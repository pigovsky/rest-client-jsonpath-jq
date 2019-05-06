const MainWindowPresenter = {
	currentHistoricalRequest: 0,
  getRequestMethodAndUrl: function() {
		let methodAndUrl = MainWindowView.getRequestMethodAndUrl().split(/\s+/);
		return {
      method: methodAndUrl[0],
		  url: methodAndUrl[1]
    };
  },
	sendRequest: function() {
		MainWindowView.saveRequest();
		let methodAndUrl = this.getRequestMethodAndUrl();
		let method = methodAndUrl.method;
		let url = methodAndUrl.url;

		HeaderFetcher.headers(url, (headers) => {
			MainWindowView.showProgress();
			let requestBody = MainWindowView.getRequestBody();
			new HttpRequester().sendRequest(method, url, headers, requestBody, (responseText) => {
				MainWindowView.setResponseBody(responseText);
				MainWindowView.responseJsonEditor.set(JSON.parse(responseText));
				MainWindowView.hideProgress();
			});
		});
	},
	showHistoricalRequest: function()  {
		RequestDao.getRequest(this.currentHistoricalRequest, (request, newIndex) => {
			this.currentHistoricalRequest = newIndex;
			if (request != null) {
				MainWindowView.setRequestMethodAndUrl(request.methodAndUrl);
				MainWindowView.setRequestHeaders(request.headers);
				MainWindowView.setRequestBody(request.body);
			}
		});
	},
	historyUp: function() {
		this.currentHistoricalRequest++;
		this.showHistoricalRequest();
	},
	historyDown: function() {
		this.currentHistoricalRequest--;
		this.showHistoricalRequest();
	},
  saveAsMock: function() {
    const responseJson = JSON.parse(MainWindowView.getResponseBody());
		let methodAndUrl = this.getRequestMethodAndUrl();
    FileUtils.saveFileToClient(MainWindowView.getRequestMethodAndUrl(), 
    {	
     "context": "URI Regexp Matching",
		 "data": {
       "method": methodAndUrl.method.toUpperCase(),
       "uri-regexp": methodAndUrl.url.replace("?","\\?"),
       "response": {
         "status": 200,
         "body": responseJson
			 }
		 }
		});
	}
};

module.exports = {
	MainWindowPresenter
};

