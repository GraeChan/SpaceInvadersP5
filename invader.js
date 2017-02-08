
function Invader(x, y) {
  this.x = x;
  this.y = y;
  this.w = 25;
  this.h = 25;
  this.r = 30;
  this.toDelete = false;

  this.xdir = 1;

  this.grow = function() {
    this.h = this.h + 2;
  }
  
  this.destroy = function()
  {
	  this.toDelete = true;
  }

  this.shiftDown = function() {
    this.xdir *= -1;
    this.y += this.h;
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
