
let MainWindowState = {
	responseJsonEditor: null,
	currentHistoricalRequest: 0,
	init: function() {
		var container = document.getElementById("responseJsonEditor");         
		var options = {};
		this.responseJsonEditor = new JSONEditor(container, options);
	},
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
	showProgress: function() {
		this.setResponseBody("Request in progress...");
	},
	hideProgress: function() {

	},
	getUiField: function(id) {
		return document.getElementById(id).value;
	},
	setUiField: function(id, value) {
		document.getElementById(id).value = value;
	},
	getRequestMethodAndUrl: function() {
		return this.getUiField("requestMethodAndUrl");
	},
	getResponseBody: function() {
		return this.getUiField("responseBody");
	},
	setResponseBody: function(text) {
		const element = document.getElementById("downloadResponse");
		element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
  		element.setAttribute('download', this.getRequestMethodAndUrl());
		return this.setUiField("responseBody", text);
	},
	getRequestBody: function() {
		return this.getUiField("requestBody");
	},
	saveRequest: function() {
		RequestDao.saveRequest({
			methodAndUrl: this.getUiField("requestMethodAndUrl"),
			headers: this.getUiField("requestHeaders"),
			body: this.getRequestBody() 
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
	updateJsonEditor: function() {	
		let body = JSON.parse(this.getResponseBody());
		this.responseJsonEditor.set(body);
	},
	handleJsonPathQuery: function() {
		let query = this.getUiField("jsonPathQuery");
		let body = JSON.parse(this.getResponseBody());
		let result = jsonpath.query(body, query);
		let textResult = JSON.stringify(result, null, 2);
		this.setUiField("jsonPathResult", textResult);
	}
};

module.exports = {
	MainWindowState
};

