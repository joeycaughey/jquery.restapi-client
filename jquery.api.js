var API = {
    live: false,
    disable_loader: false,
    data: false,
    calls: [],
    api_key: "21232f297a57a5a743894a0e4a801fc3",
    get_host: false,
    headers: {},
    get_uploads_dir: function() {
        return this.get_host().replace("/v1/", "/files/");
    },
    get: function(endpoint, data, callback) {
        var self = this;
        self.request("GET", endpoint, data, callback);
    },
    insert: function(endpoint, data, callback) {
        var self = this;
        self.request("POST", endpoint, data, callback);
    },
    post: function(endpoint, data, callback) {
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
    upload: function(endpoint, data, callback) {
        var self = this;
        self.request("POST", endpoint, data, callback);
    },
    request: function(method, endpoint, data, callback, headers) {
        var self = this;

        var object = method + "," + endpoint;

        if (!API.live) console.log(object);

        if (self.calls.indexOf(object) > 0) {
            return false;
        }

        Auth.user = (Auth.user) ? Auth.user : false;

        headers = $.extend(headers, self.headers);


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

            headers: headers,
            // Set any custom headers here.
            // If you set any non-simple headers, your server must include these
            // headers in the 'Access-Control-Allow-Headers' response header.


            success: function(data, textStatus, jqXHR) {
                var object = method + "," + endpoint;

                if (callback) {
                    //self.data = data;
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
            },
            beforeSend: function() {
                var object = method + "," + endpoint;
                if (!self.calls.indexOf(object) > 0) {
                    self.calls.push(object);
                }

                if (!self.disable_loader && typeof Loading === "function")
                    Loading.show();
            },
            complete: function() {
                var object = method + "," + endpoint;
                var index = self.calls.indexOf(object);
                //delete self.calls[index];  
                self.calls.splice(index, 1);
                if (self.calls.length === 0 && typeof Loading === "function") {
                    Loading.hide();
                }
            }
        });
    }
}