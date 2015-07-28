var Auth = {
    user: false,
    restrict: function(groups, callback) {
        var self = this
        var disable = true;

        Auth.check();

        if (typeof(Storage) !== "undefined") {
            if (localStorage.getItem("user") !== "undefined") {
                // Code for localStorage/sessionStorage.
                user = JSON.parse(localStorage.getItem("user"));
            } else {
                user = false;
            }
            self.user = user;
        } else {
            // Sorry! No Web Storage support..
            alert("No local storage");
        }

        if (user && (typeof user.groups === 'object')) {
            $.each(groups, function(i, group) {
                if (user.groups.indexOf(group) >= 0) {
                    disable = false;
                }
            });
        }

        if (disable) {
            self.logout();
        }
       
        setTimeout(function(){  callback(); }, 500)

        return true;
    },
    check: function() {
        var self = this;

        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.

            if (localStorage.getItem("user") !== "undefined") {
                // Code for localStorage/sessionStorage.
                user = JSON.parse(localStorage.getItem("user"));
            } else {
                user = false;
            }
            self.user = user;
        } else {
            // Sorry! No Web Storage support..
            alert("No local storage");
        }

        if (user && user != "false") {
            API.disable_loader = true;
            API.get('ModuleAPITokensModel/check/', {}, function(request) {
                if ( (request.success && !request.response)) { // !request.success || 
                    self.logout();   
                }
            });
            API.disable_loader = false;

            $("[data-authenticate-group]").each(function() {
                var groups = $(this).data("authenticate-group").split(",");
                var disable = true;

                if (user && (typeof user.groups === 'object')) {
                    $.each(groups, function(i, group) {
                        if (user.groups.indexOf(group) !== -1) {
                            disable = false;
                        }
                    })
                }

                if (disable) $(this).remove();
            });
            $("[data-authenticated]").show().css("visibility", "visible");
            $("[data-authenticated-hide]").hide().css("display", "none");
        }
        $("[data-show-loged-in]").each(function() {
            var value = $(this).data("authenticate-logedin");
            if (user) {
                if (value == "hide") {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            }
        });

        //console.log("Checking Authentication...");
    },
    login: function(email, password, options) {
        var self = this;
        
        localStorage.removeItem("user");

        API.get('ModuleAPITokensModel/login/', {
            email: email,
            password: password,
            options: options
        }, function(request) {
            if (request.success) {
                self.user = request.response;
                localStorage.setItem("user", JSON.stringify(self.user));
                document.location = request.response.login_url;
                Popup.close();
                self.check();
            } else {
                $("#login-form").find("div.errors").html(request.response).show();
            }
        });
    },
    logout: function() {
        localStorage.removeItem("user");
        document.location = '/';
    }
}
console.log("Loaded API Authentication.");
