var xCenterOfCircle;
var yCenterOfCircle;
var centerOfCircle;
var radiusOfCircle = 0.5;
var ATTRIBUTES = 1;
var noOfFans = 360;
var anglePerFan;
var verticesData = [];
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
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );


    drawCircle();

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesData), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );


    render();
}


function drawCircle()
{
    xCenterOfCircle = 0;
    yCenterOfCircle = 0;
    centerOfCircle = vec2(0, 0);
    anglePerFan = (2*Math.PI) / noOfFans;
    verticesData = [centerOfCircle];

    for(var i = 0; i <= noOfFans; i++)
    {
        var index = ATTRIBUTES * i + 2;
        var angle = anglePerFan * (i+1);
        var xCoordinate = xCenterOfCircle + Math.cos(angle) * radiusOfCircle;
        var yCoordinate = yCenterOfCircle + Math.sin(angle) * radiusOfCircle;
        //document.write(xCoordinate);
        //document.write("\n");
        //document.write(yCoordinate);
        var point = vec2(xCoordinate, yCoordinate);
        verticesData.push(point);
   }
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, verticesData.length/ATTRIBUTES );
}
