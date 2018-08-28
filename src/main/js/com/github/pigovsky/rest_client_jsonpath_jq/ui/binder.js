let eventHandlers = {
	"sendRequest": () => {
		console.log("sending request");                         
		RequestSender.send();  
	},
	"historyUp": () => { MainWindowState.historyUp() },
	"historyDown": () => { MainWindowState.historyDown() }
};

Object.keys(eventHandlers).forEach( (id) => {
	let handler = eventHandlers[id];
	document.getElementById(id).onclick = (element) => {                         
		handler();
	};
});

document.getElementById("jsonPathQuery").onchange = (element) => {
	MainWindowState.handleJsonPathQuery();
};

MainWindowState.showHistoricalRequest();

