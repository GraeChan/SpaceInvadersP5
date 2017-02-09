


function Invader(x, y) {
  this.x = x;
  this.y = y;
  this.w = 25;
  this.h = 25;
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
    fill(r, g, b);
	rect(this.x, this.y, this.w, this.h);
	pop();
  }

  this.hits = function(ship) {
    var d = dist(this.x, this.y, ship.x, ship.y);
    if (d < this.h + ship.h && d < ship.w  ) {
      return true;
    } else {
      return false;
    }
  }

}
