var Auth = {
    user: false,
    restrict: function(group) {
        var self = this
        var groups = group.split(",");
        var disable = true;

        user = $.jStorage.get('user');
        user = (user) ? user : false;

        if (user && (typeof user.groups === 'object')) {
            $.each(groups, function(i, group) {
                if (user.groups.contains(group)) {
                    disable = false;
                }
            });
        }
       
        if (disable) {
            self.logout();
        }
        
        return true;
    },
    check: function() {
        var self = this;
      
        user = $.jStorage.get('user');
        user = (user) ? user : false;

        if (user) {
            $("[data-authenticate-group]").each(function() {
                var groups = $(this).data("authenticate-group").split(",");
                var disable = true;
            
                if (user && (typeof user.groups === 'object')) {
                    $.each(groups, function(i, group) {
                        if (user.groups.contains(group)) {
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

        console.log("Checking Authentication...");
    },
    login: function(email, password, facebook_user_id) {
        API.get('ModuleAPITokensModel/login/', {
            email: email,
            password: password,
            facebook_user_id: facebook_user_id
        }, function(request) {
            if (request.success) {
                $.jStorage.deleteKey("user");
                $.jStorage.set("user", request.response);
                document.location = request.response.login_url;
                location.reload();
            } else {
                $("#errors").text(request.response);
            }
        });
    },
    logout: function() {
        $.jStorage.deleteKey("user");
        document.location = '/';
    }
}
console.log("Loaded API Authentication.");
