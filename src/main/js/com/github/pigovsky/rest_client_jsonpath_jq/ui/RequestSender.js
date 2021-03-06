let RequestSender = {
	send: () => {
		MainWindowState.saveRequest();
		let methodAndUrl = document.getElementById("requestMethodAndUrl").value.split(/\s+/);
		let method = methodAndUrl[0];
		let url = methodAndUrl[1];

		HeaderFetcher.headers(url, (headers) => {
			let requestBody = document.getElementById("requestBody").value;
			let responseBody = document.getElementById("responseBody");
			new HttpRequester().sendRequest(method, url, headers, requestBody, (responseText) => {
				responseBody.value = responseText;
				MainWindowState.responseJsonEditor.set(JSON.parse(responseText));
			});
		});
	}
};

