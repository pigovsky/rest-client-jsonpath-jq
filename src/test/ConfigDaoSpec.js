var assert = require("assert") 

let ConfigDao = require("../main/js/com/github/pigovsky/rest_client_jsonpath_jq/daos/ConfigDao.js").ConfigDao;
ConfigDao.save = data => {};

describe('ConfigDao', function(){   
	describe('#init', function(){     
		it('should not crash when no config found', function(done) {
			ConfigDao.read = function(onDone) {
				setTimeout(() => {
					onDone(undefined);
					done();
				}, 1);
			};
			ConfigDao.init();
		})   
	}) 
})

