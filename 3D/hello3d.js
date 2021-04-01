
function setup() { 
  createCanvas(400, 400, WEBGL);
  createEasyCam();

  // suppress right-click context menu
  document.oncontextmenu = function() { return false; }
} 

function draw(){
  background(64);
  lights();
  box(200);
}
