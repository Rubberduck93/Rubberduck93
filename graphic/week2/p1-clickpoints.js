var xCenterOfCircle;
var yCenterOfCircle;
var centerOfCircle;
var radiusOfCircle = 0.5;
var ATTRIBUTES = 2;
var noOfFans = 360;
var anglePerFan;
var verticesData = [];
var pointerData = [];
var canvas;
var gl;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0.0, 0.0, canvas.width, canvas.height );
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    //var bufferId = gl.createBuffer();
    //gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    //gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(verticesData), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var aPosition = gl.getAttribLocation( program, "aPosition" );
    //gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );
    //gl.enableVertexAttribArray( aPosition );

    // Register function (event handler) to be called on a mouse press
    canvas.onmousedown = function(ev){ click(ev, gl, canvas, aPosition); };

    render();
    draw();
    pass(aPosition);
}

function draw()
{
    verticesData = [
      0.0,0.0,
      1.0,0.0,
      1.0,1.0
    ];
}

function click(ev, gl, canvas, aPosition) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect() ;

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
  // Store the coordinates to g_points array
  verticesData.push(x);
  verticesData.push(y);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  pass(aPosition);
}

function pass(aPosition)
{
  var len = verticesData.length;
  for(var i = 0; i < len; i += 2) {
    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(aPosition, verticesData[i], verticesData[i+1], 0.0);
    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
    //gl.drawArrays( gl.POINTS, 0, verticesData.length/ATTRIBUTES);
    //gl.drawArrays( gl.TRIANGLE_FAN, 0, verticesData.length/ATTRIBUTES );
}
