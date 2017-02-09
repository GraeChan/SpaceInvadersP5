function Ship() {
  this.x = width/2;
  this.y = height-45;
  this.xdir = 0;
  this.w = 60;
  this.h = 25;
  this.score = 0;
  this.totalScore = 0; 
  this.lives = 3;
  this.alive = true;
  this.toDelete = false;

  this.show = function() {
	push();
    noStroke();
    
    rectMode(CENTER);
	fill(255,255,0);
    rect(this.x, this.y, 10, 25);
	fill(0,0,255);
    rect(this.x, height-40, 20, 20);
	fill(255,0,0);
    rect(this.x, height-30, this.w, 20, 5);
	pop();
  }

  this.setDir = function(dir) {
    this.xdir = dir;
  }

  this.move = function(dir) {
    this.x += this.xdir*5;
  }

  this.destroy = function()
  {
	  this.toDelete = true;
  }
  
  this.boundaries = function()
  {
	  if(this.x > width - this.w/2 || this.x < this.w/2)
	  {
		  ship.setDir(0);
	  }
  }

}
