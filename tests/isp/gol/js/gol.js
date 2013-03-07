/**
 * Conway's Game of Life, Javascript implementation
 * @author Yevgeniy Valeyev
 */
var gol = function() {
    
    var paused  = true;
    var game_id = '#gol';  
    var url     = 'config.json';
    var delay   = 1000;
    
    var neighbourOffset = [
        [-1, -1],[0 , -1],[1 , -1],[-1,  0],
        [1 ,  0],[-1,  1],[0 ,  1],[1 ,  1]
    ];
    
    var map     = new Array();    
    var tempMap = new Array();    
        
    /**
     * Loads data config from the server and validates.
     * Works with the same domain or allowed
     * @param function fn, callback
     * @access private
     * @return null
     */
    var loadData = function (fn) {
        $.ajax(url)
        .done(function(v){
            try {
                var _valid = true;
                var _data = JSON.parse(v);
                var _rowLen = _data[0].length;
                var reg = new RegExp('^(1|0){' + _rowLen + '}$','i');
                
                for (var i = 0; i < _data.length; i++) {
                    var _tmpStr = _data[i];                    
                    if (typeof _tmpStr == 'string' && reg.test(_tmpStr)) {
                        map[i] = $.map(_tmpStr.split(''), Number);
                    } else {
                        _valid = false;
                        map = [];
                        console.warn('Invalid row (#' + i + ', "' + _tmpStr + '")! Fix and reload');
                        break;
                    }
                }    
                if(fn && _valid) {
                    fn();
                }
            } catch (e) {
                console.warn('Parse config problem. Ckeck the config and reload.', e);
            }            
        })
        .fail(function(){
            console.log('Fail to load config');
        })
    }
    
    /**
     * Inits the game.
     * @access public
     * @return null
     */      
    this.init = function() {
        initBoard(); 
        initActions();          
    }
    
    /**
     * Triggers a cell.
     * @param object event, element event
     * @access private
     * @return null
     */
    var triggerCell = function (event) {
        var pos = $(event.target).data('pos').split('-');
        var _x  = pos[1];
        var _y  = pos[0];
        if (!isNaN(_x) && !isNaN(_y)) {
            $(event.target).toggleClass('alive').addClass('visited');
            map[_y][_x] = !!map[_y][_x] ? 0 : 1;    
        } 
    }
    
    /**
     * Inits delay control.
     * @access private
     * @return null
     */
    var initDelayControl = function () {
        for (var d = 0; d <= 1000; d += 100) {
            var sel = (delay == d) ? 'selected="selected"' : '';            
            $('#delay', game_id).append('<option value="' + d + '" ' + sel + '>' + d + '</option>');
        }        
        $('#delay', game_id).bind('change', function(){
            delay = $(this).val();
        });
    }
    
    /**
     * Inits events.
     * @access private
     * @return null
     */
    var initActions = function () {
        $('.run', game_id).bind('click', run);
        $('.reload', game_id).bind('click', initBoard);
        $('.board', game_id).delegate('div','click', triggerCell);
        initDelayControl();
    }
     
    /**
     * Checks whether a target cell alive.
     * @access private
     * @return boolean
     */
    var isAlive = function (x, y) {
        if (y == map.length) {
            y = 0;
        } else if (y == -1) {
            y = map.length - 1;
        }
        if (x == map[y].length) {
            x = 0;
        } else if (x == -1) {
            x = map[y].length - 1;
        }
        return !!map[y][x];
    }
          
    /**
     * Inits a board of the game.
     * @access private
     * @return null
     */          
    var initBoard = function() {
        loadData(function() {            
            var board = $('.board', game_id).empty();
            var _firstRowLength = map[0].length;
            
            for (var y = 0; y < map.length; y++) {
                var _tmpRowLength = map[y].length;
                for (var x = 0; x < _tmpRowLength; x++) {
                    var _cell = $('<div>');
                    _cell.data('pos', y + '-' + x);
                    if (!!map[y][x]) {
                        _cell.addClass('alive');
                    }
                    board.append(_cell);
                }
            }
            // Calculates width of board, because the size depends on config
            board.css('width', $('div', board).outerWidth() * _firstRowLength);
        })
    }
           
    /**
     * Generates a new genegation
     * @access private
     * @return null
     */
    var generation = function () {   
        
        $.extend(true, tempMap, map);   
        
        for (var y = 0; y < map.length; y++) {
            for (var x = 0; x < map[y].length; x++) {
                var neighbours = 0;     
                
                for (var c = 0; c < neighbourOffset.length; c++) {
                    var _x = neighbourOffset[c][0];
                    var _y = neighbourOffset[c][1];
                    if (isAlive(x + _x, y + _y)) {
                        neighbours++;
                    }
                }
                if (neighbours >= 4 || neighbours == 1 || neighbours == 0) {
                    tempMap[y][x] = 0;
                }
                if (neighbours == 3) {
                    tempMap[y][x] = 1;
                }
            }
        }                        
        applyGeneration();
    }
    
    /**
     * Applies a new generation.
     * @access private
     * @return null
     */
    var applyGeneration = function () {
        for (var y2 = 0; y2 < map.length; y2++) {                            
            for (var x2 = 0; x2 < map[y2].length; x2++) {
                if (map[y2][x2] != tempMap[y2][x2]) {
                    map[y2][x2] = tempMap[y2][x2];
                    var _cellPos = parseInt(''+y2+x2, 10);
                    $('.board div', game_id)
                    .eq(_cellPos)
                    .attr('class', !!map[y2][x2] ? 'alive' : 'visited')
                }
            }
        }
    }
    
    /**
     * Runs or pauses the game.
     * @access private
     * @return null
     */
    var run = function(event) {
        if (event) {
            paused = !paused;
        }
        if (!paused) {
            $(this).val('stop');
            setTimeout(run, delay);
        } else {
            $(this).val('run');
        }
        generation();
    }
                    
    return {
        init : this.init
    }
}
        
// Inits the game on load        
$(function() {
    gol().init();
})