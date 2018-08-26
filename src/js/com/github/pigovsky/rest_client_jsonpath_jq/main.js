let config = {
	someValue: 100
};

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set(config, () => {
		console.log("Config was saved");
	});
});

chrome.browserAction.onClicked.addListener((tab) => {
	chrome.tabs.create({
		url: chrome.runtime.getURL("src/resources/ui/main.html")
	}, () => {
		console.log("main page is shown");
	});
});

