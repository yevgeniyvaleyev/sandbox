Ext.define('PT.controller.Login', {
    extend: 'Ext.app.Controller',
    views: ['Login'],
    /**
     * Fires when the controller initiates
     * @access public
     * @return null
     */
    init: function() {
        this.control({
            'login button[action=login]': {
                click: this.login
            },
            'login [xtype=textfield]' : {
                specialkey: function (field, event) {
                    if (event.getKey() == event.ENTER) {
                        this.login();
                    }
                }
            }
        });
        this.application.on({
            unauthorized: this.onUnauthorized,
            scope: this
        });        
    },
    /**
     * Fires when 'unauthorized' event appears
     * @access public
     * @return null
     */
    onUnauthorized: function() {        
        this.view = Ext.widget('login');        
    },
    /**
     * Login functionality.
     * Fires when login button clicked
     * @access public
     * @return null
     */
    login: function() {
        var self = this;
        var form = self.view.down('form').getForm();
        var values = form.getValues();
        var app = self.application;
        
        if (!form.isValid()) {
            return;
        }
       
        Ext.Ajax.request({
            url: 'api.php',
            params: values,
            success: function(response, opts) {
                try {
                    var parsedResponse = Ext.decode(response.responseText);
                    if (parsedResponse.success) {
                        self.view.close();
                        app.fireEvent('logined');
                    } else {
                        Ext.Msg.alert('Login', parsedResponse.message.text);
                    }
                } catch (e) {
                    console.log('Login error', e);
                    Ext.Msg.alert('Info', 'Some problems occurred, please try again later.');
                }                
            },
            failure: function(response, opts) {
                console.log('Login failure, status: ' + response.status);
            }
        });
    }
});