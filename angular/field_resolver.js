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