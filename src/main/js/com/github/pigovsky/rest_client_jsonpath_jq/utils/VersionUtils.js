let VersionUtils = {
	versionSegments: function(version) {
		var versionStr = typeof version === "string" ? version : "";
		var segments = versionStr.trim().split(".", 3);
		return {
			major: segments.length >= 1 ? segments[0] : undefined,
			minor: segments.length >= 2 ? segments[1] : undefined,
			patch: segments.length >= 3 ? segments[2] : undefined
		};
	},
	areMajorCompatible: function(version1, version2) {
		return this.versionSegments(version1).major == this.versionSegments(version2).major;
	}
};

