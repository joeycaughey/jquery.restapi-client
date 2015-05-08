var Auth = {
	user: false,
	init: function() {
		var self = this;
		self.user = (jQuery.jStorage.get('user')) ? 
			jQuery.jStorage.get('user') : false;

		self.check();

		console.log("Initalizing Authentication...");
	},
	restrict: function(group) {
		var self = this
		if (!self.user || !self.user.groups.contains(group)) {
			self.logout();
		} 
		return true;
	},
	check: function() {
		var self = this;
		self.user = (jQuery.jStorage.get('user')) ? 
			jQuery.jStorage.get('user') : false;


		$("[data-authenticate-group]").each(function(){
			var groups = $(this).data("authenticate-group").split(",");
			var disable = false;

			if (self.user) {
				$.each(groups, function(i, group){
					if (!self.user.groups.contains(group)) {
						disable = true;
					}
				});
			} else {
				if ($(this).data("authenticate-group")=="logout") {
					disable = false;
				} else {
					disable = true;
				}
			}

			if (disable) $(this).remove();

			//console.log("GROUPS", self.user.groups, groups, disable);

		});

		$("[data-is-loged-in]").each(function(){
			var value = $(this).data("authenticate-logedin");

			if (self.user) {
				if (value=="hide") {
					$(this).hide();
				} else {
					$(this).show();
				}
			}
		});

		console.log("Checking Authentication...");
	},
	login: function(email, password, facebook_user_id) {
		Loading.show();
	
		API.get('ModuleAPITokensModel/login/', {
	            email: email,
	            password: password,
	            facebook_user_id: facebook_user_id
	         }, function(request){
	            if (request.success) {
	                jQuery.jStorage.deleteKey("user");                  
	                jQuery.jStorage.set("user", request.response);
	
	            	document.location = request.response.login_url;
	            	location.reload(true);
	            } else {
	               $("#errors").text(request.response);
	            }
	            Loading.hide();
	        });
	},
	logout: function() {
		jQuery.jStorage.deleteKey("user");   
        	document.location = '/';
	}
}
console.log("Loaded API Authentication.");

