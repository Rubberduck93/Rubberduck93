var xCenterOfCircle;
var yCenterOfCircle;
var centerOfCircle;
var radiusOfCircle = 0.5;
var ATTRIBUTES = 3;
var noOfFans = 360;
var anglePerFan;
var verticesData = [];
var verticesColors = [];
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


    draw();

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, verticesData, gl.STATIC_DRAW );


    var FSIZE = verticesData.BYTES_PER_ELEMENT;
    // Associate out shader variables with our data buffer

    var aPosition = gl.getAttribLocation( program, "aPosition" );
    if (aPosition < 0) {
      console.log('Failed to get the storage location of aPosition');
      return -1;
    }
    gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 5 * FSIZE, 0 );
    gl.enableVertexAttribArray( aPosition );

    // Associate out shader variables with our color buffer

    var aColors = gl.getAttribLocation( program, "aColors" );
    if(aColors < 0) {
      console.log('Failed to get the storage location of aColor');
      return -1;
    }
    gl.vertexAttribPointer( aColors, 3, gl.FLOAT, false, 5 * FSIZE, 2 * FSIZE );
    gl.enableVertexAttribArray( aColors );



    render();
}


function draw()
{
    verticesData = new Float32Array([
      // X, Y   R, G, B
      0.0,0.0,  1.0,0.0,0.0,
      1.0,0.0,  0.0,1.0,0.0,
      1.0,1.0,  0.0,0.0,1.0,
    ]);
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, verticesData.length/5 );
    //gl.drawArrays( gl.POINTS, 0, verticesData.length/5 );
    //gl.drawArrays( gl.TRIANGLE_FAN, 0, verticesData.length/ATTRIBUTES );
}
