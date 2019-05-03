const MainWindowPresenter = {
	currentHistoricalRequest: 0,
	sendRequest: () => {
		MainWindowView.saveRequest();
		let methodAndUrl = MainWindowView.getRequestMethodAndUrl().split(/\s+/);
		let method = methodAndUrl[0];
		let url = methodAndUrl[1];

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
	}
};

module.exports = {
	MainWindowPresenter
};

