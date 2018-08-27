let RequestStorage = {
	saveRequest: function(request) {
		chrome.storage.sync.get("global", (data) => {
			console.log("saving request to history " + JSON.stringify(data));
			var requestHistory = data.global.requestHistory.slice(0,1000);
			requestHistory.unshift(request);
			data.global.requestHistory = requestHistory;
			chrome.storage.sync.set(data, () => {
				console.log("request is saved to history");
			});
		});
	},
	getRequest: function(index, onData) {
		chrome.storage.sync.get("global", (data) => {
			console.log("geting request from history " + JSON.stringify(data));
			if (index < 0 || index >= data.global.requestHistory.length) {
				onData(null);
			} else {
				onData(data.global.requestHistory[index]);
			}
		});
	}
};

