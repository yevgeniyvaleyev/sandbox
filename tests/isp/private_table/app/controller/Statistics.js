Ext.define('PT.controller.Statistics', {
    extend: 'Ext.app.Controller',
    views: [
        'Statistics'
    ],
    stores: [
        'Statistics'
    ],
    models: [
        'Statistics'
    ],
    /**
     * Fires when the controller initiates
     * @access public
     * @return null
     */
    init: function() {        
        var app = this.application;
        var store = this.getStatisticsStore();
        
        store.getProxy().on('unauthorized', function() {
            app.fireEvent('unauthorized');
        })
        this.application.on({
            logined: function() {
                store.load();
            },
            scope: this
        });        
    }
});