Ext.define('PT.view.Login', {
    extend: 'Ext.window.Window',
    alias : 'widget.login',
    title : 'Authorize',
    layout: 'fit',
    closable: false,
    modal: true,
    autoShow: true,

    /**
     * Initiates a component
     * @access public
     * @return null
     */
    initComponent: function() {
        this.items = [
        {
            xtype: 'form',
            border: false,
            padding: 10,
            bodyStyle: 'background: none;',
            items: [
            {
                xtype: 'textfield',
                name : 'user',
                allowBlank: false,
                fieldLabel: 'Username',
                listeners: {
                    afterrender: function(element) {
                        element.focus(false, 100);  
                    }
                }
            },
            {
                xtype: 'textfield',
                name : 'password',
                fieldLabel: 'Password',
                allowBlank: false,
                inputType: 'password'
            }
            ]
        }
        ];
        this.buttons = [
        {
            text: 'Login',
            action: 'login'
        }
        ];
        this.callParent(arguments);
    }
});