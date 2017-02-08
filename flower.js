
function Flower(x, y) {
  this.x = x;
  this.y = y;
  this.w = 20;
  this.h = 20;
  this.r = 30;

  this.xdir = 1;

  this.grow = function() {
    this.r = this.r + 2;
  }

  this.shiftDown = function() {
    this.xdir *= -1;
    this.y += this.r;
  }

  this.move = function() {
    this.x = this.x + this.xdir;
  }

  this.show = function() {
	push();
    noStroke();
    fill(255, 255, 255);
    //ellipse(this.x, this.y, this.r*2, this.r*2);
	rect(this.x, this.y, this.w, this.h);
	pop();
  }

}
