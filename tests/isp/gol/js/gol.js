/**
 * Conway's Game of Life, Javascript implementation
 * @author Yevgeniy Valeyev
 */

var gol = function() {
    var paused  = true,
        game_id = '#gol',
        url     = 'config.json',
        delay   = 1000,
        cell_size = 3,
        canvas = document.getElementById('board'),
        ctx = canvas.getContext('2d'),
        generate_limits = {x: 500, y: 200},
        worker_src = 'js/gol.worker.js',
        worker = null;

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
                    var _data = (typeof v == 'object') ? v : JSON.parse(v);
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
        };
        $('#delay', game_id).bind('change', function(){
            delay = $(this).val();
        });
    };

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
    };

    /**
     * Inits shape
     */
    var initShape = function (row_length, map_length) {
        var width = row_length * cell_size,
            height = map_length * cell_size;

//        canvas.style.width = width;
//        canvas.style.height = window.innerHeight;

        $(canvas).css({
            height: window.innerHeight - 4 + 'px'
        })
        console.log('UJEEN --->  --->  ', window.innerHeight);

        canvas.width = width;
        canvas.height = height;
    }

    /**
     * Draws life
     * @param map
     */
    var drawLife = function (life_collection) {

        ctx.beginPath();
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (var y = 0; y < life_collection.length; y++) {
            var _tmpRowLength = life_collection[y].length;
            for (var x = 0; x < _tmpRowLength; x++) {
                if (!!life_collection[y][x]) {
                    ctx.save();
                    ctx.beginPath();
                    var x0 = x * cell_size + cell_size/2,
                        y0 = y * cell_size + cell_size/2,
                        gradient = ctx.createRadialGradient(x0, y0, cell_size/4, x0, y0, cell_size/2);

                    gradient.addColorStop(0, '#5cd14f');
                    gradient.addColorStop(1, '#000');
                    gradient.addColorStop(1, 'rgba(0,0,0,0)');

                    ctx.fillStyle = gradient;
                    ctx.rect(x * cell_size, y * cell_size, cell_size, cell_size);
                    ctx.fill();
                    ctx.restore();
                }
            }
        }
    }

    /**
     * Generates
     * @param callback
     */
    var generateData = function (type, data, callback) {
        if (!!window.Worker) {
            if (!worker) {
                worker = new Worker(worker_src);
            }
            worker.postMessage({
                type: type,
                data: data
            });
            worker.onmessage = function (event) {
                if (event.data.type == type) {
                    callback(event.data.data);
                }
            };
        } else {
            console.log('Your browser does not support Web Workers!');
        }
    }

    /**
     * Inits a board of the game.
     * @access private
     * @return null
     */
    var initBoard = function() {
        var params = {
            x: generate_limits.x,
            y: generate_limits.y
        }
        generateData('initial', params, function (data) {
            initShape(data[0].length, data.length);
            drawLife(data);
        })
//        loadData(function() {
//        })
    }

    /**
     * Generates a new genegation
     * @access private
     * @return null
     */
    var generation = function (callback) {
        generateData('generation', {}, function(data) {
            drawLife(data);
            callback();
        })
    };

    /**
     * Runs or pauses the game.
     * @access private
     * @return null
     */
    var run = function(event) {
        if (event) {
            paused = !paused;
        }
        generation(function(){
            if (!paused) {
                $(this).val('stop');
                setTimeout(run, delay);
            } else {
                $(this).val('run');
            }
        });
    };

    return {
        init : this.init
    };
};

// Inits the game on load        
$(function() {
    gol().init();
});
