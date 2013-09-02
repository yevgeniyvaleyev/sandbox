/**
 * Conway's Game of Life, Javascript implementation
 * @author Yevgeniy Valeyev
 */

var gol = function() {
    var paused  = true,
        game_id = '#gol',
        delay   = 0,
        cell_size = 4,
        canvas = document.getElementById('board'),
        ctx = canvas.getContext('2d'),
        worker_src = 'js/gol.worker.js',
        old_life_collection = [],
        worker = null;

    /**
     * Inits the game.
     * @access public
     * @return null
     */
    this.init = function() {
        $(window).resize(function () {
            initBoard(run);
        })
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

        canvas.width = width;
        canvas.height = height;
    }

    /**
     * Creates lived cells
     * @param life_collection
     */
    var createLivedCell = function (life_collection) {
        if (old_life_collection) {
            for (var y = 0; y < life_collection.length; y++) {
                var _tmpRowLength = life_collection[y].length;
                for (var i = 0; i < _tmpRowLength; i++) {
                    var x = life_collection[y][i].x_position,
                        life_color = '#031405';
                    ctx.beginPath();
                    var x0 = x * cell_size + cell_size/2,
                        y0 = y * cell_size + cell_size/2;

                    ctx.fillStyle = life_color;
                    ctx.arc(x0, y0, (cell_size/2)*1.1, 0, Math.PI * 2, true);
                    ctx.fill();
                }
            }
        }
        old_life_collection = life_collection;
    }
    /**
     * Draws life
     * @param map
     */
    var drawLife = function (life_collection) {

        createLivedCell(life_collection);

        for (var y = 0; y < life_collection.length; y++) {
            var _tmpRowLength = life_collection[y].length;
            for (var i = 0; i < _tmpRowLength; i++) {
                var x = life_collection[y][i].x_position,
                    age = life_collection[y][i].age,
                    age_1_hue = (age <= 250) ? age : 250,
                    age_2_hue = (age > 250 && age <= 500) ? age - 250 : 0,
                    age_2_hue = (age > 500) ? 250 : age_2_hue,
                    life_color = 'rgba(' + age_1_hue + ',250, ' + age_2_hue + ',1)';

                ctx.save();
                ctx.beginPath();
                var x0 = x * cell_size + cell_size/2,
                    y0 = y * cell_size + cell_size/2;

                ctx.fillStyle = life_color;
                ctx.arc(x0, y0, cell_size/3, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.restore();
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
    var initBoard = function(callback) {
        var params = {
            x: parseInt(window.innerWidth/cell_size),
            y: parseInt(window.innerHeight/cell_size)
        }
        generateData('initial', params, function (data) {
            initShape(data.cols, data.rows);
            drawLife(data.map);
            if (callback) {
                callback();
            }
        })
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
        var self = this;
        if (event) {
            paused = !paused;
        }
        generation(function(){
            if (!paused) {
                $(self).val('stop');
                setTimeout(run, delay);
            } else {
                $(self).val('run');
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
