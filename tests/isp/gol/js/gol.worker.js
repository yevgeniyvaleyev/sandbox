/**
 * Gol resolver (web worker)
 * @author: Yevgeniy Valeyev
 */

var neighbourOffset = [
        [-1, -1],[0 , -1],[1 , -1],[-1,  0],
        [1 ,  0],[-1,  1],[0 ,  1],[1 ,  1]
    ],
    map = [],
    new_life = {};


/**
 * Initial set od data
 * @param data
 * @returns {Array}
 */
function initialData(data) {
    var x_limit = data.x,
        y_limit =  data.y,
        number = 0,
        tmp_map = [],
        life_map = [];

    for (var y = 0; y < y_limit; y++) {
        tmp_map[y] = [];
        life_map[y] = [];
        for (var x = 0; x < x_limit; x++) {
            var division = Math.floor(Math.random() * 20);
            number = (x%division == 0) ? Math.floor(Math.random() * 2) : 0;
            tmp_map[y].push(number);
            if (number) {
                life_map[y].push({x_position: x, age: 0});
            }
        }
    }
    map = tmp_map;

    return {
        map: life_map,
        rows: map.length,
        cols: map[0].length
    };
};

/**
 * Checks whether a target cell alive.
 * @access private
 * @return boolean
 */
var isAlive = function (map, x, y) {
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
 * Add a new life to be used in next generation
 * @param data
 */
function newLife(data) {
    var x = parseInt(data.x, 10),
        y = parseInt(data.y, 10),
        key = Math.floor(Math.random() * 1000);

    new_life[key] = {
        x: x,
        y: y
    };
}

/**
 * Adds God life
 */
function addGodLifeIfExist() {
    for (var prop in new_life) {
        var item = new_life[prop],
            height_limit = !isNaN(parseInt(map[item.y + 2])),
            width_limit = !isNaN(parseInt(map[0][item.x + 2]));

        // Walking life
        // **
        // * *
        // *
        if (height_limit && width_limit) {
            map[item.y][item.x] = 1;
            map[item.y + 1][item.x] = 1;
            map[item.y + 2][item.x] = 1;
            map[item.y][item.x + 1] = 1;
            map[item.y + 1][item.x + 2] = 1;
        } else {
            map[item.y][item.x] = 0;
        }

        delete new_life[prop]
    };
}

/**
 * Generates a data of new generation
 * @param data
 * @returns {*}
 */
function generationData() {

    addGodLifeIfExist();

    var tempMap = JSON.parse(JSON.stringify(map)),
        life_map = [];

    for (var y = 0; y < map.length; y++) {
        for (var x = 0; x < map[y].length; x++) {
            var neighbours = 0;

            for (var c = 0; c < neighbourOffset.length; c++) {
                var _x = neighbourOffset[c][0];
                var _y = neighbourOffset[c][1];
                if (isAlive(map, x + _x, y + _y)) {
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
    for (var y2 = 0; y2 < map.length; y2++) {
        life_map[y2] = [];
        for (var x2 = 0; x2 < map[y2].length; x2++) {

            if (tempMap[y2][x2] && map[y2][x2]) {
                tempMap[y2][x2] += 1;
            }
            if (map[y2][x2]) {
                life_map[y2].push({x_position: x2, age: !!tempMap[y2][x2]})
            }
            if (map[y2][x2] != tempMap[y2][x2]) {
                map[y2][x2] = tempMap[y2][x2];
            }

            if (map[y2][x2]) {
                life_map[y2].push({x_position: x2, age: map[y2][x2]})
            }

            if (map[y2][x2] > 3100) {
                newLife({x: x2, y: y2});
            }
        }
    }
    return life_map;
}

onmessage = function(event) {
//    if (typeof event.data !== 'object' && event.data.type) {
//        return false;
//    }
    switch (event.data.type) {
        case 'initial':
            postMessage({
                type: 'initial',
                data: initialData(event.data.data)
            })
            break;
        case 'generation':
            postMessage({
                type: 'generation',
                data: generationData()
            });
            break;
        case 'new_life':
            postMessage({
                type: 'new_life',
                data: newLife(event.data.data)
            });
            break;
    }
};
