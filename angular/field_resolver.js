// 0

.factory('resolveService', ['$rootScope','$q', function($rootScope, $q) {

    var resolveObject = function(_targetObj, _schema, _resolveID) {
        var _resolvedObj = {};

        _schema.members.map(function(_member){
            var _type = _member.type;
            var _value = _targetObj[_member.key];
            _resolvedObj[_member.key] = {value: _value, type: _type};
        });
        $rootScope.$broadcast('resolver.success', _resolvedObj, _resolveID);
    };
    var onResolve = function(callback) {
        $rootScope.$on('resolver.success', callback);
    };
    return {
        resolve: resolveObject,
        onResolve: onResolve
    };
}])

// 1

.factory('resolveService', ['$rootScope','$q', function($rootScope, $q) {

    var resolveObject = function(_targetObj, _schema, _resolveID) {
        var _resolvedObj = {};
        if (_schema.type == 'object') {
            _schema.members.map(function(_member){
                var _type = _member.type;
                var _value = _targetObj[_member.key];

                if (_type == 'object' || _type == 'list' || _type == 'map') {
                    _value = resolveObject(_value, _member);
                }

                _resolvedObj[_member.key] = {value: _value, type: _type};
            });
        } else if (_schema.type == 'list') {
            for (var i = 0; i < _targetObj.length; i++) {
                var _type = _schema.value.type;
                var _value = _targetObj[i];
                _resolvedObj[i] = {value: _value, type: _type};
            }
        }
        return _resolvedObj;
    };
    var onResolve = function(callback) {
        $rootScope.$on('resolver.success', callback);
    };
    return {
        resolve: function(_targetObj, _schema, _resolveID){
            var _result = resolveObject(_targetObj, _schema);
            $rootScope.$broadcast('resolver.success', _result, _resolveID);
        },
        onResolve: onResolve
    };
}])

// 2

.factory('resolveService', ['$rootScope', function($rootScope) {

    var worker = new Worker("/scripts/resolver.worker.js");

    worker.addEventListener("message", function(event) {
        $rootScope.$apply(function() {
            var _resObj = event.data.resolvedObj;
            var _id = event.data.id;
            $rootScope.$broadcast('resolver.success', _resObj, _id);
        });
    }, false);

    var onResolve = function(callback) {
        $rootScope.$on('resolver.success', callback);
    };

    return {
        resolve: function(targetObj, schema, id) {
            var _data = {
                targetObj: targetObj,
                schema: schema,
                id: id
            };
            worker.postMessage(_data);
        },
        onResolve: onResolve
    };
}])