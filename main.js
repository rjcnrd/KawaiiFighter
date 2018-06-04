
var ctx = document.getElementById("canvas").getContext("2d");

var width =  1000;
var height = 600;
var background1 = new Image;
var background2 = new Image; 
background1.src = "images/background-1.png";
background2.src = "images/background-2.png";
var drawBackground1; 

//background animation
//Frames is counting the amount of time the canvas was redrawn

var frames = 0; 

//draw border changes the background border every tenth frame (6 times in 60 frames)

function drawBorder(){

  //temporary
  ctx.drawImage(background1,0,0);
  
  // var lessFrames = Math.floor(frames%10/6); // gives 0 or 1
  // console.log("frames",frames,"lessFrames",lessFrames)
  // if (lessFrames == 0) {
  //   ctx.drawImage(background1,0,0);
  // } else {ctx.drawImage(background2,0,0);}
}


fighter = new Fighter(430,500,0,0,0,0,"white",ctx);
squareBall = new SquareBall(430,300,50,"#7FFFD4", 0,0,ctx) 

setInterval(function()
{
  ctx.clearRect(0,0,width,height);
  ctx.save(); 
  frames++;
  drawBorder();
  fighter.draw(ctx);
  squareBall.draw(ctx);
  ctx.save();
},1000/60)

//fighter animation


document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 39:
      fighter.moveRight();
      console.log("movedright");
      break;
    case 37:
      fighter.moveLeft();
      console.log("moved left");
      break;
  }
}