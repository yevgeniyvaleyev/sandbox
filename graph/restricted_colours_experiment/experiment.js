(function () {
    var canvas = document.getElementsByTagName('canvas')[0],
        context = canvas.getContext('2d');

    document.body.style.background = 'black';
    canvas.width = canvas.style.width = 1000;
    canvas.height = canvas.style.height = 500;

    /**
     * Generates blue and yellow mix
     */
    context.beginPath();
    context.fillStyle = 'blue';
    context.fillRect(0, 0, canvas.width / 2, canvas.height);

    for (var y = 0; y < canvas.height; y++) {
        for (var x = 0; x < canvas.width / 2; x++) {
            if ((x+y) % 2) {
                context.beginPath();
                context.fillStyle = 'yellow';
                context.fillRect(x, y, 0.9, 0.9);
            }
        }
    }

    /**
     * Generates red and green mix
     */
    context.beginPath();
    context.fillStyle = 'green';
    context.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);

    for (var y = 0; y < canvas.height; y++) {
        for (var x = canvas.width / 2; x < canvas.width; x++) {
            if ((x+y) % 2) {
                context.beginPath();
                context.fillStyle = 'red';
                context.fillRect(x, y, 0.9, 0.9);
            }
        }
    }
})();
