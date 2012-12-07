/**
* Field resolver (web worker)
* @author: Yevgeniy Valeyev
*/

addEventListener("message", function(event) {

    if (typeof event.data !== 'object') {
        return false; 
    }
    var _targetObj = event.data.targetObj;
    var _schema =  event.data.schema;
    var _id = event.data.id;

      
    var resolveObject = function(_targetObj, _schema, _resolveID) {

        var _resolvedObj = {};        
        
        _schema.members.map(function(_member){
            var _type = _member.type;
            var _value = _targetObj[_member.key];
            _resolvedObj[_member.key] = {
                value: _value, 
                type: _type
            }; 
        });        

        return _resolvedObj;
    };

    var _resolved = resolveObject(_targetObj, _schema, _id);

    postMessage({
        resolvedObj: _resolved,
        id: _id
    })

}, false);