let gl = null;
let glCanvas = null;
let program = null;

let aspectRatio;
let currentRotation = [0,1];
let currentScale = [1.0, 1.0];

let vertexArray;
let vertexBuffer;
let vertexNumComponents;
let vertexCount;

// Rendering data shared with the
// scalers.

let uScalingFactor;
let uGlobalColor;
let uRotationVector;
let aVertexPosition;

// Animation timing

let previousTime = 0.0;
let degreesPerSecond = 90.0;


window.onload = function init()
{
	canvas = document.getElementById( "gl-canvas" );

  gl = WebGLUtils.setupWebGL( canvas );
  if ( !gl ) { alert( "WebGL isn't available" ); }
  //  Load shaders and initialize attribute buffers

  program = initShaders( gl, "vertex-shader", "fragment-shader" );
  gl.useProgram( program );

	aspectRatio = canvas.width/canvas.height;
  currentRotation = [0, 1];
  currentScale = [1.0, aspectRatio];

	draw();

	// Load the data into the GPU

	vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertexArray, gl.STATIC_DRAW);

	vertexNumComponents = 2;
  vertexCount = vertexArray.length/vertexNumComponents;

  currentAngle = 0.0;
  rotationRate = 6;

  animateScene();

};

function draw()
{
			vertexArray = new Float32Array([
				-0.5, 0.5, 0.5,
				0.5, 0.5, -0.5,
				-0.5, 0.5, 0.5,
				-0.5, -0.5, -0.5
			]);
}

function animateScene()
{
	gl.viewport( 0.0, 0.0, canvas.width, canvas.height );
  gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	let radians = currentAngle * Math.PI / 270.0;
  currentRotation[0] = Math.sin(radians);
  currentRotation[1] = Math.cos(radians);

	uScalingFactor =
      gl.getUniformLocation(program, "uScalingFactor");
  uGlobalColor =
      gl.getUniformLocation(program, "uGlobalColor");
  uRotationVector =
      gl.getUniformLocation(program, "uRotationVector");

	gl.uniform2fv(uScalingFactor, currentScale);
  gl.uniform2fv(uRotationVector, currentRotation);
  gl.uniform4fv(uGlobalColor, [0.1, 0.7, 0.2, 1.0]);

	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

 aVertexPosition =
		 gl.getAttribLocation(program, "aVertexPosition");

 gl.enableVertexAttribArray(aVertexPosition);
 gl.vertexAttribPointer(aVertexPosition, vertexNumComponents,
			 gl.FLOAT, false, 0, 0);

 gl.drawArrays(gl.TRIANGLES, 0, vertexCount);

 window.requestAnimationFrame(function(currentTime) {
	 let deltaAngle = ((currentTime - previousTime) / 1000.0)
				 * degreesPerSecond;

	 currentAngle = (currentAngle + deltaAngle) % 360;

	 previousTime = currentTime;
	 animateScene();
 });
}
