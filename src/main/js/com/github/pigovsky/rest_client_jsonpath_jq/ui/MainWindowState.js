
let MainWindowState = {
	currentHistoricalRequest: 0,
	showHistoricalRequest: function() {
		RequestDao.getRequest(this.currentHistoricalRequest, (request, newIndex) => {
			this.currentHistoricalRequest = newIndex;
			if (request != null) {
				let keyValues={                 
					"requestMethodAndUrl": request.methodAndUrl,
					"requestHeaders": request.headers,
					"requestBody": request.body
				};         
				Object.keys(keyValues).forEach( (key) => {                 
					document.getElementById(key).value = keyValues[key];         
				});  
			}
		});
	},
	getUiField: function(id) {
		return document.getElementById(id).value;
	},
	setUiField: function(id, value) {
		document.getElementById(id).value = value;
	},
	saveRequest: function() {
		RequestDao.saveRequest({
			methodAndUrl: this.getUiField("requestMethodAndUrl"),
			headers: this.getUiField("requestHeaders"),
			body: this.getUiField("requestBody")
		});
	},
	historyUp: function() {
		this.currentHistoricalRequest++;
		this.showHistoricalRequest();
	},
	historyDown: function() {
		this.currentHistoricalRequest--;
		this.showHistoricalRequest();
	},
	handleJsonPathQuery: function() {
		let query = this.getUiField("jsonPathQuery");
		let body = JSON.parse(this.getUiField("responseBody"));
		let result = jsonpath.query(body, query);
		let textResult = JSON.stringify(result, null, 2);
		this.setUiField("jsonPathResult", textResult);
	}
};

