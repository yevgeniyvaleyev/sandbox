(function () {
    var canvas = document.getElementsByTagName('canvas')[0],
        context = canvas.getContext('2d');


    document.body.style.background = 'black';
    canvas.width = canvas.style.width = 1000;
    canvas.height = canvas.style.height = 500;

    context.beginPath();
    context.fillStyle = 'blue';
    context.fillRect(0, canvas.height / 2 - 1, canvas.width , 2);

    var y = canvas.height / 2,
        x = 0;

    drawPoint(x, y);

    function drawMessage(text) {
        context.font = "14px Tahoma";
        context.fillStyle = "yellow";
        context.fillText(text, canvas.width/2 , canvas.height/2 - 50);
        context.stroke();
    }


    function drawPoint(old_x, old_y) {
        if (old_x >= canvas.width) {
            drawMessage('finish (' + old_x + ' iterations)');
            return;
        }
        context.lineCap = 'round';
        context.strokeStyle = 'red';
        context.lineWidth = 2;

        context.save();
        context.beginPath();

        var y = old_y + Math.floor(Math.random() * 3 - 1);
        var x = old_x + 1;
        context.moveTo(old_x, old_y);
        context.lineTo(x, y);
        context.stroke();
        context.restore();

        setTimeout(drawPoint, 0, x, y);
    }
})();
