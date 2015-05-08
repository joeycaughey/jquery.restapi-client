var API = {
    calls: [],
    api_key: "Enter API Key",
    get_host: function() {
        switch (location.host) {
            case "www.website.com":
                return "http://api.website.com/v1/";
            case "dev.website.com":
                return "http://dev-api.website.com/v1/";
        }
    },
    get: function(endpoint, data, callback) {
        var self = this;
        self.request("GET", endpoint, data, callback);
    },
    insert: function(endpoint, data, callback) {
        var self = this;
        self.request("POST", endpoint, data, callback);
    },
    update: function(endpoint, data, callback) {
        var self = this;
        self.request("PUT", endpoint, data, callback);
    },
    delete: function(endpoint, data, callback) {
        var self = this;
        self.request("DELETE", endpoint, data, callback);
    },
    request: function(method, endpoint, data, callback) {
        var self = this;

        $.ajax({
            // The 'type' property sets the HTTP method.
            // A value of 'PUT' or 'DELETE' will trigger a preflight request.
            type: method,

            url: self.get_host() + endpoint,
            crossDomain: true,
            async: true,

            data: data, //$.param(data)
            dataType: 'json',

            // The 'contentType' property sets the 'Content-Type' header.
            // The JQuery default for this property is
            // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
            // a preflight. If you set this value to anything other than
            // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
            // you will trigger a preflight request.
            contentType: 'application/json',

            xhrFields: {
                // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
                // This can be used to set the 'withCredentials' property.
                // Set the value to 'true' if you'd like to pass cookies to the server.
                // If this is enabled, your server must respond with the header
                // 'Access-Control-Allow-Credentials: true'.
                // withCredentials: true
            },

            headers: {
                // Set any custom headers here.
                // If you set any non-simple headers, your server must include these
                // headers in the 'Access-Control-Allow-Headers' response header.
                api_key: self.api_key,
               
                user: (jQuery.jStorage.get('user') ? jQuery.jStorage.get('user') : false),
                requestor_token: (jQuery.jStorage.get('user') ? jQuery.jStorage.get('user')["requestor_token"] : false)
            },

            success: function(data, textStatus, jqXHR) {
                if (callback) {
                    if (typeof callback === "object") {
                        callback.success(data);
                    } else {
                        callback(data);
                    }
                }
            },

            error: function(jqXHR, textStatus, errorThrown) {
                // Here's where you handle an error response.
                // Note that if the error was due to a CORS issue,
                // this function will still fire, but there won't be any additional
                // information about the error.

                if (callback) {
                    if (typeof callback === "object") {
                        callback.error(jqXHR, textStatus, errorThrown);
                    } else {
                        callback(jqXHR, textStatus, errorThrown);
                    }
                }
            }
        });
    },
    beforeSend: function() {
        var object = method + "," + endpoint;
        if (!self.calls.contains(object) > 0) {
            self.calls.push(object);
        }
        Loading.show();
    },
    complete: function() {
        var object = method + "," + endpoint;
        var index = self.calls.indexOf(object);
        //delete self.calls[index];  
        self.calls.splice(index, 1);
        if (self.calls.length === 0) {
            Loading.hide();
        }
    }
}
