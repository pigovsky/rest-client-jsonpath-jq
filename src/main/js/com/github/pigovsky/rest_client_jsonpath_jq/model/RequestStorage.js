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
			if (data.global.requestHistory.length == 0) {
				onData(null, 0);
			} else {
				let newIndex = index < 0 ? data.global.requestHistory.length-1 :
					index >= data.global.requestHistory.length ? 0 : index;
				onData(data.global.requestHistory[newIndex], newIndex);
			}
		});
	}
};

