// Vertex shader program
var VSHADER_SOURCE =
	'precision mediump float;' +
	'' +
	'attribute vec2 coordinates;' +
	'attribute vec3 colors;' +
	'varying vec3 fragColors;' +
	'' +
  'void main() {\n' + //fragColor = vertColor;',
	'  fragColors = colors;\n' +
  '  gl_Position = vec4(coordinates, 0.0, 1.0);\n' + // Set the vertex coordinates of the point
  '}\n';

//'  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' +
// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;' +
	'' +
	'varying vec3 fragColors;' +
	'' +
  'void main() {\n' +
  '  gl_FragColor = vec4(fragColors, 1.0);\n' + // Set the point color
  '}\n';

var Init = function () {
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
		// X, Y,	R, G, B
    0.0,0.0,	1.0,0.0,0.0,
    1.0,0.0,	0.0,1.0,0.0,
    1.0,1.0,	0.0,0.0,1.0
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
	var colors = gl.getAttribLocation(gl.program, 'colors');

  if (coords < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(coords, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
	gl.vertexAttribPointer(colors, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(coords);
	gl.enableVertexAttribArray(colors);
	// Get the attribute location
  //var coord = gl.getAttribLocation(shaderProgram, "coordinates");

	gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Draw a point
	gl.drawArrays(gl.TRIANGLES,0,3);
}
