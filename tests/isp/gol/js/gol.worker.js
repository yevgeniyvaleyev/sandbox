/**
 * Gol resolver (web worker)
 * @author: Yevgeniy Valeyev
 */

var neighbourOffset = [
    [-1, -1],[0 , -1],[1 , -1],[-1,  0],
    [1 ,  0],[-1,  1],[0 ,  1],[1 ,  1]
    ],
    map = [];

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
        tmp_map_row = [];

    for (var y = 0; y < y_limit; y++) {
        tmp_map_row = [];
        for (var x = 0; x < x_limit; x++) {
            var division = Math.floor(Math.random() * 20);
            number = (x%division == 0) ? Math.floor(Math.random() * 2) : 0;
            tmp_map_row.push(number);
        }
        tmp_map.push(tmp_map_row);
    }
    map = tmp_map;
    return tmp_map;
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
 * Generates a data of new generation
 * @param data
 * @returns {*}
 */
function generationData() {
    var tempMap = JSON.parse(JSON.stringify(map));

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
        for (var x2 = 0; x2 < map[y2].length; x2++) {
            if (map[y2][x2] != tempMap[y2][x2]) {
                map[y2][x2] = tempMap[y2][x2];
            }
        }
    }
    return map;
}

onmessage = function(event) {
    var return_data = {
        type: event.data.type,
        data: {}
    }
    if (typeof event.data !== 'object' && event.data.type) {
        return false;
    }
    switch (event.data.type) {
        case 'initial':
            return_data.data = initialData(event.data.data);
            break;
        case 'generation':
            return_data.data = generationData();
            break;
        default:
            break;
    }
    postMessage(return_data);
};
