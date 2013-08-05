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
  var canvas = addCanvas('translate-test');
  canvas.height = 300;
  canvas.style.height = 300;
  var ctx = canvas.getContext("2d");

  ctx.fillRect(0, 0, 300, 300);
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      ctx.save();
      var x = 50 + j * 100;
      var y = 50 + i * 100;
      ctx.strokeStyle = "rgb(" +  250 + ", " + x + ", " + y + ")" ;
      ctx.translate(x, y);
      var radius_1 = 20 * (j + 2) / (j + 1);
      var radius_2 = -8 * (i + 3) / (i + 1);
      drawSpirograph(ctx, radius_1, radius_2, 10);
      ctx.restore();
    }
  }
}
to_load.push(Translate);

function Save_and_Restore() {
  var ctx = addCanvas('save-and-restore').getContext("2d");
  ctx.fillRect(0, 0, 150, 150); // Draw a rectangle with default settings , black
  // black
  ctx.save(); // Save the default state

  ctx.fillStyle = 'green' // Make changes to the settings
  ctx.fillRect(15, 15, 120, 120); // Draw a rectangle with new settings

  ctx.save(); // Save the current state
  ctx.fillStyle = '#FFF' // Make changes to the settings
  ctx.globalAlpha = 0.5;
  ctx.fillRect(30, 30, 90, 90); // Draw a rectangle with new settings

  ctx.restore(); // Restore previous state
  ctx.fillRect(45, 45, 60, 60); // Draw a rectangle with restored settings

  ctx.restore(); // Restore very first state
  ctx.fillRect(60, 60, 30, 30); // black
}
to_load.push(Save_and_Restore)

function Gradients() {
  var ctx = addCanvas('gradients').getContext("2d");
  // Create gradients
  var lingrad = ctx.createLinearGradient(0, 0, 150, 150);
  lingrad.addColorStop(0, 'red');
  lingrad.addColorStop(0.25, '#fff');
  lingrad.addColorStop(0.75, 'green');
  lingrad.addColorStop(1, '#fff');

  var lingrad2 = ctx.createLinearGradient(0, 50, 0, 95);
  lingrad2.addColorStop(0.3, 'blue');
  lingrad2.addColorStop(1, 'rgba(0,0,0,0)');// transparent

  // assign gradients to fill and stroke styles
  ctx.fillStyle = lingrad;
  ctx.strokeStyle = lingrad2;

  // draw shapes
  ctx.fillRect(10, 10, 130, 130);
  ctx.strokeRect(50, 50, 50, 50);

  // RADIAL

  var offset = 150;
  // green
  var radgrad = ctx.createRadialGradient(45 + offset, 45, 10, 35 + offset, 50, 40);
  radgrad.addColorStop(0, '#A7D30C');
  radgrad.addColorStop(0.9, '#019F62');
  radgrad.addColorStop(1, 'rgba(0,0,0,0)');//transpagent
  // pink 
  var radgrad2 = ctx.createRadialGradient(100 + offset, 105, 20, 112 + offset, 120, 50);
  radgrad2.addColorStop(0, '#FF5F98');
  radgrad2.addColorStop(0.75, '#FF0188');
  radgrad2.addColorStop(1, 'rgba(255,1,136,0)');
  // blue
  var radgrad3 = ctx.createRadialGradient(95 + offset, 15, 15, 102 + offset, 20, 40);
  radgrad3.addColorStop(0, '#00C9FF');
  radgrad3.addColorStop(0.8, '#00B5E2');
  radgrad3.addColorStop(1, 'rgba(0,201,255,0)');
  // yellow
  var radgrad4 = ctx.createRadialGradient(0 + offset, 150, 50, 0 + offset, 140, 90);
  radgrad4.addColorStop(0, '#F4F201');
  radgrad4.addColorStop(0.8, '#E4C700');
  radgrad4.addColorStop(1, 'rgba(228,199,0,0.2)');// yellow background

  // draw shapes
  ctx.fillStyle = radgrad4;// yellow
  ctx.fillRect(0 + offset, 0, 150 + offset, 150);
  ctx.fillStyle = radgrad3;// blue
  ctx.fillRect(0 + offset, 0, 150 + offset, 150);
  ctx.fillStyle = radgrad2;// pink
  ctx.fillRect(0 + offset, 0, 150 + offset, 150);
  ctx.fillStyle = radgrad; // green
  ctx.fillRect(0 + offset, 0, 150 + offset, 150);
}
to_load.push(Gradients)

function Lines() {
  var ctx = addCanvas('lines-shadow-pattern-texts').getContext("2d");

  function drawLines() {
    var lineJoin = ['round', 'bevel', 'miter'];
    var colors = ['red', 'blue', 'green'];
    var offset = 50;
    ctx.lineWidth = 10;
    for (var i = 0; i < lineJoin.length; i++) {
      ctx.lineCap = 'round'; //'butt','round','square'
      ctx.lineJoin = lineJoin[i];
      ctx.strokeStyle = colors[i];
      ctx.beginPath();
      ctx.moveTo(5 + offset, 15 + i * 40);
      ctx.lineTo(40 + offset, 55 + i * 40);
      ctx.lineTo(80 + offset, 15 + i * 40);
      ctx.lineTo(120 + offset, 55 + i * 40);
      ctx.lineTo(160 + offset, 15 + i * 40);

      // SHADOW
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(100, 0, 100, 0.9)";
      ctx.stroke();
    }
  }

  // Patterns

  var img = new Image();
  img.src = 'https://developer.mozilla.org/files/222/Canvas_createpattern.png';
  img.onload = function() {
    // create pattern
    var ptrn = ctx.createPattern(img, 'repeat'); // repeat, repeat-x, repeat-y, no-repeat
    ctx.fillStyle = ptrn;
    ctx.fillRect(5, 5, 290, 140);
    drawLines();

    // TEXTS

    ctx.beginPath();
    ctx.rotate(-Math.PI / 2)
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 5;
    ctx.shadowColor = "rgba(50, 100, 500, 1)";
    ctx.font = "20px Times New Roman";
    ctx.fillStyle = "Blue";
    ctx.fillText("Sample String", -135, 280);
    ctx.stroke();
  }

}
to_load.push(Lines)

function Alpha() {
  var ctx = addCanvas('test-alpha').getContext("2d");
  // left side squares
  ctx.fillStyle = '#FD0';
  ctx.fillRect(0, 0, 75, 75);
  ctx.fillStyle = '#6C0';
  ctx.fillRect(75, 0, 75, 75);
  ctx.fillStyle = '#09F';
  ctx.fillRect(0, 75, 75, 75);
  ctx.fillStyle = '#F30';
  ctx.fillRect(75, 75, 75, 75);
  ctx.fillStyle = '#FFF';

  // set transparency value
  ctx.globalAlpha = 0.2;

  // Draw semi transparent circles
  for (i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
    ctx.fill();
  }

  ctx.globalAlpha = 1.0;
  // Draw background
  // right side squares
  ctx.fillStyle = 'rgb(255,221,0)';
  ctx.fillRect(151, 0, 300, 37.5);
  ctx.fillStyle = 'rgb(102,204,0)';
  ctx.fillRect(151, 37.5, 300, 37.5);
  ctx.fillStyle = 'rgb(0,153,255)';
  ctx.fillRect(151, 75, 300, 37.5);
  ctx.fillStyle = 'rgb(255,51,0)';
  ctx.fillRect(151, 112.5, 300, 37.5);

  // Draw semi transparent rectangles
  for (var i = 0; i < 10; i++) {
    ctx.fillStyle = 'rgba(255,255,255,' + (i + 1) / 10 + ')';// white + alpha
    for (var j = 0; j < 4; j++) {
      ctx.fillRect(156 + i * 14, 5 + j * 37.5, 14, 27.5)
    }
  }
}
to_load.push(Alpha)

function ColorsCircles() {
  var ctx = addCanvas('color-circles').getContext("2d");
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
      ctx.strokeStyle = 'rgb(0,' + Math.floor(255 - 42.5 * i) + ',' + Math.floor(255 - 42.5 * j) + ')';
      ctx.fillStyle = 'rgba(' + Math.floor(255 - 42.5 * i) + ',' + Math.floor(255 - 42.5 * j) + ',0, 0.4)';
      ctx.beginPath();
      ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.stroke();
    }
  }
}
to_load.push(ColorsCircles)

function Squares() {
  var canvas = addCanvas('squares');
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(10, 10, 110, 110);
    ctx.fillStyle = "rgba(0, 0, 200, 0.4)";
    ctx.fillRect(30, 30, 55, 50);

    ctx.fillRect(25 + 150, 25, 100, 100);
    ctx.clearRect(45 + 150, 45, 60, 60);
    ctx.strokeRect(50 + 150, 50, 50, 50);
  }
}
to_load.push(Squares)

function Triangles() {
  // two triangles
  var ctx = addCanvas('triangles').getContext('2d');
  // Filled triangle
  ctx.beginPath();
  ctx.moveTo(25, 25);
  ctx.lineTo(105, 25);
  ctx.lineTo(25, 105);
  ctx.fill();

  // Stroked triangle
  ctx.beginPath();
  ctx.moveTo(125, 125);
  ctx.lineTo(125, 45);
  ctx.lineTo(45, 125);
  ctx.closePath();
  ctx.stroke();
}
to_load.push(Triangles)

function Circles() {
  var ctx = addCanvas('play-with-circles').getContext('2d');
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 4; j++) {
      ctx.beginPath();
      var x = 25 + j * 50; // x coordinate
      var y = 25 + i * 50; // y coordinate
      var radius = 20; // Arc radius
      var startAngle = 0; // Starting point on circle
      var endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
      var anticlockwise = i % 2 == 0 ? false : true; // clockwise or anticlockwise

      ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

      if ((i + j) % 2 == 0) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }
  }
}
to_load.push(Circles)

function Quadratic() {
  var ctx = addCanvas('curves').getContext('2d');
  ctx.beginPath();
  ctx.moveTo(75, 25);
  ctx.quadraticCurveTo(25, 25, 25, 62.5);
  ctx.quadraticCurveTo(25, 100, 50, 100);
  ctx.quadraticCurveTo(50, 120, 30, 125);
  ctx.quadraticCurveTo(60, 120, 65, 100);
  ctx.quadraticCurveTo(125, 100, 125, 62.5);
  ctx.quadraticCurveTo(125, 25, 75, 25);
  ctx.stroke();

  var offset = 150;
  ctx.beginPath();
  ctx.moveTo(75 + offset, 40);
  ctx.bezierCurveTo(75 + offset, 37, 70 + offset, 25, 50 + offset, 25);
  ctx.bezierCurveTo(20 + offset, 25, 20 + offset, 62.5, 20 + offset, 62.5);
  ctx.bezierCurveTo(20 + offset, 80, 40 + offset, 102, 75 + offset, 120);
  ctx.bezierCurveTo(110 + offset, 102, 130 + offset, 80, 130 + offset, 62.5);
  ctx.bezierCurveTo(130 + offset, 62.5, 130 + offset, 25, 100 + offset, 25);
  ctx.bezierCurveTo(85 + offset, 25, 75 + offset, 37, 75 + offset, 40);
  ctx.fill();
}
to_load.push(Quadratic)

function Pac() {

  function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
    ctx.lineTo(x + width - radius, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    ctx.lineTo(x + width, y + radius);
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.quadraticCurveTo(x, y, x, y + radius);
    ctx.stroke();
  }

  var ctx = addCanvas('pac-man').getContext('2d');
  roundedRect(ctx, 12, 12, 150, 150, 15);
  roundedRect(ctx, 19, 19, 150, 150, 9);
  roundedRect(ctx, 53, 53, 49, 33, 10);
  roundedRect(ctx, 53, 119, 49, 16, 6);
  roundedRect(ctx, 135, 53, 49, 33, 10);
  roundedRect(ctx, 135, 119, 25, 49, 10);

  ctx.beginPath();
  ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
  ctx.lineTo(31, 37);
  ctx.fill();
  for (var i = 0; i < 8; i++) {
    ctx.fillRect(51 + i * 16, 35, 4, 4);
  }
  for (i = 0; i < 6; i++) {
    ctx.fillRect(115, 51 + i * 16, 4, 4);
  }
  for (i = 0; i < 8; i++) {
    ctx.fillRect(51 + i * 16, 99, 4, 4);
  }
  ctx.beginPath();
  ctx.moveTo(83, 116);
  ctx.lineTo(83, 102);
  ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
  ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
  ctx.lineTo(111, 116);
  ctx.lineTo(106.333, 111.333);
  ctx.lineTo(101.666, 116);
  ctx.lineTo(97, 111.333);
  ctx.lineTo(92.333, 116);
  ctx.lineTo(87.666, 111.333);
  ctx.lineTo(83, 116);
  ctx.fill();
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(91, 96);
  ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
  ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
  ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
  ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
  ctx.moveTo(103, 96);
  ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
  ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
  ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
  ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
  ctx.fill();
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
  ctx.fill();
}



to_load.push(Pac)

function ImageDraw() {
  var ctx = addCanvas('play-images').getContext('2d');
  var img = new Image();

  img.onload = function() {
    for (var i = 0; i < 2; i++) {
      for (var j = 0; j < 5; j++) {
        if ((i + j) % 2 == 0) {
          ctx.drawImage(img, j * 62, i * 71, 62, 71);
        } else {
          ctx.drawImage(img, 10, 10, 30, 30, j * 62, i * 71, 30, 30);
        }
      }
    }
  }
  img.src = 'https://developer.cdn.mozilla.net/media/img/mdn-logo-sm.png';
}
to_load.push(ImageDraw);

function ImageDrawRhino() {
  var ctx = addCanvas('create-picture').getContext('2d');
  var img_1 = new Image();
  var img_2 = new Image();

  img_1.onload = function() {
    ctx.drawImage(img_1, 33, 71, 104, 124, 60, 20, 87, 104);
  }
  img_2.onload = function() {
    ctx.drawImage(img_2, 40, 0);
  }
  img_1.src = 'https://developer.mozilla.org/files/4533/rhino.jpg';
  img_2.src = 'https://developer.mozilla.org/files/242/Canvas_picture_frame.png';

}
to_load.push(ImageDrawRhino);
