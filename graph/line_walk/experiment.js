(function () {
    var canvas = document.getElementsByTagName('canvas')[0];

    document.body.style.background = '#191919';

    function battleField(canvas) {

        var armies_collection = [],
            context = canvas.getContext('2d');

        var initField = function () {
            canvas.width = canvas.style.width = 1000;
            canvas.height = canvas.style.height = 500;
            context.beginPath();
            context.fillStyle = 'black';
            context.fillRect(0, 0, canvas.width , canvas.height);
        }

        this.addArmy = function (color) {
            var army = new Army(color, context);
            armies_collection.push(army);
        }

        this.getArmiesCollection = function () {
            return armies_collection;
        }

        initField();

    }

    function region(x, y, width, color, id, lost_time, context) {
        var x = x,
            color = color,
            id = id,
            y = y,
            separatism = false,
            lost_time = lost_time,
            control_timeout;

        this.getId = function () {
            return id;
        }

        this.getColor = function () {
            return color;
        }

        this.isSeparatism = function () {
            return separatism;
        }

        this.updateControl = function () {
            markVisited();
            clearTimeout(control_timeout);
            control_timeout = setTimeout(function(){
                separatism = true;
                paintArea(x, y, '#000000', width*0.5, true);
            }, lost_time)
        };

        var paintArea = function (x, y, color, width, centered) {
            var x =     !!centered ? (x + width/2) : x,
                y =     !!centered ? (y + width/2) : y,
                width = width - 1;

            context.save();
            context.fillStyle = color;
            context.fillRect(x, y, width, width);
            context.restore();
        }

        var markVisited = function () {
            setTimeout(function(){
                paintArea(x, y, color, width);
            }, 0);
            paintArea(x, y, '#000000', width);
        }   
        
        markVisited();
        this.updateControl();      
    }

    function Army(color, context) {
        var context = context,
            coefficient = 5, // have to be divided on 2
            x = null,
            y = null,
            lost_time = 90000, // time when a cell is considered as nobody's
            color = color,
            id = Math.floor(Math.random() * 1000000000);

        this.getStatistics = function () {
            return {
                color: color,
                id: id
            }
        }

        // TODO seems this method should be in battle field class
        var addToMap = function (y, x, id) {
            var status = false,
                current_time = new Date().valueOf();

            if (!Army.map) {
                Army.map = [];
            }
            if (!Army.map[y]) {
                Army.map[y] = [];
            }
            
            if (!Army.map[y][x] || Army.map[y][x].isSeparatism() || Army.map[y][x].getId() == id) {
                if (!!Army.map[y][x] && Army.map[y][x].getId() == id) {
                    Army.map[y][x].updateControl();
                } else {
                    // TODO add updating with enemy data rather create new, create new only if empty
                    Army.map[y][x] = new region(x, y, coefficient, color, id, lost_time, context);
                }
                status = true;
            }
            return status;
        }

        var generateNewCoords = function (old_x, old_y) {
            var y = old_y + Math.floor(Math.random() * 3 - 1) * coefficient,
                x = old_x + Math.floor(Math.random() * 3 - 1) * coefficient;

            if (x < 0) {
                x = Math.abs(x);
            }
            if (x > canvas.width) {
                x = canvas.width;
            }
            if (y < 0) {
                y = Math.abs(y);
            }
            if (y > canvas.height) {
                y = canvas.height;
            }
            return {
                x: x,
                y: y
            }
        }

        var generateInitCoords = function () {
            var tmp_x = Math.floor(Math.random() * (canvas.width - coefficient)),
                tmp_y = Math.floor(Math.random() * (canvas.height - coefficient));

            x = Math.round(tmp_x / coefficient) * coefficient;
            y = Math.round(tmp_y / coefficient) * coefficient;
        }

        var paintArea = function (x, y, color) {
            context.save();
            context.fillStyle = color;
            context.fillRect(x - coefficient/2 - 1, y - coefficient/2 - 1, coefficient - 1, coefficient - 1);
            context.restore();
        }

        var occupyArea = function (old_x, old_y) {
            var new_coords = null;
            do {
                new_coords = generateNewCoords(old_x, old_y);
            } while (!addToMap(new_coords.y, new_coords.x, id));
            setTimeout(occupyArea, 0, new_coords.x, new_coords.y);
        }

        generateInitCoords();
        occupyArea(x, y);
    }

    var field = new battleField(canvas);

    field.addArmy('green');
    field.addArmy('red');
    field.addArmy('blue');
    field.addArmy('yellow');
    field.addArmy('orange');
    field.addArmy('brown');
    field.addArmy('grey');
    field.addArmy('cyan');
    field.addArmy('#d000ff');
    field.addArmy('#72ff00');
    field.addArmy('#0099ff');

    // TODO: refactor this mess
    function rating() {
        var statistics_obj = {}, statistics_array = [];
        // sort ratings by id
        for (var y in Army.map) {
            for (var x in Army.map[y]) {
                if (statistics_obj[Army.map[y][x].getColor()]) {
                    statistics_obj[Army.map[y][x].getColor()]++;
                } else {
                    statistics_obj[Army.map[y][x].getColor()] = 1;
                }
            }
        }
        // sort colors and ratings
        for (var color in statistics_obj) {
            statistics_array.push({rating: statistics_obj[color], color: color});
        }
        statistics_array.sort(function (a, b) {
            if (a.rating < b.rating)
                return 1;
            if (a.rating > b.rating)
                return -1;
            // a must be equal to b
            return 0;
        });

        document.getElementById('rating').innerHTML = '';
        for (var index in statistics_array) {
            var el = document.createElement('DIV'),
                position = parseInt(index) + 1;

                el.style.width = (statistics_array[index].rating/20) + 'px';
                el.style.height = 8 + 'px';
                el.style.background = statistics_array[index].color,
                el.innerHTML = '<span>' + position + ' - ' + statistics_array[index].rating + '</span>';
            document.getElementById('rating').appendChild(el);
        }
    }
    setInterval(rating, 5000);

})();
