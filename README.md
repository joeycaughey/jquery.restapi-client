jquery.restapi-client (CRUD)
=====================

A jQuery client to connect to Restful API data sources

----------------------------------------------------
USAGE AND INITIALIZATION
----------------------------------------------------

```
Loading the API Class
$.getScript('/_assets/jquery.api/jquery.api.js', function() {
    API.get_host = function() {
        switch (location.host) {
            case "www.website.com":
                API.live = true;
                return window.location.protocol+"//api.website.com/v1/";
            case "dev.website.com":
                return window.location.protocol+"//dev-api.website.ccom/v1/";
        }
    }
})


Getting information from the API:

API.get('ModuleEventsModel/', parameters, function(request) { });
API.get('ModuleEventsModel/1/', parameters, function(request) { });


Inserting and updating information from the API:

API.insert('ModuleEventsModel/', values, function(request) { });
API.update('ModuleEventsModel/1/', parameters, function(request) { });


Deleting information from the API:

API.delete('ModuleEventsModel/1/', false, function(request) { });

