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