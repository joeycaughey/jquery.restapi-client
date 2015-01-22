var Auth = {
	token: false,
	user: false,
	authenticate: function(groups, redirect){
		var self = this;
		if (!self.user.groups.contains(groups)) {
			document.location = redirect;
		}
	},
	init: function() {
		var self = this;

		self.user = (jQuery.jStorage.get('user')) ? 
			jQuery.jStorage.get('user') : false;

		if (!self.user && document.location.pathname != '/login.html') {
			document.location = '/login.html';
		} 

		console.log("USER: ", self.user);

		if (!self.token) {
			$.getJSON(API.host+"ModuleAPITokensModel/request/", { }, function(request){
				if (request.success) {
					self.token = request.response;
				}
			})
		}

	},
	check: function() {
	
		var self = this;

		if (!self.user && document.location.pathname != '/login.html') {
			document.location = '/login.html';
		} 

		API.get("ModuleAPITokensModel/check/", { requestor: self.user.requestor }, function(request) {
			console.log("Checking Authentication...");
			if (request.success) {
				if (!request.response && document.location.pathname != '/login.html') {
					document.location = '/login.html';
				} 
			}
		});
	},
	login: function() {

	}
}
//Auth.init();

