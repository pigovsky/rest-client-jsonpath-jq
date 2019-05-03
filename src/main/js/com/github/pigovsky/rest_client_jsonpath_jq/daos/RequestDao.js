let RequestDao = {
	saveRequest: function(request) {
		ConfigDao.update(function(data) {
			var updatedData = data;
			var requestHistory = updatedData.global.requestHistory;
			var index = requestHistory.findIndex(r => r.methodAndUrl == request.methodAndUrl);
			if (index >= 0) {
				requestHistory[index]=request;
				console.log("updated " + JSON.stringify(request));
			} else {
				requestHistory.unshift(request);
				requestHistory = requestHistory.slice(0, 1000);
				console.log("added " + JSON.stringify(request));
			}
			updatedData.global.requestHistory = requestHistory;
			return updatedData;
		});
	},
	getRequest: function(index, onData) {
		ConfigDao.read((data) => {
			console.log("geting request from history " + JSON.stringify(data));
			if (data.global.requestHistory.length == 0) {
				onData(null, 0);
			} else {
				let newIndex = index < 0 ? data.global.requestHistory.length-1 :
					index >= data.global.requestHistory.length ? 0 : index;
				onData(data.global.requestHistory[newIndex], newIndex);
			}
		});
	}
};

module.exports = {
	RequestDao
};

