document.getElementById("sendRequest").onclick = (element) => {                         
	console.log("sending request");                         
	RequestSender.send();                 
};

MainWindowState.showHistoricalRequest();

