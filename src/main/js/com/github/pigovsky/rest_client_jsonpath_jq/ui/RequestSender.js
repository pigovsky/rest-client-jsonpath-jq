let RequestSender = {
	send: () => {
		MainWindowState.saveRequest();
		let methodAndUrl = MainWindowState.getRequestMethodAndUrl().split(/\s+/);
		let method = methodAndUrl[0];
		let url = methodAndUrl[1];

		HeaderFetcher.headers(url, (headers) => {
			MainWindowState.showProgress();
			let requestBody = MainWindowState.getRequestBody();
			new HttpRequester().sendRequest(method, url, headers, requestBody, (responseText) => {
				MainWindowState.setResponseBody(responseText);
				MainWindowState.responseJsonEditor.set(JSON.parse(responseText));
				MainWindowState.hideProgress();
			});
		});
	}
};

module.exports = {
	RequestSender
};

