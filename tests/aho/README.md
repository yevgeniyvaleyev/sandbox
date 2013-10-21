
# Functionality
---------------

1. Service, controller, directives, filters, unit tests, code style checking were created.
2. Gallery service has methods for retrieving product list with a filter, retrieving product details.
3. Gallery controller is mediator for retrieved data and directives. It provides a data to directives, listening
    for specific events and requests data from the gallery service.
4. List directive gets product list and filter data from the controller, sets filter, displays a product list. It refreshes
    product list by changing the filter.
    It has also functionality for keyboard selecting, it animates selecting and adds additional behavior.
    It requests details of selected product with a click or keyboard select.
5. Details directive displays product details being synchronized with controller. When it does not have any product
    selected it displays a notification.
6. Splitter directive adds a functionality to change positions of 'list' and 'details' view ports.
    By moving a splitter bar it changes a visual representation of assigned view ports.
7. Money filter creates formatted string for money representation.
8. Rating filter creates a value which is used for css classes which are used for representation of ratings.
9. Config constant has a value of an endpoint.
10. Application module initializes th application and registers Angular sources, such as ngResource and ngSanitize.
11. Directives has views which are in views folder.
12. CSS styles includes for view ports, splitter, filter, ratings and basic styles like 100% height layout
13. Unit tests were created. Added a provider redeclaration for mocking services. Jasmine and Karma were used.
14. Automatic code style checking is implemented with jsHint. To run code checking and unit tests you should use ```4```
    of the installation guide.
15. Automatic initialization of the project was built with Grunt. Grunt regarde, connect, live reload are implemented.
16. Node package manager was use to load all sources, such as Grunt, Bower, Karma using package config.
17. Bower loads all sources for client side and created ```components``` folder in ```app``` folder.

# Installation guide
--------------------

1. Install Node.js (>= v0.10.15) and npm (>= v1.3.5)
2. In the root of the project execute ```npm install```, it will install all packages listed in ```package.json```.
   Then after installation ```bower``` it will install its packages (also listed in ```package.json```)
3. Execute ```npm start``` to start a server, it will be started on ```localhost:3501```
4. Execute ```nmp test``` to start ```jsHint``` style checking and ```unit``` tests.
5. With current back end API you have to use ```'--disable-web-security``` for Chrome due to a bug of the current backend API.




