// Vertex shader program
var VSHADER_SOURCE =
	'attribute vec3 coordinates;\n' +
  'void main() {\n' +
  '  gl_Position = vec4(coordinates, 1.0);\n' + // Set the vertex coordinates of the point
  '  gl_PointSize = 20.0;\n' +                    // Set the point size
  '}\n';

//'  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' +
// Fragment shader program
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n' + // Set the point color
  '}\n';

function Init() {
	console.log('This is working');

	var canvas = document.getElementById('surface');

	var gl = canvas.getContext('webgl');

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

	var vertices = [
		// X, Y, Z
    0.0,0.0,0.0,
    1.0,0.0,0.0,
    1.0,1.0,0.0,
  ];

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
  if (coords < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(coords);
	// Get the attribute location
  //var coord = gl.getAttribLocation(shaderProgram, "coordinates");

	gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Draw a point
	gl.drawArrays(gl.POINTS,0,3);
}
