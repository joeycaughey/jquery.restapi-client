var Auth = {
    user: false,
    restrict: function(groups, callback) {
        var self = this
        var disable = true;

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

        setTimeout(function() {
            callback();
        }, 500)

        return true;
    },
    if: function(groups, callback) {
        var self = this
        var disable = true;

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
            return false;
        }

        setTimeout(function() {
            callback();
        }, 500)

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
            var object = "GET,ModuleAPITokensModel";

            if (API.calls.indexOf(object) === -1) {
                API.get('ModuleAPITokensModel/check/', {}, function(request) {
                    if (request.response) {
                        if ((request.success && request.response.logout)) {
                            self.logout();
                            console.log("LOGGED OUT API!!!!!!!", request.response);
                        }
                    } else {
                        self.logout();
                        console.log("LOGGED OUT!!!!!!!", request.response);
                    }
                });
            }
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

        self.user = false;
        localStorage.removeItem("user");

        API.post('ModuleAPITokensModel/login/', {
            email: email,
            password: password,
            options: options
        }, function(request) {
            if (request.success) {
                self.user = request.response;
                localStorage.setItem("user", JSON.stringify(self.user));
                console.log("REDIRECT", self.user, options.redirect_uri, "/");

                if (typeof options.redirect_uri === 'undefined') {
                    if (options.redirect_uri && options.redirect_uri !== "" && options.redirect_uri !== "#!/user/register/") {
                        document.location = options.redirect_uri;
                        Auth.check();
                    } else {
                        document.location = request.response.login_url;
                    }
                } else {
                    document.location = request.response.login_url;
                }

                Popup.close();
            } else {
                $("#login-form").find("div.errors").html(request.response).show();
            }
        });
    },
    logout: function() {
        self.user = false;
        localStorage.removeItem("user");
        document.location = '/';
    },
    save: function() {
        API.disable_loader = true;
        API.update('UsersModel/', self.user, function(request) {
            if (request.success) {
                localStorage.setItem("user", JSON.stringify(self.user));
                console.log("UPDATE PROFILE", self.user)
            }
        });
        API.disable_loader = false;
    }
}

if (typeof Auth.check == 'function') {
    $(window).bind('hashchange', function() {
        Auth.check();
    }).on("load", function() {
        Auth.check();
    });
}

console.log("Loaded API Authentication.");
