jquery.restapi-client (CRUD)
=====================

A jQuery client to connect to Restful API data sources

----------------------------------------------------
USAGE AND INITIALIZATION
----------------------------------------------------

```
Getting information from the API:

API.get('ModuleEventsModel/', parameters, function(request) { });
API.get('ModuleEventsModel/1/', parameters, function(request) { });


Inserting and updating information from the API:

API.insert('ModuleEventsModel/', values, function(request) { });
API.update('ModuleEventsModel/1/', parameters, function(request) { });


Deleting information from the API:

API.delete('ModuleEventsModel/1/', false, function(request) { });

