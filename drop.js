
function Drop(x, y) {
  this.x = x;
  this.y = y;
  this.w = 8;
  this.h = 16;
  this.toDelete = false;

  this.show = function() {
    noStroke();
    fill(255, 255, 255);
    //ellipse(this.x, this.y, this.r*2, this.r*2);
	rect(this.x-this.w/2, this.y-this.h, this.w, this.h);
  }

  this.evaporate = function() {
    this.toDelete = true;
  }

  this.hits = function(flower) {
    var d = dist(this.x, this.y, flower.x, flower.y);
    if (d < this.h + flower.h) {
      return true;
    } else {
      return false;
    }
  }

  this.move = function() {
    this.y = this.y - 5;
  }

}
