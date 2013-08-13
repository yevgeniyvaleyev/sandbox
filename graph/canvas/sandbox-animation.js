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

function clock() {
    var context = addCanvas('clipping-test').getContext('2d');
    function init(){
        clock1();
        setInterval(clock1,1000);
    }
    function clock1(){
        var now = new Date();
        var ctx = context;
        var hours_sector_radian = Math.PI / 36;
        ctx.save();
        ctx.clearRect(0,0,150,150);
        ctx.translate(75,75);
        ctx.scale(0.4,0.4);
        ctx.rotate(-Math.PI/2);
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";
        ctx.lineWidth = 8;
        ctx.lineCap = "round";

        // Hour marks
        ctx.save();
        ctx.fillStyle = 'blue';        
        for (var i=0;i<12;i++){
            ctx.beginPath();
            ctx.rotate(Math.PI/6);
            // ctx.moveTo(100,0); 
            // ctx.lineTo(120,0);
            // ctx.stroke();

            ctx.save();
            
            ctx.arc(50, 0, 70, 0, hours_sector_radian, false);
            ctx.lineTo(0, 0);
            ctx.rotate(-hours_sector_radian);
            ctx.fill();
            ctx.restore();
        }
        ctx.restore();

        // Minute marks
        ctx.save();
        ctx.lineWidth = 5;
        for (i=0;i<60;i++){
            if (i%5!=0) {
                ctx.beginPath();
                ctx.moveTo(117,0);
                ctx.lineTo(120,0);
                ctx.stroke();
            }
            ctx.rotate(Math.PI/30);
        }
        ctx.restore();

        var sec = now.getSeconds();
        var min = now.getMinutes();
        var hr  = now.getHours();
        hr = hr>=12 ? hr-12 : hr;

        ctx.fillStyle = "black";

        // write Hours
        ctx.save();
        ctx.rotate( hr*(Math.PI/6) + (Math.PI/360)*min + (Math.PI/21600)*sec )
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.moveTo(-20,0);
        ctx.lineTo(80,0);
        ctx.stroke();
        ctx.restore();

        // write Minutes
        ctx.save();
        ctx.rotate( (Math.PI/30)*min + (Math.PI/1800)*sec )
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(-28,0);
        ctx.lineTo(112,0);
        ctx.stroke();
        ctx.restore();

        // Write seconds
        ctx.save();
        ctx.rotate(sec * Math.PI/30);
        ctx.strokeStyle = "#D40000";
        ctx.fillStyle = "#D40000";
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(-30,0);
        ctx.lineTo(83,0);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0,0,10,0,Math.PI*2,true);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(95,0,10,0,Math.PI*2,true);
        ctx.stroke();
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.arc(0,0,3,0,Math.PI*2,true);
        ctx.fill();
        ctx.restore();

        ctx.beginPath();
        ctx.lineWidth = 14;
        ctx.strokeStyle = '#325FA2';
        ctx.arc(0,0,142,0,Math.PI*2,true);
        ctx.stroke();

        ctx.restore();
    }
    init();
}
to_load.push(clock);

// function Translate() {

//    function drawSpirograph(ctx, R, r, O) {
//        var x1 = R - O;
//        var y1 = 0;
//        var i = 1;
//        ctx.beginPath();
//        ctx.moveTo(x1, y1);
//        do {
//            if (i > 20000) break;
//            var x2 = (R + r) * Math.cos(i * Math.PI / 72) - (r + O) * Math.cos(((R + r) / r) * (i * Math.PI / 72))
//            var y2 = (R + r) * Math.sin(i * Math.PI / 72) - (r + O) * Math.sin(((R + r) / r) * (i * Math.PI / 72))
//            ctx.lineTo(x2, y2);
//            x1 = x2;
//            y1 = y2;
//            i++;
//        } while (x2 != R - O && y2 != 0);
//        ctx.stroke();
//    }
//    var canvas = addCanvas('translate-test'),
//        ctx = canvas.getContext("2d"),
//        j = Math.floor(Math.random() * 4), i = Math.floor(Math.random() * 4), count = 0;
//    ctx.fillRect(0, 0, 300, 150);
//
//    ctx.translate(150, 75);
//
//    function getColor() {
//        return Math.floor(Math.random() * 256);
//    }
//
//    setInterval(function () {
//
//        if (count >= 20) {
//            ctx.save();
//            ctx.fillStyle = '#000';
//            ctx.fillRect(-150, -75, 300, 150);
//            j = Math.floor(Math.random() * 4);
//            i = Math.floor(Math.random() * 4);
//            ctx.restore();
//            count = 0;
//        }
//
//        ctx.save();
//
//        ctx.strokeStyle = "rgb(" +  getColor() + ", " + getColor() + ", " + getColor() + ")" ;
//        var radius_1 = 20 * (j + 2) / (j + 1);
//        var radius_2 = -8 * (i + 3) / (i + 1);
//        if (j > -1  && i > -1) {
//            drawSpirograph(ctx, radius_1, radius_2, 10);
//        }
//        i -= Math.random();
//        j -= Math.random();
//        ctx.restore();
//        count += 1;
//    }, 50);
//}
//to_load.push(Translate);
//
//function Rotate() {
//    function heart(y, ctx) {
//        var x0 = -7,
//            y0 = y * 12.5,
//            k = 0.09;
//        ctx.moveTo(75*k + x0, 40*k + y0);
//        ctx.bezierCurveTo(75*k + x0, 37*k + y0, 70*k + x0, 25*k + y0, 50*k + x0, 25*k + y0);
//        ctx.bezierCurveTo(20*k + x0, 25*k + y0, 20*k + x0, 55*k + y0, 20*k + x0, 62.5*k + y0);
//        ctx.bezierCurveTo(20*k + x0, 80*k + y0, 40*k + x0, 102*k + y0, 75*k + x0, 120*k + y0);
//        ctx.bezierCurveTo(110*k + x0, 102*k + y0, 130*k + x0, 80*k + y0, 130*k + x0, 62.5*k + y0);
//        ctx.bezierCurveTo(130*k + x0, 62.5*k + y0, 130*k + x0, 25*k + y0, 100*k + x0, 25*k + y0);
//        ctx.bezierCurveTo(85*k + x0, 25*k + y0, 75*k + x0, 37*k + y0, 75*k + x0, 40*k + y0);
//
//        ctx.fill();
//        ctx.save();
//    }
//    function circle(y, ctx) {
//        ctx.arc(0, y * 12.5, 5, 0, Math.PI * 2, true);// seems it draws circled to the bottom
//        ctx.fill();
//    }
//    function square(y, ctx) {
//        ctx.fillRect(-5, y * 12.5, 10, 10);
//    }
//    function draw(geometricObject, ctx) {
//        for (var i = 1; i < 6; i++) { // Loop through rings (from inside to out)
//            ctx.save();
//            ctx.fillStyle = 'rgb(' + (51 * i) + ',' + (255 - 51 * i) + ',255)';
//
//            // i * 6 - calculate an amount of next circles
//            for (var j = 0; j < i * 6; j++) { // draw individual dots
//                ctx.rotate(Math.PI * 2 / (i * 6));// calculate an angle, changes an angle each iteration
//                ctx.beginPath();
//                geometricObject(i, ctx);
//            }
//            ctx.restore();
//        }
//    }
//    var ctx = addCanvas('rotate-test').getContext('2d');
//    ctx.translate(75, 75);
//    draw(circle, ctx);
//
//    ctx.translate(150, 0);// offset depends on previous 'translate'
//
//    ctx.scale(0.75,0.75);
//    var scale = 0.9,
//        old_scale,
//        k = 0.01;
//
//    setInterval(function () {
//
//        if (scale == 1 || scale == 0.3) {
//            // switcher
//            // keeps scale between 1 and 0.3
//            k *= -1;
//        }
//        old_scale = scale;
//        scale = ((scale * 100 + k * 100) / 100).toFixed(2);// this is needed to prevent float like (0.70000000000001) err
//
//        var scale_proportion = scale / old_scale;
//        ctx.fillStyle = "#fff";
//        ctx.fill();
//        ctx.rotate(Math.PI * 2 / 360);
//        ctx.scale(scale_proportion, scale_proportion);
//        draw(heart, ctx);
//        ctx.arc(0, 0, 75, 0, Math.PI * 2, true);
//    },100);
//}
//to_load.push(Rotate);
//
//function Transform() {
//    function draw(ctx) {
//        var sin = Math.sin(Math.PI/6);
//        var cos = Math.cos(Math.PI/6);
//        ctx.translate(100, 100);
//        var c = 0;
//        for (var i=0; i <= 12; i++) {
//            c = Math.floor(255 / 12 * i);
//            ctx.fillStyle = "rgb(" + c + "," + c + "," + c + ")";
//            ctx.fillRect(0, 0, 100, 10);
//            ctx.transform(cos, sin, -sin, cos, 0, 0);
//        }
//
////        ctx.setTransform(1, 0, 0, -1, 100, 100);// moves coordinate system to I quoter
////        ctx.setTransform(-1, 0, 0, -1, 100, 100);// moves coordinate system to II quoter
////        ctx.setTransform(-1, 0, 0, 1, 100, 100);// moves coordinate system to III quoter
//        ctx.setTransform(1, 0, 0, 1, 100, 100);// moves coordinate system to IV quoter
//        ctx.fillStyle = "red";
//        ctx.arc(0, 0, 4, 0, Math.PI * 2, true);
//        ctx.fill();
//        ctx.fillStyle = "rgba(255, 128, 255, 0.5)";
//        ctx.fillRect(0, 0, 100, 100);
//    }
//    var canvas = addCanvas('rotate-test');
//    canvas.height = 300;
//    canvas.style.height = 300;
//    var ctx = canvas.getContext('2d');
//    draw(ctx);
//}
//to_load.push(Transform);
//
//function composite() {
//    function draw(ctx) {
//        ctx.globalCompositeOperation = 'lighter';
//        ctx.beginPath();
//        ctx.fillStyle = "red";
////        ctx.strokeStyle = "#000";
////        ctx.lineWidth = 5;
//        ctx.arc(75, 75, 50, 0, Math.PI * 2, false);
//        ctx.fill();
////        ctx.stroke();
//        ctx.beginPath();
//        ctx.fillStyle = "green";
////        ctx.strokeStyle = "brown";
////        ctx.lineWidth = 5;
//        ctx.arc(125, 75, 50, 0, Math.PI * 2, false);
//        ctx.fill();
//
//        ctx.beginPath();
//        ctx.fillStyle = "blue";
//        ctx.arc(100, 25, 20, 0, Math.PI * 2, false);
//        ctx.fill();
//
//        ctx.beginPath();
//        ctx.fillStyle = "magenta";// seems 'magenta' is very close to red and orange this effect appears
//        ctx.arc(100, 125, 20, 0, Math.PI * 2, false);
//        ctx.fill();
////        ctx.stroke();
//    }
//    var ctx = addCanvas('composite-test').getContext('2d');
//    draw(ctx);
//}
//to_load.push(composite);
//
//function composite2() {
//    var canvas1 = document.createElement("canvas");
//    var canvas2 = document.createElement("canvas");
//    var gco = [ 'source-over','source-in','source-out','source-atop','destination-over','destination-in','destination-out','destination-atop','lighter','darker','copy','xor' ].reverse();
//    var width = 320;
//    var height = 340;
//
//    var lightMix = function() {
//        // draws 3 color filled circles
//        var ctx = canvas2.getContext("2d");
//        ctx.save();
//        ctx.globalCompositeOperation = "lighter";
//        ctx.beginPath();
//        ctx.fillStyle = "rgba(255,0,0,1)";
//        ctx.arc(100, 200, 100, Math.PI*2, 0, false);
//        ctx.fill()
//        ctx.beginPath();
//        ctx.fillStyle = "rgba(0,0,255,1)";
//        ctx.arc(220, 200, 100, Math.PI*2, 0, false);
//        ctx.fill()
//        ctx.beginPath();
//        ctx.fillStyle = "rgba(0,255,0,1)";
//        ctx.arc(160, 100, 100, Math.PI*2, 0, false);
//        ctx.fill();
//        ctx.restore();
//        ctx.beginPath();
//        ctx.fillStyle = "#f00";
//        ctx.fillRect(0,0,30,30)
//        ctx.fill();
//    };
//
//    var colorSphere = function(element) {
//        // draws gradient filled circle
//        var ctx = canvas1.getContext("2d");
//        var width = 360;
//        var halfWidth = width / 2;
//        var rotate = (1 / 360) * Math.PI * 2; // per degree
//        var offset = 0; // scrollbar offset
//        var oleft = -20;
//        var otop = -20;
//        for (var n = 0; n <= 359; n ++) {
//            var gradient = ctx.createLinearGradient(oleft + halfWidth, otop, oleft + halfWidth, otop + halfWidth);
//            var color = Color.HSV_RGB({ H: (n + 300) % 360, S: 100, V: 100 });
//            // create black from transparent
//            gradient.addColorStop(0, "rgba(0,0,0,0)");
//            // generated colour which seems like to be with different lighting, but
//            // it's just effect of previous and next colour stops
//            gradient.addColorStop(0.7, "rgba("+color.R+","+color.G+","+color.B+",1)");
//            // create white from not transparent
//            gradient.addColorStop(1, "rgba(255,255,255,1)");
//
//            // very important to init new path to separate sectors
//            ctx.beginPath();
//
//            // draws a secror
//            ctx.moveTo(oleft + halfWidth, otop);
//            ctx.lineTo(oleft + halfWidth, otop + halfWidth);
//            ctx.lineTo(oleft + halfWidth + 6, otop);
//            ctx.fillStyle = gradient;
//            ctx.fill();
//            // --
//
//            // puts coord system in the center
//            ctx.translate(oleft + halfWidth, otop + halfWidth);
//            // does turn
//            ctx.rotate(rotate);
//            // puts coord system to prev position
//            ctx.translate(-(oleft + halfWidth), -(otop + halfWidth));
//        }
//        ctx.beginPath();
//        ctx.fillStyle = "#00f";
//        ctx.fillRect(15,15,30,30)
//        ctx.fill();
//        return ctx.canvas;
//    };
//
//    var Color = {};
//    Color.HSV_RGB = function (o) {
//        var H = o.H / 360,
//            S = o.S / 100,
//            V = o.V / 100,
//            R, G, B;
//        var A, B, C, D;
//        if (S == 0) {
//            R = G = B = Math.round(V * 255);
//        } else {
//            if (H >= 1) H = 0;
//            H = 6 * H;
//            D = H - Math.floor(H);
//            A = Math.round(255 * V * (1 - S));
//            B = Math.round(255 * V * (1 - (S * D)));
//            C = Math.round(255 * V * (1 - (S * (1 - D))));
//            V = Math.round(255 * V);
//            switch (Math.floor(H)) {
//                case 0:
//                    R = V;
//                    G = C;
//                    B = A;
//                    break;
//                case 1:
//                    R = B;
//                    G = V;
//                    B = A;
//                    break;
//                case 2:
//                    R = A;
//                    G = V;
//                    B = C;
//                    break;
//                case 3:
//                    R = A;
//                    G = B;
//                    B = V;
//                    break;
//                case 4:
//                    R = C;
//                    G = A;
//                    B = V;
//                    break;
//                case 5:
//                    R = V;
//                    G = A;
//                    B = B;
//                    break;
//            }
//        }
//        return {
//            R: R,
//            G: G,
//            B: B
//        };
//    };
//
//    var createInterlace = function (size, color1, color2) {
//        // creates squares background
//        var proto = document.createElement("canvas").getContext("2d");
//        proto.canvas.width = size * 2;
//        proto.canvas.height = size * 2;
//        proto.fillStyle = color1; // top-left
//        proto.fillRect(0, 0, size, size);
//        proto.fillStyle = color2; // top-right
//        proto.fillRect(size, 0, size, size);
//        proto.fillStyle = color2; // bottom-left
//        proto.fillRect(0, size, size, size);
//        proto.fillStyle = color1; // bottom-right
//        proto.fillRect(size, size, size, size);
//        var pattern = proto.createPattern(proto.canvas, "repeat");
//        pattern.data = proto.canvas.toDataURL();
//        return pattern;
//    };
//
//    var op_8x8 = createInterlace(8, "#FFF", "#eee");
//
//    function runComposite() {
//        while(gco.length) {
//            if((gco.length) % 4 == 0) {
//                document.body.appendChild(document.createElement("br"))
//            }
//            var canvas = document.createElement("canvas");
//            canvas.style.background = "url("+op_8x8.data+")";// background cubes
//            canvas.style.border = "1px solid #000";
//            canvas.style.margin = "10px";
//            canvas.width = width/2;
//            canvas.height = height/2;
//            var ctx = canvas.getContext('2d');
//            ctx.clearRect(0, 0, width, height)
//            ctx.save();
//
//            // colourful circle gradient
//            ctx.drawImage(canvas1, 0, 0, width/2, height/2);
//            var pop = ctx.globalCompositeOperation = gco.pop();
//            // circles
//            ctx.drawImage(canvas2, 0, 0, width/2, height/2);
//            // restore system default
//            ctx.globalCompositeOperation = "source-over";
//
//            // creates a description text
//            ctx.fillStyle = "rgba(0,0,0,0.8)";
//            ctx.fillRect(0, height/2 - 20, width/2, 20);
//            ctx.fillStyle = "#FFF";
//            ctx.font = "14px arial";
//            ctx.fillText(pop, 5, height/2 - 5);
//            // --
//            ctx.restore();
//            document.body.appendChild(canvas);
//        }
//    };
//
//    function init() {
//        // lum in sRGB
//        var lum = {
//            r: 0.33,
//            g: 0.33,
//            b: 0.33
//        };
//        // resize canvas
//        canvas1.width = width;
//        canvas1.style.height = width;
//        canvas1.height = height;
//
//        canvas2.width = width;
//        canvas2.height = height;
//        canvas2.style.height = height;
//
//        lightMix();
//        colorSphere();
//        runComposite();
//        return;
//    };
//
//    init();
//}
//to_load.push(composite2);
//
//var clipping = function () {
//    function draw() {
//        var ctx = addCanvas('clipping-test').getContext('2d');
//        ctx.fillRect(0,0,150,150);
//        ctx.translate(75,75);
//
//        // Create a circular clipping path
//        ctx.beginPath();
//        ctx.arc(0,0,60,0,Math.PI*2,true);
//        ctx.clip();
//
//        // draw background
//        var lingrad = ctx.createLinearGradient(0,-75,0,75);
//        lingrad.addColorStop(0, '#232256');
//        lingrad.addColorStop(1, '#143778');
//
//        ctx.fillStyle = lingrad;
//        // fill rectangle but it is limited bt circle clip
//        ctx.fillRect(-75,-75,150,150);
//
//        // draw stars
//        for (var j=1;j<50;j++){
//            ctx.save();
//            ctx.fillStyle = '#fff';
//            // random coords for a star
//            ctx.translate(75-Math.floor(Math.random()*150),
//                75-Math.floor(Math.random()*150));
//            drawStar(ctx, Math.floor(Math.random()*4)+2);
//            ctx.restore();
//        }
//
//    }
//
//    function drawStar(ctx,r){
//        ctx.save();
//        ctx.beginPath()
//        ctx.moveTo(r,0);
//        for (var i=0;i<9;i++){
//            ctx.rotate(Math.PI/5);
//            if(i%2 == 0) {
//                ctx.lineTo((r/0.525731)*0.200811,0);
//            } else {
//                ctx.lineTo(r,0);
//            }
//        }
//        ctx.closePath();
//        ctx.fill();
//        ctx.restore();
//    }
//
//    draw();
//};
//to_load.push(clipping);
//
//var solar = function () {
//    var sun = new Image(),
//    moon = new Image(),
//    earth = new Image(),
//    canvas = addCanvas('clipping-test'),
//    ctx = canvas.getContext('2d');
//
//    function init(){
//        canvas.height = 300;
//        canvas.style.height = 300;
//        sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
//        moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
//        earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
//        setInterval(draw,100);
//    }
//
//    function draw() {
//        //var ctx = document.getElementById('canvas').getContext('2d');
//
//        ctx.globalCompositeOperation = 'destination-over';
//        ctx.clearRect(0,0,300,300); // clear canvas
//
//        ctx.fillStyle = 'rgba(0,0,0,0.4)';
//        ctx.strokeStyle = 'rgba(0,153,255,0.4)';
//        ctx.save();
//        ctx.translate(150,150);// move system to the center
//
//        // Earth
//        var time = new Date();
//        ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
//        ctx.translate(105,0); // move system on the orbit radius of earth
//        ctx.fillRect(0,-12,50,24); // earth Shadow
//        ctx.drawImage(earth,-12, -12); // offset an Earth to fit the shadow
//
//        // Moon
//        ctx.save();
//        ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
//        ctx.translate(0,30);// offset for coord system depending on prev 'translate'
//        ctx.drawImage(moon, -3.5, -3.5);// offset for the moon
//        ctx.restore();
//
//        ctx.restore();
//
//        ctx.beginPath();
//        ctx.arc(150,150,105,0,Math.PI*2,false); // Earth orbit
//        ctx.stroke();
//
//        ctx.drawImage(sun,0,0,300,300);
//    }
//
//    init();
//};
//to_load.push(solar);


