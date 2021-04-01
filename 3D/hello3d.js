let doTexture = false;

function preload() {
    img = loadImage('fur.jpg');
}

function setup() { 
  createCanvas(400, 400, WEBGL);
  createEasyCam();

  // suppress right-click context menu
  document.oncontextmenu = function() { return false; }
} 

function draw(){
    background(64);
    lights();
    texture(doTexture ? img : 0);
    box(200);
}

function keyPressed(){
    doTexture = !doTexture;
}
