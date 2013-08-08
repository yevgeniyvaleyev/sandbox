var to_load = [];

function onLoad() {
    for (var i = 0; i < to_load.length; i++) {
        to_load[i]();
    }
}

function addCanvas(id) {
    var canvas = document.createElement('canvas');
    if (id) {
        canvas.id = id;
    }
    document.body.appendChild(canvas);
    return canvas;
}
// ----------------------

function Translate() {

    function drawSpirograph(ctx, R, r, O) {
        var x1 = R - O;
        var y1 = 0;
        var i = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        do {
            if (i > 20000) break;
            var x2 = (R + r) * Math.cos(i * Math.PI / 72) - (r + O) * Math.cos(((R + r) / r) * (i * Math.PI / 72))
            var y2 = (R + r) * Math.sin(i * Math.PI / 72) - (r + O) * Math.sin(((R + r) / r) * (i * Math.PI / 72))
            ctx.lineTo(x2, y2);
            x1 = x2;
            y1 = y2;
            i++;
        } while (x2 != R - O && y2 != 0);
        ctx.stroke();
    }
    var canvas = addCanvas('translate-test'),
        ctx = canvas.getContext("2d"),
        j = Math.floor(Math.random() * 4), i = Math.floor(Math.random() * 4), count = 0;
    ctx.fillRect(0, 0, 300, 150);

    ctx.translate(150, 75);

    function getColor() {
        return Math.floor(Math.random() * 256);
    }

    setInterval(function () {

        if (count >= 20) {
            ctx.save();
            ctx.fillStyle = '#000';
            ctx.fillRect(-150, -75, 300, 150);
            j = Math.floor(Math.random() * 4);
            i = Math.floor(Math.random() * 4);
            ctx.restore();
            count = 0;
        }

        ctx.save();

        ctx.strokeStyle = "rgb(" +  getColor() + ", " + getColor() + ", " + getColor() + ")" ;
        var radius_1 = 20 * (j + 2) / (j + 1);
        var radius_2 = -8 * (i + 3) / (i + 1);
        if (j > -1  && i > -1) {
            drawSpirograph(ctx, radius_1, radius_2, 10);
        }
        i -= Math.random();
        j -= Math.random();
        ctx.restore();
        count += 1;
    }, 50);
}
to_load.push(Translate);

function Rotate() {
    function heart(y, ctx) {
        var x0 = -7,
            y0 = y * 12.5,
            k = 0.09;
        ctx.moveTo(75*k + x0, 40*k + y0);
        ctx.bezierCurveTo(75*k + x0, 37*k + y0, 70*k + x0, 25*k + y0, 50*k + x0, 25*k + y0);
        ctx.bezierCurveTo(20*k + x0, 25*k + y0, 20*k + x0, 55*k + y0, 20*k + x0, 62.5*k + y0);
        ctx.bezierCurveTo(20*k + x0, 80*k + y0, 40*k + x0, 102*k + y0, 75*k + x0, 120*k + y0);
        ctx.bezierCurveTo(110*k + x0, 102*k + y0, 130*k + x0, 80*k + y0, 130*k + x0, 62.5*k + y0);
        ctx.bezierCurveTo(130*k + x0, 62.5*k + y0, 130*k + x0, 25*k + y0, 100*k + x0, 25*k + y0);
        ctx.bezierCurveTo(85*k + x0, 25*k + y0, 75*k + x0, 37*k + y0, 75*k + x0, 40*k + y0);

        ctx.fill();
        ctx.save();
    }
    function circle(y, ctx) {
        ctx.arc(0, y * 12.5, 5, 0, Math.PI * 2, true);// seems it draws circled to the bottom
        ctx.fill();
    }
    function square(y, ctx) {
        ctx.fillRect(-5, y * 12.5, 10, 10);
    }
    function draw(geometricObject, ctx) {
        for (var i = 1; i < 6; i++) { // Loop through rings (from inside to out)
            ctx.save();
            ctx.fillStyle = 'rgb(' + (51 * i) + ',' + (255 - 51 * i) + ',255)';

            // i * 6 - calculate an amount of next circles
            for (var j = 0; j < i * 6; j++) { // draw individual dots
                ctx.rotate(Math.PI * 2 / (i * 6));// calculate an angle, changes an angle each iteration
                ctx.beginPath();
                geometricObject(i, ctx);
            }
            ctx.restore();
        }
    }
    var ctx = addCanvas('rotate-test').getContext('2d');
    ctx.translate(75, 75);
    draw(circle, ctx);

    ctx.translate(150, 0);// offset depends on previous 'translate'

    ctx.scale(0.75,0.75);
    var scale = 0.9,
        old_scale,
        k = 0.01;

    setInterval(function () {

        if (scale == 1 || scale == 0.3) {
            // switcher
            // keeps scale between 1 and 0.3
            k *= -1;
        }
        old_scale = scale;
        scale = ((scale * 100 + k * 100) / 100).toFixed(2);// this is needed to prevent float like (0.70000000000001) err

        var scale_proportion = scale / old_scale;
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.rotate(Math.PI * 2 / 360);
        ctx.scale(scale_proportion, scale_proportion);
        draw(heart, ctx);
        ctx.arc(0, 0, 75, 0, Math.PI * 2, true);
    },100);
}
to_load.push(Rotate);
