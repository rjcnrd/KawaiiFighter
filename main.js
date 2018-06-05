//VARIABLES DEFINED FOR WHOLE GAME
//.................................
//.................................

var canvas = document.getElementById("canvas");
var ctx = document.getElementById("canvas").getContext("2d");

//playingfield saves the maximum coordinates that objects can have without touching the game border. 
var playingField = {
  xMax: 948, //xmax Furthest most that objects can be without touching the frame
  xMin:  52, //xmin
  yMax: 50, //ymax
  yMin: 540,//ymin
};

var width =  1000;
var height = 600;
var frames = 0;  //Frames is counting the amount of time the canvas was redrawn


//IMAGES
//.................................
//.................................

var background1 = new Image;
background1.src = "images/background-1.png";
var background2 = new Image; 
background2.src = "images/background-2.png";

var heart = new Image;
heart.src = "images/Heart-Pink.png";

//drawBorder() changes the background border every tenth frame (6 times in 60 frames)

function drawBorder(){
  var lessFrames = Math.floor(frames%10/6); // gives 0 or 1
  if (lessFrames == 0) {
    ctx.drawImage(background1,0,0);
  } else {ctx.drawImage(background2,0,0);}
}

function drawBullets(){
  for (var i = 0; i < allBullets.length; i++) {
    allBullets[i].draw();
    console.log("draw bullets");
   
  }
  
}

function moveBullets(){
  for (var i = 0; i < allBullets.length; i++) {
    allBullets[i].changePosition();
    console.log("changing position of bullets");
  }
}


//ANIMATED GAME ELEMENTS 
//.................................
//.................................

var fighter = new Fighter(430,500,80,80,0,0,"white",ctx);
var squareBall = new SquareBall(250,250,4,-10,40,"#7FFFD4",ctx);
var allBullets = []; //array will be filled with bullets 

//checkCollission1() checks if fighter and squareBall meet 
//yCollision checks if they collide on y axis
//xCollissionA checks if the edge of the squareBall is right of the left outer edge of the fighter
//xCollisionB checks the same for the right edge of the fighter


//Function to Draw on Canvas 

function checkCollission1(squareBall) {
  var yCollissionTop = false;
  var xCollissionA = false ;
  var xCollissionB = false;
  if((squareBall.y+squareBall.side) === (playingField.yMin-fighter.height)){
  yCollissionTop  = true};

  if ((squareBall.x + squareBall.side > fighter.x) === true){
    xCollissionA = true};
  if(squareBall.x < (fighter.x + fighter.width)=== true){
    xCollissionB = true};

  if ((xCollissionA && xCollissionB) && yCollissionTop)
  {
    console.log("touching ball",yCollissionTop, xCollissionA, xCollissionB);
    // squareBall.y = playingField.yMin-fighter.height-10;
    squareBall.y = squareBall.y - 10;
    // squareBall.y = squareBall.y;
    squareBall.vy *= -1;
    fighter.score +=1;
  };

};

setInterval(function()
{
  ctx.clearRect(0,0,width,height);
  ctx.save(); 

  frames++;
  drawBorder();
  drawBullets(); 
  moveBullets();

//paint score 
  ctx.fillStyle = "white";
  ctx.font = "50px Codystar";
  ctx.fillText(fighter.score.toString(),550,130);

//paint lives 
  for (var index = 0; index < fighter.lives; index++) {
  ctx.drawImage(heart,640+index*80,20);};

  fighter.draw(ctx);

  //draw ball, if we are still alive. 
  if (fighter.lives>0) {
    squareBall.draw(ctx);
    squareBall.changePosition(playingField,canvas,fighter);
    checkCollission1(squareBall);
  }

    if (fighter.lives === 0) {
      ctx.clearRect(0,0,width,height);
      ctx.fillStyle = "yellow";
      ctx.font = "80px Codystar";
      ctx.fillText("Game Over",250,300);
    }
  

  ctx.save();
},1000/20);

//fighter animation

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 39:
      fighter.moveRight(playingField);
      break;
    case 37:
      fighter.moveLeft(playingField);
      break;
    case 32:
    console.log("space");
    fighter.createBullets(allBullets);
    break;
  }
}


