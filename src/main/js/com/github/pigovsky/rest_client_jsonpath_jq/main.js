chrome.runtime.onInstalled.addListener(() => {
	ConfigDao.init();
});

chrome.browserAction.onClicked.addListener((tab) => {
	chrome.tabs.create({
		url: chrome.runtime.getURL("src/main/resources/ui/main.html")
	}, () => {
		console.log("main page is shown");
	});
});

