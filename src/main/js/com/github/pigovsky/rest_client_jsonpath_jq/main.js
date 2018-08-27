let config = {
	global: {
		headers: {
			unconditional: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			conditional: [
				{
					condition: "host: 1.2.3.4",
					header: {"Authorization": "Bearer 123"}
				}
			]
		},
		requestHistory: []
	}
};

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set(config, () => {
		console.log("Config was saved " + JSON.stringify(config));
	});
});

chrome.browserAction.onClicked.addListener((tab) => {
	chrome.tabs.create({
		url: chrome.runtime.getURL("src/main/resources/ui/main.html")
	}, () => {
		console.log("main page is shown");
	});
});

