var begin_minv = -2.5;
var begin_maxv = 2.5;

var move_speed = 0.01;
var zoom_factor = 0.01;

var min_x = begin_minv;
var max_x = begin_maxv;

var min_y = begin_minv;
var max_y = begin_maxv;

function zm_interface() {
  x_delta = (max_x - min_x);
  y_delta = (max_y - min_y);
  if (keyIsDown(RIGHT_ARROW)) {
    max_x += move_speed * x_delta;
    min_x += move_speed * x_delta;
  } 
  if (keyIsDown(LEFT_ARROW)) {
      max_x -= move_speed * x_delta;
      min_x -= move_speed * x_delta;
    }
  if (keyIsDown(UP_ARROW)) {
      max_y -= move_speed * y_delta;
      min_y -= move_speed * y_delta;
    }
  if (keyIsDown(DOWN_ARROW)) {
      max_y += move_speed * y_delta;
      min_y += move_speed * y_delta;
    }
  if (keyIsDown(ENTER)) {
      min_x = min_x + ( x_delta * zoom_factor);
      max_x = max_x - ( x_delta * zoom_factor);
      min_y = min_y + ( y_delta * zoom_factor);
      max_y = max_y - ( y_delta * zoom_factor);
    }
}


function setup()  {
  createCanvas(500, 500);
  pixelDensity(1);
  frameRate(25);
}



function draw()  {
  zm_interface();
  loadPixels();

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++)  {
      _x = map(x, 0, width, min_x, max_x);
      _y = map(y, 0, height, min_y, max_y);

      var zx = _x;
      var zy = _y;

      var iter = 0;
      var max_iter = 64;

      // drawing part
      while( zx*zx + zy*zy < 4 && iter < max_iter)  {
        var xtemp = zx*zx - zy*zy + _x;
        zy = abs(2*zx*zy) + _y;
        zx = xtemp;
        iter += 1
      } 
      
      var bright = 0;
      var col_r = 0;
      var col_g = 0;
      var col_b = 0;
      if( iter === max_iter ) {
        col_r = map(zx*zx + zy*zy, 0, 4, 0, 255);
        col_g = map(zx*zx - zy*zy, -4, 4, 0, 255);
        col_b = map(iter, 0, 100, 0, 255);
      }


      var pix = (x + y*width)*4;
      pixels[pix + 0] = col_r;
      pixels[pix + 1] = col_g;
      pixels[pix + 2] = col_b;
      pixels[pix + 3] = 255;
    }

    updatePixels();
  }
}