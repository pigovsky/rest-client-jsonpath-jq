let HeaderFetcher = {
	headers: function(url, onData) {
		chrome.storage.sync.get("global", (data) => {
			console.log("headers from config: " + JSON.stringify(data));
			onData(data.global.headers.unconditional);
		});
	}
};

