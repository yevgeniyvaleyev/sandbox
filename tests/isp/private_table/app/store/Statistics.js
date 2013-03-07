Ext.define('PT.store.Statistics', {
    extend: 'Ext.data.Store',
    model: 'PT.model.Statistics',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: 'api.php'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        listeners: {
            
           /**
            * Fires when an exception in Proxy rises
            * @access public
            * @return null
            */
            exception: function(proxy, exception, operation) {
                if (exception.status == 200 && exception.responseText) {                    
                    try {
                        var response = Ext.JSON.decode(exception.responseText);
                        if (response.message.code == 401) {
                            this.fireEvent('unauthorized');                        
                        }
                    } catch (e) {
                        console.warn(e);
                        Ext.Msg.alert('Info', 'Some problems occurred, please try again later.');
                    }
                } else {
                    Ext.Msg.alert('Exception', 'Status: ' + exception.status 
                        + ', Status Text: ' + exception.statusText);
                }
            }
        }        
    }
});