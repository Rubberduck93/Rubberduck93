
var verticesData = [];
var canvas_colors = [];
var point_colors = [];

var triangle_vertices = [];
var point_vertices = [];

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

var maxNumTriangles = 200;
var maxNumVertices  = 3 * maxNumTriangles;
var point_index = 0;
var triangle_index = 0;
var first = true;
var second = true;
var third = true;

var aPosition;
var aColors

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

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 8*maxNumVertices, gl.STATIC_DRAW);

    //gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(point_vertices), gl.STATIC_DRAW);

    //var FSIZE = point_vertices.BYTES_PER_ELEMENT;

    // Posistions


    aPosition = gl.getAttribLocation( program, "aPosition" );
    //gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    //gl.enableVertexAttribArray(aPosition);

    //var cBuffer = gl.createBuffer();
    //gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    //gl.bufferData(gl.ARRAY_BUFFER, 16*maxNumVertices, gl.STATIC_DRAW );

    aColors = gl.getAttribLocation( program, "aColors" );
    //gl.vertexAttribPointer(aColors, 3, gl.FLOAT, false, 0, 0);
    //gl.enableVertexAttribArray(aColors);

    //canvas.onmousedown = function(ev){ click(ev, gl, canvas, aPosition,aColors); };

    canvas.addEventListener("mousedown", function(event){
       //gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
       if (draw_points_on) {
         gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);

         var x = event.clientX; // x coordinate of a mouse pointer
         var y = event.clientY; // y coordinate of a mouse pointer
         var rect = event.target.getBoundingClientRect() ;

         x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
         y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

         point_vertices.push(x);
         point_vertices.push(y);

         point_vertices.push(point_colors[pointIndex][0]);
         point_vertices.push(point_colors[pointIndex][1]);
         point_vertices.push(point_colors[pointIndex][2]);

        render();

       }
       else if (draw_triangle_on) {
         if(first) {
           first = false;
           gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);

           var x = event.clientX; // x coordinate of a mouse pointer
           var y = event.clientY; // y coordinate of a mouse pointer
           var rect = event.target.getBoundingClientRect() ;

           x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
           y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

           triangle_vertices.push(x);
           triangle_vertices.push(y);

           triangle_vertices.push(triangle_colors[triangleIndex][0]);
           triangle_vertices.push(triangle_colors[triangleIndex][1]);
           triangle_vertices.push(triangle_colors[triangleIndex][2]);

         }
         else if (second){
           second = false;

           var x = event.clientX; // x coordinate of a mouse pointer
           var y = event.clientY; // y coordinate of a mouse pointer
           var rect = event.target.getBoundingClientRect() ;

           x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
           y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);


           triangle_vertices.push(x);
           triangle_vertices.push(y);

           triangle_vertices.push(triangle_colors[triangleIndex][0]);
           triangle_vertices.push(triangle_colors[triangleIndex][1]);
           triangle_vertices.push(triangle_colors[triangleIndex][2]);

         } else {

           first = true;
           second = true;

           var x = event.clientX; // x coordinate of a mouse pointer
           var y = event.clientY; // y coordinate of a mouse pointer
           var rect = event.target.getBoundingClientRect() ;

           x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
           y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);


           triangle_vertices.push(x);
           triangle_vertices.push(y);

           triangle_vertices.push(triangle_colors[triangleIndex][0]);
           triangle_vertices.push(triangle_colors[triangleIndex][1]);
           triangle_vertices.push(triangle_colors[triangleIndex][2]);


           render();
         }
       }
   } );


    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    render();

}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );

    // Points
    var len =  point_vertices.length;
    for(var i = 0; i < len; i += 5) { //0,1 - 2,3 - 4,5    0,1-5,6-10,11
       // Pass the position of a point to a_Position variable
       gl.vertexAttrib3f(aPosition,  point_vertices[i],  point_vertices[i+1], 0.0);
       gl.vertexAttrib3f(aColors, point_vertices[i+2], point_vertices[i+3], point_vertices[i+4]);
       // Draw
       gl.drawArrays(gl.POINTS, 0, 1);

    }

    // Triangle
    var len =  triangle_vertices.length;
    for(var i = 0; i < len; i += 5) { //0,1 - 2,3 - 4,5    0,1-5,6-10,11
       // Pass the position of a point to a_Position variable
       gl.vertexAttrib3f(aPosition, triangle_vertices[i], triangle_vertices[i+1], 0.0);
       gl.vertexAttrib3f(aColors, triangle_vertices[i+2], triangle_vertices[i+3], triangle_vertices[i+4]);
       // Draw

       gl.drawArrays(gl.TRIANGLES_FAN,i,3);
    }

}


function clear_canvas()
{
    //point_index = 0;
    //triangle_index = 0;
    point_vertices = [];
    triangle_vertices = [];
    gl.viewport( 0.0, 0.0, canvas.width, canvas.height );
    gl.clearColor(canvas_colors[canvasIndex][0], canvas_colors[canvasIndex][1],
        canvas_colors[canvasIndex][2], 1.0);
    gl.clear( gl.COLOR_BUFFER_BIT );
}

function draw_triangle()
{
  if (draw_triangle_on) {
    draw_triangle_on = false;
  } else {
    draw_triangle_on = true;
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
