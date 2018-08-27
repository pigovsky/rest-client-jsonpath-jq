let MainWindowState = {
	currentHistoricalRequest: 0,
	showHistoricalRequest: function() {
		RequestStorage.getRequest(this.currentHistoricalRequest, (request) => {
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
	saveRequest: function() {
		RequestStorage.saveRequest({
			methodAndUrl: this.getUiField("requestMethodAndUrl"),
			headers: this.getUiField("requestHeaders"),
			body: this.getUiField("requestBody")
		});
	}
};

