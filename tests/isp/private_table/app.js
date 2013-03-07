/**
 * Statistics table implementation on ExtJS 4.
 * @author Yevgeniy Valeyev
 */
Ext.application({
    name: 'PT',
    appFolder: 'app',
    controllers: [
        'Statistics',
        'Login'
    ],   
    /**
     * Fires when application launches
     * @access public
     * @return null
     */
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [{
                xtype: 'statisticsList'
            }]
        });
    }
});