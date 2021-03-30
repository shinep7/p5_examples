let balls;

function setup() {
  createCanvas(400, 400);
  balls = [];
}

function draw() {
  background(0);

  fill(255);
  textAlign(CENTER);
  textSize(20);
  text("Click me!", width/2, height/2);

  for (let b in balls)
    balls[b].display();
}

function mousePressed() {
  balls.push(new Ball(mouseX, mouseY));
}


