function setup() {
  var canvas = createCanvas(400, 400);
}

let x = 50;

function draw() {
  // put drawing code here
  background(0);
  ellipse(x, 200, 100, 50);

  x++;
  if (x > width+50) x = -50;
}
