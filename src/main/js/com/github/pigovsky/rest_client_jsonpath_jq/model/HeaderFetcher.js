let HeaderFetcher = {
	headers: function(url, onData) {
		chrome.storage.sync.get("global", (data) => {
			console.log("headers from config: " + JSON.stringify(data));
			var jointHeaders = data.global.headers.unconditional;
			var customHeaders = JSON.parse(document.getElementById("requestHeaders").value);
			Object.keys(customHeaders).forEach( (key) => {
				jointHeaders[key]=customHeaders[key];
			});
			onData(jointHeaders);
		});
	}
};

