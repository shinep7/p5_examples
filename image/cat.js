let img;

function preload() {
    img = loadImage('cat.png');
}

function setup() {
    createCanvas(400, 400);
    noCursor();
    img.resize(40, 40);
}

function draw() {
    background(100);
    image(img, mouseX, mouseY);
}
