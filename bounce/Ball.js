class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.c = color(0, random(200, 255), random(150, 255), random(100, 200));
    this.r = random(5, 30);
  }

  display() {
    noStroke();
    fill(this.c);
    ellipse(this.x, this.y, 2*this.r, 2*this.r);

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < this.r || this.x > width - this.r) this.vx *= -1;
    if (this.y < this.r || this.y > width - this.r) this.vy *= -1;
  }
}
