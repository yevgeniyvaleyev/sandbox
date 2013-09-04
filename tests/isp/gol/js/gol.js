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
        worker = null,
        worker_callbacks = [];

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
     * Returns mouse position on canvas
     * @param canvas
     * @param evt
     * @returns {{x: number, y: number}}
     */
    var getCellPos = function (canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: parseInt((evt.clientX - rect.left) / cell_size, 10),
            y: parseInt((evt.clientY - rect.top) / cell_size, 10)
        };
    }

    /**
     * Adds new life
     */
    var addLife = function (event) {
        var mouse_pos = getCellPos(this, event);
        generateData('new_life', mouse_pos);
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
        $(canvas).bind('click', addLife);
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
     * Returns critical color
     * @param age
     * @returns {string}
     */
    function getColor(age) {
        var age_1_hue = (age <= 250) ? age : 250,
            age_2_hue = (age > 250 && age <= 500) ? age - 250 : 0;

        if (age > 3000) {
            return age%2?'red':'white';
        }
        if (age > 2000) {
            return '#fc6464'
        }
        if (age > 1000) {
            return '#fca1a1'
        }
        if (age > 500) {
            age_2_hue = 250;
        }
        return 'rgba(' + age_1_hue + ',250, ' + age_2_hue + ',1)';
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
                    life_color = getColor(age),
                    radius = cell_size/3;

                ctx.save();
                ctx.beginPath();
                var x0 = x * cell_size + cell_size/2,
                    y0 = y * cell_size + cell_size/2;

                ctx.fillStyle = life_color;
                ctx.arc(x0, y0, radius, 0, Math.PI * 2, true);
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
            if (!worker_callbacks[type]) {
                worker_callbacks[type] = callback;
            }
            if (!worker) {
                worker = new Worker(worker_src);
            }
            worker.postMessage({
                type: type,
                data: data
            });
            worker.onmessage = function (event) {
                if (!!worker_callbacks[event.data.type]) {
                    worker_callbacks[event.data.type](event.data.data);
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
