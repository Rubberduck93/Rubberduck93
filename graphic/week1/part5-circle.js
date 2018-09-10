// Vertex shader program
var VSHADER_SOURCE =
	'precision mediump float;' +
	'' +
	'attribute vec3 coordinates;' +
	//'attribute vec3 colors;' +
	//'varying vec3 fragColors;' +
	//'uniform float theta;' +
	'' +
  'void main() {\n' + //fragColor = vertColor;',
	'  gl_Position = vec4(coordinates, 1.0);\n' +
	'  gl_PointSize = 20.0;\n' +
	//'  fragColors = colors;\n' +
	//'  gl_Position.x = -sin(theta) * gl_Position.x + cos(theta) * gl_Position.y;\n' +
	//'	 gl_Position.y = sin(theta) * gl_Position.y + cos(theta) * gl_Position.x;\n' +
	//'	 gl_Position.z = 0.0;\n' +
	//'	 gl_Position.w = 1.0;\n' +
   // Set the vertex coordinates of the point
  '}\n';

//'  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' +
// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;' +
	'' +
	//'varying vec3 fragColors;' +
	'' +
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n' + // Set the point color
  '}\n';

var canvas;
var gl;

var vertices;

var Init = function () {
	console.log('This is working');

	canvas = document.getElementById('surface');

	gl = canvas.getContext('webgl');

	if (!gl) {
		console.log('WebGL not supported, falling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert('Your browser does not support WebGL');
	}

	// Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

	vertices = [
		// X, Y,	R, G, B
    0.0,0.0,0.0
  ];

	// Rotation
	theta = 0.0;
	thetaLoc = gl.getUniformLocation(gl.program, "theta");
	gl.uniform1f(thetaLoc, theta);

	// Create a buffer object
  var vertexBuffer = gl.createBuffer();

  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

	// Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	var coords = gl.getAttribLocation(gl.program, 'coordinates');
	//var colors = gl.getAttribLocation(gl.program, 'colors');

  if (coords < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0, 0);
	//gl.vertexAttribPointer(colors, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(coords);
	//gl.enableVertexAttribArray(colors);

	var x;
	var y;
	var z;
	var radius;
	var numberOfSides;


	gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);

	render();

};

function drawCircle(x, y, z, radius, numberofSides)
{
	var numberOfVertices = numberOfSides + 2;
	var doublePi = 2.0 * Math.PI;

	circleVerticesX[numberOfVertices];
	circleVerticesY[numberOfVertices];
	circleVerticesZ[numberOfVertices];

	circleVerticesX[0] = x;
	circleVerticesY[0] = y;
	circleVerticesZ[0] = z;

	for (var i = 1; i < numberOfVertices; i++)
	{
			circleVerticesX[i] = x + (radius * Math.cos(i * doublePi / numberOfSides));
			circleVerticesY[i] = y + (radius * Math.sin(i * doublePi / numberOfSides));
			circleVerticesZ[i] = z;
	}

	allCircleVertices[numberOfVertices * 3];

	for (var i=0; i < numberOfVertices; i++)
	{
		allCircleVertices[i*3] = circleVerticesX[i];
		allCircleVertices[(i*3)+1] = circleVerticesY[i];
		allCircleVertices[(i*3)+2] = circleVerticesZ[i];
	}

	//gl.


}

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	//theta += 0.01;
  //gl.uniform1f( thetaLoc, theta );

	gl.drawArrays(gl.TRIANGLE_FAN,0,vertices.length/2);

	//requestAnimFrame(render);
}
