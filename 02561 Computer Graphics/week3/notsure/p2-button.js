
var verticesData = [];
var canvas_colors = [];
var point_colors = [];
var canvas;
var canvas_menu;
var point_menu;
var triangle_menu;
var canvasIndex = 0;
var pointIndex = 0;
var triangleIndex = 0;
var gl;

var draw_points_on = false;
var draw_triangle_on = false;



window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    canvas_menu = document.getElementById("canvas_color_menu");
    point_menu = document.getElementById("point_color_menu");
    triangle_menu = document.getElementById("triangle_color_menu");


    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    canvas_menu.addEventListener("click", function() { canvasIndex = canvas_menu.selectedIndex; });
    point_menu.addEventListener("click", function() { pointIndex = point_menu.selectedIndex; });
    triangle_menu.addEventListener("click", function() { triangleIndex = triangle_menu.selectedIndex; });

    canvas_colors = [
      vec4(0.3921, 0.5843, 0.9294, 1.0), // default
      vec4(0.0, 0.0, 0.0, 1.0), // black
      vec4(1.0, 0.0, 0.0, 1.0), // red
      vec4(1.0, 1.0, 0.0, 1.0), // yellow
      vec4(0.0, 1.0, 0.0, 1.0), // green
      vec4(0.0, 0.0, 1.0, 1.0), // blue
      vec4(1.0, 0.0, 1.0, 1.0), // magenta
      vec4(0.0, 1.0, 1.0, 1.0) // cyan
    ];

    point_colors = [
      vec4(0.0, 0.0, 0.0, 1.0), // black
      vec4(1.0, 0.0, 0.0, 1.0), // red
      vec4(0.0, 1.0, 0.0, 1.0), // green
      vec4(0.0, 0.0, 1.0, 1.0), // blue
    ];

    triangle_colors = [
      vec4(0.0, 0.0, 0.0, 1.0), // black
      vec4(1.0, 0.0, 0.0, 1.0), // red
      vec4(0.0, 1.0, 0.0, 1.0), // green
      vec4(0.0, 0.0, 1.0, 1.0), // blue
    ];

    // Load the data into the GPU

    // Associate out shader variables with our data buffer
    var aPosition = gl.getAttribLocation( program, "aPosition" );

    var aColors = gl.getAttribLocation( program, "aColors" );

    // Register function (event handler) to be called on a mouse press

    canvas.onmousedown = function(ev){ click(ev, gl, canvas, aPosition,aColors); };


    render();
    draw();
    pass(aPosition,aColors);
}

function draw()
{
    verticesData = [
      // X,Y  R,G,B
      0.0,0.0,  1.0,0.0,0.0,
      1.0,0.0,  0.0,1.0,0.0,
      1.0,1.0,  0.0,0.0,1.0
    ];
}

function click(ev, gl, canvas, aPosition, aColors) {
  if (draw_points_on && !draw_triangle_on)
  {
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    var rect = ev.target.getBoundingClientRect() ;

    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
    // Store the coordinates to g_points array
    verticesData.push(x);
    verticesData.push(y);

    verticesData.push(point_colors[pointIndex][0]);
    verticesData.push(point_colors[pointIndex][1]);
    verticesData.push(point_colors[pointIndex][2]);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    pass(aPosition,aColors);
  }
  if (draw_triangle_on && !draw_points_on)
  {
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    var rect = ev.target.getBoundingClientRect() ;

    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
    // Store the coordinates to g_points array
    verticesData.push(x);
    verticesData.push(y);

    verticesData.push(triangle_colors[triangleIndex][0]);
    verticesData.push(triangle_colors[triangleIndex][1]);
    verticesData.push(triangle_colors[triangleIndex][2]);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    pass(aPosition,aColors);
  }
}

function pass(aPosition,aColors)
{
  var len = verticesData.length;
  for(var i = 0; i < len; i += 5) { //0,1 - 2,3 - 4,5    0,1-5,6-10,11
    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(aPosition, verticesData[i], verticesData[i+1], 0.0);
    gl.vertexAttrib3f(aColors,verticesData[i+2],verticesData[i+3],verticesData[i+4]);
    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);

  }


}

function draw_points()
{
  if (draw_points_on) {
    draw_points_on = false;
  } else {
    draw_points_on = true;
  }
}

function draw_triangle()
{
  if (draw_triangle_on) {
    draw_triangle_on = false;
  } else {
    draw_triangle_on = true;
  }
}

function render()
{
    verticesData = [];
    gl.viewport( 0.0, 0.0, canvas.width, canvas.height );
    gl.clearColor(canvas_colors[canvasIndex][0], canvas_colors[canvasIndex][1],
      canvas_colors[canvasIndex][2], 1.0);
    gl.clear( gl.COLOR_BUFFER_BIT );
    //gl.drawArrays( gl.POINTS, 0, verticesData.length/ATTRIBUTES);
    //gl.drawArrays( gl.TRIANGLE_FAN, 0, verticesData.length/ATTRIBUTES );
}
