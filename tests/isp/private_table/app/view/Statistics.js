Ext.define('PT.view.Statistics' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.statisticsList',
    store: 'Statistics',
    title : 'Statistics',
    
    /**
     * Initiates a component
     * @access public
     * @return null
     */
    initComponent: function() {        
        this.columns = [
            {header: 'IP',  dataIndex: 'ip',  flex: 1},
            {header: 'Time', dataIndex: 'time', flex: 1},
            {header: 'Count', dataIndex: 'count', flex: 1}
        ];
        this.callParent(arguments);
    }
});