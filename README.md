jquery.restapi-client (CRUD)
=====================

A jQuery client to connect to Restful API data sources.  

----------------------------------------------------
USAGE AND INITIALIZATION
----------------------------------------------------
Loading the API Class & API configuration.   


```javascript
$.getScript('/_assets/jquery.api/jquery.api.js', function() {

    // Configure your API hosts
    API.get_host = function() {
        switch (location.host) {
            case "www.website.com":
                API.live = true;
                return window.location.protocol+"//api.website.com/v1/";
            case "dev.website.com":
                return window.location.protocol+"//dev-api.website.ccom/v1/";
        }
    }
    
});
```

----------------------------------------------------
API HEADERS (Optional)
----------------------------------------------------
Optionally you can set API headers such as authentication tokens and headers with your REST requeest.

```javascript
API.headers() {
    return {
        "token": "oauthtokens"
    }
}
```


----------------------------------------------------
Getting information from the API:
----------------------------------------------------
RESTful Calls (GET, INSERT, UPDATE, DELETE)

All API calls return a function variable to do with as you wish.  The API return request structure is flexible to whatever the backend API response will return.

Getting information from an API is as simple as defining the api endpoing and or passing an id parameter to the end poin for a single call:
```javascript
API.get('ModuleEventsModel/', parameters, function(request) { });
API.get('ModuleEventsModel/1/', parameters, function(request) { });
```

Inserting and updating information from the API. ON an update the id can be passed in the endpoint or with the parameters variables:
```javascript
API.insert('ModuleEventsModel/', values, function(request) { });
API.update('ModuleEventsModel/1/', parameters, function(request) { });
```


Deleting information from the API:
```javascript
API.delete('ModuleEventsModel/1/', false, function(request) { });
```
