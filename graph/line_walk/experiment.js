(function () {
    var canvas = document.getElementsByTagName('canvas')[0];

    document.body.style.background = '#191919';

    /**
     * Battle area when armies have a war. It manages territories and armies
     * @param canvas
     * @constructor
     */
    function BattleField(canvas) {

        var armies_collection = [],
            context = canvas.getContext('2d'),
            lost_time = 60000, // time when a cell is considered as nobody's
            coefficient = 10, // have to be divided on 2
            map = [],
            leading_time = 120000,
            leader_start_time = new Date().valueOf(),
            current_leader_id = null,
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

        this.setLeader = function (id) {
            var current_time = new Date().valueOf(),
                army = null;

            if (current_leader_id !== id) {
                current_leader_id = id;
                leader_start_time = new Date().valueOf();
            } else {
                if ((current_time - leader_start_time) >= leading_time) {
                    army = self.getArmyById(id);
                    if (army) {
                        army.addStar();
                        leader_start_time = new Date().valueOf();
                    }
                }
            }
        }

        this.getArmyById = function (id) {
            for (var army_prop in armies_collection) {
                if (armies_collection[army_prop].getId() == id) {
                    return armies_collection[army_prop];
                }
            }
            return null;
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

        initField();
    }

    /**
     * Territory unit, it could be occupied and in separatism state
     * @param x
     * @param y
     * @param width
     * @param color
     * @param id
     * @param lost_time
     * @param context
     * @constructor
     */
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

    /**
     * Army class, it occupies territories or return control to
     * own territories
     * @param color
     * @param battleField
     * @constructor
     */
    function Army(color, battleField) {
        var color = color,
            stars = 0,
            id = Math.floor(Math.random() * 1000000000),
            coordinates = battleField.generateInitCoords();

        this.getId = function () {
            return id;
        }

        this.addStar = function () {
            stars++;
        }

        this.getStarsCount = function () {
            return stars;
        }

        this.getColor = function () {
            return color;
        }

        var occupyArea = function (old_x, old_y) {
            do {
                coordinates = battleField.generateNewCoords(old_x, old_y);
            } while (!battleField.addToMap(coordinates.y, coordinates.x, id, color));

            setTimeout(occupyArea, 0, coordinates.x, coordinates.y);
        }

        occupyArea(coordinates.x, coordinates.y);
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
    function drawRatingsChart() {
        var statistics_obj = {},
            statistics_array = [],
            map = field.getMap();

        // counts ratings per color
        for (var y in map) {
            for (var x in map[y]) {
                if (statistics_obj[map[y][x].getId()]) {
                    statistics_obj[map[y][x].getId()]++;
                } else {
                    statistics_obj[map[y][x].getId()] = 1;
                }
            }
        }
        // creates an array of rating/color objects
        for (var id in statistics_obj) {
            var army = field.getArmyById(id);
            statistics_array.push({rating: statistics_obj[id], id: id, color: army.getColor(), stars: army.getStarsCount()});
        }
        // sorts by rating
        statistics_array.sort(function (a, b) {
            if (a.rating < b.rating)
                return 1;
            if (a.rating > b.rating)
                return -1;
            // a must be equal to b
            return 0;
        });
        field.setLeader(statistics_array[0].id);
        function drawStars(count) {
            var string = '';
            for (var i = 0; i < count; i++) {
                string += '*';
            }
            return string;
        }
        // creates html chart
        document.getElementById('rating').innerHTML = '';
        for (var index in statistics_array) {
            var chart_el = document.createElement('DIV'),
                data_el = document.createElement('DIV'),
                wrapper_el = document.createElement('DIV'),
                position = parseInt(index) + 1,
                stars_string = drawStars(statistics_array[index].stars);

            chart_el.setAttribute('class', 'army');
            data_el.setAttribute('class', 'data');
            wrapper_el.setAttribute('class', 'wrapper');

            chart_el.style.width = (statistics_array[index].rating/20) + 'px';
            chart_el.style.height = 8 + 'px';
            chart_el.style.background = statistics_array[index].color;
            data_el.innerHTML = statistics_array[index].rating + '<span> ' + stars_string + '</span>';

            wrapper_el.appendChild(chart_el);
            wrapper_el.appendChild(data_el);

            document.getElementById('rating').appendChild(wrapper_el);

        }
    }
    setInterval(drawRatingsChart, 5000);

})();
