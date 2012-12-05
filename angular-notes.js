/*
* resolveService example
*/

.factory('resolveService-', ['$rootScope','$q', function($rootScope, $q) {

    var resolveType = function(_type, _value) {
        var _result = '';
        switch (_type) {
            case 'list':
                _result = _value.join(',');
                break;
            case 'datetime':
                _result = '<time>' + new Date(_value).toLocaleString() + '</time>';
                break;
            case '*reference*':
                _result = '<strong ng-click="loadReference(' + _value + ')">reference</strong>';
                break;
            case 'text':
            default:
                _result = _value;
        }
        return _result;
    }

    var resolveObject = function(_targetObj, _schema, _resolveID) {
        var _resolvedObj = {};

        _schema.members.map(function(_member){
            var _type = _member.type;
            var _value = _targetObj[_member.key];
            var _resolvedValue = resolveType(_type, _value);
            _resolvedObj[_member.key] = _resolvedValue;
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

/*
* DetailsCtrl
*/

.controller('DetailsCtrl---', ['$rootScope', '$scope', '$q', 'resolveService', '$compile', function($rootScope, $scope, $q, resolveService, $compile) {

    $scope.atoms = [];

    
    var tmpAtom = {
        "coefs": [1, 2],
        "seen": "2012-11-28T16:07:44.000Z",
        "ip": "127.0.0.1"
    }
    
    var tmpSchema = {
        "type": "object",
        "members": [{
            "type": "list",
            "value": {
                "type": "integer"
            },
            "key": "coefs"
        }, {
            "type": "datetime",
            "key": "seen"
        }, {
            "type": "text",
            "key": "ip"
        }],
        "keyStrategy": "uuid",
        "name": "com.isightpartners.object.ipoccurrence"
    }

    var onAtom = function(event, _data) {

        for(var item in _data) {
            if (!_data.hasOwnProperty(item)) continue;
            console.log(item, _data[item])
        }

    }
    resolveService.onResolve(onAtom);
    resolveService.resolve(tmpAtom, tmpSchema);
}])