angular.module('myApp.services', ['ngResource'])

.factory('worker', ['$q', '$rootScope', function($q, $rootScope) {

    var worker = new Worker("/scripts/resolver.worker.js");

    return {
        resolve: function(_atom) {
            var _defer = $q.defer();
            worker.addEventListener("message", function(event) {
                $rootScope.$apply(function() {
                    console.log(event.data)
                    _defer.resolve(event.data);
                });
            }, false);
            worker.postMessage(_atom);
            return _defer.promise;
        }
    }
}])