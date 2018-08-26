function HttpRequester() {
	this.xhr = new XMLHttpRequest();
}

HttpRequester.prototype.sendRequest = function(method, url, headers, body, onDone) {
	this.xhr.open(method, url, true);
	Object.keys(headers).forEach((key) => {
		this.xhr.setRequestHeader(key, headers[key]);
	});
	this.xhr.onreadystatechange = () => {
		if (this.xhr.readyState == 4) {
			onDone(this.xhr.responseText);
		}
	};
	this.xhr.send(body);
};

