//Space Invaders Clone made with P5.js
//Graeme A. Burr
//February 2017

var ship;
var invaders = [];
var bullets = [];
var scl =  10;
var totalLives = 3;
var totalScore = 0;
var r, g, b;
var bulletR, bulletG, bulletB;

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
  r = random(255);
	g = random(255);
	b = random(255);
}  

function draw() {
  bulletR = random(255);
  bulletG = random(255);
  bulletB = random(255);
  background(0,0,0);

  score();
  lives();

  //Ground
  push();
  noStroke();
  fill(0,255,0);
  rect(0,height-scl,width,scl);
  pop();

  if(ship.alive)
  {
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
  }
  
  if (ship.score == 550)
	{
		setup();
	}


  var edge = false;

  //display and move invaders
  for (var i = 0; i < invaders.length; i++) {
	  
    invaders[i].show();
    invaders[i].move();
    if (invaders[i].x + invaders[i].w > width || invaders[i].x < 0) {
      edge = true;

    }
    if (invaders[i].hits(ship) || invaders[i].y > height - scl*4) 
	{
        ship.destroy();
		totalLives-=1; 
		setup();
		invaders.xdir = 0;
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
      totalScore += 10;
    }
  }
	
	//Prevents player moving off screen
	ship.boundaries();
	
}

function score()
{
	push();
	fill(255, 255, 255);
	textSize(16);
	text("SCORE: " + totalScore, scl*2.5, scl*2.5);
	pop();
}

function gameOver()
{
	push();
	fill(255, 0, 0);
	textSize(64);
	text("GAME OVER", 125, 260);
	pop();
}

function lives()
{
  push();
  fill(255, 255, 255);
	textSize(16);
	text("LIVES: " + totalLives, width/2, scl*2.5);
  pop();

	push();
	noStroke();
	fill(0, 255, 0);
  var x = width / 2 + 100
	if(totalLives == 3)
	{
		for(var i = 0; i < 3; i++)
		{
		  push();
		  rectMode(CENTER);
		  fill(255,255,0);
		  rect(x, 12.5, 10/2, 25/2);
		  fill(0,0,255);
		  rect(x, 15, 20/2, 20/2);
		  fill(255,0,0);
		  rect(x, 20, 60/2, 20/2, 5/2);
		  x+=scl*5;
		  pop();
		}
	}
	if(totalLives == 2)
	{
		for(var i = 0; i < 2; i++)
		{
			push();
		  rectMode(CENTER);
		  fill(255,255,0);
		  rect(x, 12.5, 10/2, 25/2);
		  fill(0,0,255);
		  rect(x, 15, 20/2, 20/2);
		  fill(255,0,0);
		  rect(x, 20, 60/2, 20/2, 5/2);
		  x+=scl*5;
		  pop();
		}
	}
	 if(totalLives == 1)
{ 
		for(var i = 0; i < 1; i++)
		{
			push();
		  rectMode(CENTER);
		  fill(255,255,0);
		  rect(x, 12.5, 10/2, 25/2);
		  fill(0,0,255);
		  rect(x, 15, 20/2, 20/2);
		  fill(255,0,0);
		  rect(x, 20, 60/2, 20/2, 5/2);
		  x+=scl*5;
		  pop();
		}
	}
	 if(totalLives <= 0)
	{
		var x = scl*8 + scl/2
		for(var i = 0; i < 0; i++)
		{
			push();
		  rectMode(CENTER);
		  fill(255,255,0);
		  rect(x, 12.5, 10/2, 25/2);
		  fill(0,0,255);
		  rect(x, 15, 20/2, 20/2);
		  fill(255,0,0);
		  rect(x, 20, 60/2, 20/2, 5/2);
		  x+=scl*5;
		  pop();
		}
		ship.alive = false;
		totalLives = 0;
		gameOver();
		invaders.destroy();
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
  }

  if (keyCode === RIGHT_ARROW) {
	  ship.setDir(1);
  }  
  else if (keyCode === LEFT_ARROW) 
  {
    ship.setDir(-1);
  }
}
