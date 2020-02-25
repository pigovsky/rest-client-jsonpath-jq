let eventHandlers = {
	"sendRequest": () => {
		console.log("sending request");                         
		MainWindowPresenter.sendRequest();  
	},
  "saveAsMock": () => { MainWindowPresenter.saveAsMock() },
	"historyUp": () => { MainWindowPresenter.historyUp() },
	"historyDown": () => { MainWindowPresenter.historyDown() },
	"updateJsonEditor": () => { MainWindowView.updateJsonEditor(); },
	"updateJsonPath": () => { MainWindowView.handleJsonPathQuery(); }
};

Object.keys(eventHandlers).forEach( (id) => {
	let handler = eventHandlers[id];
	document.getElementById(id).onclick = (element) => {                         
		handler();
	};
});

MainWindowView.init();
MainWindowPresenter.showHistoricalRequest();

