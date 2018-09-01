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
			requestHistory: [],
			version: "0.1.0"
		}
	},
	init: function() {
		try {
			this.read(data => {
				console.log("Found config of version " + data.global.version);
				if (VersionUtils.areMajorCompatible(data.global.version, this.initialConfig.global.version)) {
					console.log("Current config v" + data.global.version + " is compatible with v" + this.initialConfig.global.version);
				} else {
					console.log("Save config v" + this.initialConfig.global.version + " anew");
					this.save(this.initialConfig);
				}
			});
		} catch (err) {
			console.log("Cannot read old config " + err + ". Saving new one");
			this.save(this.initialConfig);
		}
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

