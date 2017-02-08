var ship;
var invaders = [];
var bullets = [];
var fps = 60;

function setup() {
  createCanvas(640, 480);
  ship = new Ship();
  // Bullet = new Bullet(width/2, height/2);
  var index = 0;
  for (var i = 0; i <11; i++) {
	for (var j = 0; j <5; j++) {
		invaders[index++] = new Invader(i*50+50, j*50+50);
	}
  }
  frameRate(fps);
}  

function draw() {
  background(0,0,0);
  ship.show();
  ship.move();

  //display and move bullets
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].show();
    bullets[i].move();
    for (var j = 0; j < invaders.length; j++) {
      if (bullets[i].hits(invaders[j])) {
        invaders[j].destroy();
		fps+=1;
        bullets[i].evaporate();
      }
    }
  }

  var edge = false;

  //display and move invaders
  for (var i = 0; i < invaders.length; i++) {
	  for (var i = 0; i < invaders.length; i++) {
    invaders[i].show();
    invaders[i].move();
    if (invaders[i].x + invaders[i].w > width || invaders[i].x < 0) {
      edge = true;
    }
  }
  }

  //When Invaders reach edge of screen, go down
  if (edge) {
    for (var i = 0; i < invaders.length; i++) {
      invaders[i].shiftDown();
    }
  }

  //Delete bullet that is hit
  for (var i = bullets.length-1; i >= 0; i--) {
    if (bullets[i].toDelete) {
      bullets.splice(i, 1);
    }
  }
  
  //Delete Invader that is hit
  for (var i = invaders.length-1; i >= 0; i--) {
    if (invaders[i].toDelete) {
      invaders.splice(i, 1);
    }
  }


}

//INPUT
function keyReleased() {
  if (key != ' ') {
    ship.setDir(0);
  }
}

function keyPressed() {
  if (key === ' ') {
    var bullet = new Bullet(ship.x, height - 50);
    bullets.push(bullet);
  }

  if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
}
