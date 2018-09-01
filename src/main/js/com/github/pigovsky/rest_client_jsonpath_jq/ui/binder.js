let eventHandlers = {
	"sendRequest": () => {
		console.log("sending request");                         
		RequestSender.send();  
	},
	"historyUp": () => { MainWindowState.historyUp() },
	"historyDown": () => { MainWindowState.historyDown() },
	"updateJsonEditor": () => { MainWindowState.updateJsonEditor(); },
	"updateJsonPath": () => { MainWindowState.handleJsonPathQuery(); }
};

Object.keys(eventHandlers).forEach( (id) => {
	let handler = eventHandlers[id];
	document.getElementById(id).onclick = (element) => {                         
		handler();
	};
});

MainWindowState.init();
MainWindowState.showHistoricalRequest();

