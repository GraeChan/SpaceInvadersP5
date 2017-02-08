function Ship() {
  this.x = width/2;
  this.xdir = 0;

  this.show = function() {
	push();
    noStroke();
    fill(0,255,0);
    rectMode(CENTER);
    rect(this.x, height-45, 10, 25);
    rect(this.x, height-40, 20, 20);
    rect(this.x, height-30, 60, 20, 5);
	pop();
  }

  this.setDir = function(dir) {
    this.xdir = dir;
  }

  this.move = function(dir) {
    this.x += this.xdir*5;
  }

}
