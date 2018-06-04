
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
  //ctx.drawImage(background1,0,0);
  
  var lessFrames = Math.floor(frames%10/6); // gives 0 or 1
  console.log("frames",frames,"lessFrames",lessFrames)
  if (lessFrames == 0) {
    ctx.drawImage(background1,0,0);
  } else {ctx.drawImage(background2,0,0);}
}

fighter = new Fighter(430,500,60,60,0,0,"white",ctx);
squareBall = new SquareBall(250,250,4,-1,40,"#7FFFD4",ctx);

//Check if fighter and squareBall meet 

function checkCollission1() {
  var yCollission = squareBall.y+squareBall.side >= (playingField.yMin-fighter.height);
  var xCollissionA = (squareBall.x + squareBall.side >= fighter.x);
  var xCollissionB = squareBall.x <= (fighter.x + fighter.width);
  if (yCollission === true) {console.log("The ball is too low",yCollission);}
  if (xCollissionA && xCollissionB) {console.log("The ball is in the zone of the fighter");}
  // if (xCollission === true) {console.log("The ball is passings the fighter")};
  if (xCollissionA && xCollissionB && yCollission){console.log("touching ball");
    {squareBall.vy *= -1};
};
// if ( && ()
//   {console.log("I touched the bar!!")};
};

setInterval(function()
{
  ctx.clearRect(0,0,width,height);
  ctx.save(); 
  frames++;
  drawBorder();
  checkCollission1();
  fighter.draw(ctx);
  squareBall.draw(ctx);
  squareBall.changePosition(playingField);
  ctx.save();
},1000/60)

//fighter animation

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 39:
      fighter.moveRight(playingField);
      console.log("movedright");
      break;
    case 37:
      fighter.moveLeft(playingField);
      console.log("moved left");
      break;
  }
}