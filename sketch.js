var ship;
var invaders = [];
var bullets = [];
var fps = 30;
var scl =  10;

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
}  

function draw() {
  background(0,0,0);

  score();
  lives();

  //Ground
  push();
  noStroke();
  fill(0,255,0);
  rect(0,height-scl,width,scl);
  pop();

  ship.show();
  ship.move();

  //display and move bullets
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].show();
    bullets[i].move();
    for (var j = 0; j < invaders.length; j++) {
      if (bullets[i].hits(invaders[j])) {
        invaders[j].destroy();
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
    if (invaders[i].hits(ship)) {
        ship.destroy();
        //bullets[i].evaporate();
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
      ship.score += 10;
      ship.totalScore += 10;
    }
  }


}

function score()
{
	push();
	fill(255, 255, 255);
	textSize(16);
	text("SCORE: " + ship.totalScore, scl*2.5, scl*2.5);
	pop();
}

function lives()
{
  push();
  fill(255, 255, 255);
	textSize(16);
	text("LIVES: " + ship.lives, width/2, scl*2.5);
  pop();

	push();
	noStroke();
	fill(0, 255, 0);
  var x = width / 2 + 100
	if(ship.lives==3)
	{
		for(var i = 0; i < 3; i++)
		{
      push();
			fill(0,255,0);
      rectMode(CENTER);
      rect(x, 12.5, 10/2, 25/2);
      rect(x, 15, 20/2, 20/2);
      rect(x, 20, 60/2, 20/2, 5/2);
			x+=scl*5;
      pop();
		}
	}
	if(ship.lives==2)
	{
		for(var i = 0; i < 2; i++)
		{
			push();
			fill(0,255,0);
      rectMode(CENTER);
      rect(x, 12.5, 10/2, 25/2);
      rect(x, 15, 20/2, 20/2);
      rect(x, 20, 60/2, 20/2, 5/2);
			x+=scl*5;
      pop();
		}
	}
	 if(ship.lives==1)
{ 
		for(var i = 0; i < 1; i++)
		{
			push();
			fill(0,255,0);
      rectMode(CENTER);
      rect(x, 12.5, 10/2, 25/2);
      rect(x, 15, 20/2, 20/2);
      rect(x, 20, 60/2, 20/2, 5/2);
			x+=scl*5;
      pop();
		}
	}
	 if(ship.lives==0)
	{
		var x = scl*8 + scl/2
		for(var i = 0; i < 0; i++)
		{
			push();
			fill(0,255,0);
      rectMode(CENTER);
      rect(x, 12.5, 10/2, 25/2);
      rect(x, 15, 20/2, 20/2);
      rect(x, 20, 60/2, 20/2, 5/2);
			x+=scl*5;
      pop();
		}
		ship.alive = false;
	}
	
	pop();
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
    ship.lives-=1;
  }

  if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
}
