(function () {
    var canvas = document.getElementsByTagName('canvas')[0];

    document.body.style.background = '#191919';

    function BattleField(canvas) {

        var armies_collection = [],
            context = canvas.getContext('2d'),
            lost_time = 30000, // time when a cell is considered as nobody's
            coefficient = 10, // have to be divided on 2
            map = [],
            self = this;

        var initField = function () {
            canvas.width = canvas.style.width = 1000;
            canvas.height = canvas.style.height = 500;
            context.beginPath();
            context.fillStyle = 'black';
            context.fillRect(0, 0, canvas.width , canvas.height);
        }

        this.getMap = function () {
            return map;
        }

        this.generateNewCoords = function (old_x, old_y) {
            var y = old_y + Math.floor(Math.random() * 3 - 1) * coefficient,
                x = old_x + Math.floor(Math.random() * 3 - 1) * coefficient;

            if (x < 0) {
                x = Math.abs(x);
            }
            if (x >= canvas.width) {
                x = canvas.width - coefficient;
            }
            if (y < 0) {
                y = Math.abs(y);
            }
            if (y >= canvas.height) {
                y = canvas.height - coefficient;
            }
            return {
                x: x,
                y: y
            }
        }

        this.generateInitCoords = function () {
            var tmp_x = Math.floor(Math.random() * (canvas.width - coefficient)),
                tmp_y = Math.floor(Math.random() * (canvas.height - coefficient));

            return {
                x: Math.round(tmp_x / coefficient) * coefficient,
                y: Math.round(tmp_y / coefficient) * coefficient
            }
        }

        this.addToMap = function (y, x, id, color) {
            var status = false,
                region_obj;

            if (!map) {
                map = [];
            }
            if (!map[y]) {
                map[y] = [];
            }
            region_obj = map[y][x];

            if (!region_obj || region_obj.isSeparatism() || region_obj.getId() == id) {
                if (!!region_obj) {
                    if (region_obj.getId() == id) {
                        region_obj.updateControl();
                    } else {
                        region_obj.occupy(id, color);
                    }
                } else {
                    map[y][x] = new Region(x, y, coefficient, color, id, lost_time, context);
                }
                status = true;
            }
            return status;
        }

        this.addArmy = function (color) {
            var army = new Army(color, self);
            // TODO think about registering methods
            armies_collection.push(army);
        }

//        this.getArmiesCollection = function () {
//            return armies_collection;
//        }

        initField();

    }

    function Region(x, y, width, color, id, lost_time, context) {
        var region_x = x,
            region_color = color,
            region_id = id,
            region_y = y,
            separatism = false,
            region_lost_time = lost_time,
            control_timeout,
            mark_width = width * 0.5,
            dummy_color = '#000000',
            self = this;

        this.getId = function () {
            return region_id;
        }

        this.getColor = function () {
            return region_color;
        }

        this.isSeparatism = function () {
            return separatism;
        }

        this.occupy = function (id, color) {
            region_id = id;
            region_color = color;
            self.updateControl();
        }

        this.updateControl = function () {
            markVisited();
            separatism = false;
            clearTimeout(control_timeout);
            control_timeout = setTimeout(function(){
                separatism = true;
                // mark with small square
                paintArea(region_x, region_y, dummy_color, mark_width, true);
            }, region_lost_time)
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
                paintArea(region_x, region_y, region_color, width);
            }, 0);
            paintArea(region_x, region_y, dummy_color, width);
        }

        markVisited();
        this.updateControl();
    }

    function Army(color, battleField) {
        var color = color,
            id = Math.floor(Math.random() * 1000000000),
            coords = battleField.generateInitCoords();

        // TODO seems this method should be in battle field class
//        var addToMap = function (y, x, id) {
//            var status = false,
//                region_obj;
//
//            if (!field.getMap()) {
//                field.getMap() = [];
//            }
//            if (!field.getMap()[y]) {
//                field.getMap()[y] = [];
//            }
//            region_obj = field.getMap()[y][x];
//
//            if (!region_obj || region_obj.isSeparatism() || region_obj.getId() == id) {
//                if (!!region_obj) {
//                    if (region_obj.getId() == id) {
//                        region_obj.updateControl();
//                    } else {
//                        region_obj.occupy(id, color);
//                    }
//                } else {
//                    field.getMap()[y][x] = new Region(x, y, coefficient, color, id, lost_time, context);
//                }
//                status = true;
//            }
//            return status;
//        }

//        var generateNewCoords = function (old_x, old_y) {
//            var y = old_y + Math.floor(Math.random() * 3 - 1) * coefficient,
//                x = old_x + Math.floor(Math.random() * 3 - 1) * coefficient;
//
//            if (x < 0) {
//                x = Math.abs(x);
//            }
//            if (x >= canvas.width) {
//                x = canvas.width - coefficient;
//            }
//            if (y < 0) {
//                y = Math.abs(y);
//            }
//            if (y >= canvas.height) {
//                y = canvas.height - coefficient;
//            }
//            return {
//                x: x,
//                y: y
//            }
//        }
//
//        var generateInitCoords = function () {
//            var tmp_x = Math.floor(Math.random() * (canvas.width - coefficient)),
//                tmp_y = Math.floor(Math.random() * (canvas.height - coefficient));
//
//            x = Math.round(tmp_x / coefficient) * coefficient;
//            y = Math.round(tmp_y / coefficient) * coefficient;
//        }

//        var paintArea = function (x, y, color) {
//            context.save();
//            context.fillStyle = color;
//            context.fillRect(x - coefficient/2 - 1, y - coefficient/2 - 1, coefficient - 1, coefficient - 1);
//            context.restore();
//        }

        var occupyArea = function (old_x, old_y) {
            do {
                coords = battleField.generateNewCoords(old_x, old_y);
            } while (!battleField.addToMap(coords.y, coords.x, id, color));

            setTimeout(occupyArea, 0, coords.x, coords.y);
        }

        occupyArea(coords.x, coords.y);
    }

    var field = new BattleField(canvas);

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
        var statistics_obj = {}, statistics_array = [], map = field.getMap();
        // sort ratings by id
        for (var y in map) {
            for (var x in map[y]) {
                if (statistics_obj[map[y][x].getColor()]) {
                    statistics_obj[map[y][x].getColor()]++;
                } else {
                    statistics_obj[map[y][x].getColor()] = 1;
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
