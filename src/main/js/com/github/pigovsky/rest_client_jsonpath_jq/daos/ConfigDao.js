let ConfigDao = {
	initialConfig: {
		global: {
			headers: {
				unconditional: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				conditional: [
					{
						condition: "host: 1.2.3.4",
						header: {"Authorization": "Bearer 123"}
					}
				]
			},
			requestHistory: []
		}
	},
	init: function() {
		this.save(this.initialConfig);
	},
	save: function(data) {
		chrome.storage.local.set(data, () => {
			console.log("config " + JSON.stringify(data) + " was saved");
		});
	},
	read: function(onData) {
		chrome.storage.local.get("global", onData);
	},
	update: function(updater) {
		this.read((data) => {
			var updatedData = updater(data);
			this.save(updatedData);
		});
	}
};

