//VARIABLES DEFINED FOR WHOLE GAME
//.................................
//.................................

var canvas = document.getElementById("canvas");
var ctx = document.getElementById("canvas").getContext("2d");

var width =  1000;
var height = 1200;
//playingfield saves the maximum coordinates that objects can have without touching the game border. 

var playingField = {
  xMax: width-20, //xmax Furthest most that objects can be without touching the frame
  xMin:  20, //xmin
  yMax: 20, //ymax
  yMin: height-20,//ymin
};

var frames = 0;  //Frames is counting the amount of time the canvas was redrawn
var evilsToCreate = 3; 

//ANIMATED GAME ELEMENTS 
//.................................
//.................................

var fighter = new Fighter(430,1145,80,80,0,0,"white",ctx);
var squareBall = new SquareBall(250,250+600,4,-10,40,"#7FFFD4",ctx);
var allBullets = []; //array will be filled with bullets 
var allEvils = []; // Collecting all the Evil Warriors 

//IMAGES
//.................................
//.................................

var heart = new Image;
heart.src = "images/Heart-Pink.png";

var evilPurple = new Image;
evilPurple.src = "./images/monster-purple-150-150.png";

var evilPurpleLady = new Image;
evilPurpleLady.src = "./images/monster-lady-purple-150-150.png";

var evilTurqouise = new Image;
evilTurqouise.src = "./images/monster-turqouise-150-150.png";

var evilPink = new Image;
evilPink.src = "./images/monster-pink-150-150.png";

var evilImages =[evilTurqouise,evilPurple,evilPink,evilPurpleLady];


function drawStartFrame0(){
  ctx.save();
  ctx.clearRect(0,0,width,height);
  ctx.fillStyle = "#ff62b1";
  ctx.font = "200px Codystar";
  ctx.fillText("Kawaii",200,400);
  ctx.fillStyle = "#ff62b1";
  ctx.font = "200px Codystar";
  ctx.fillText("Fighter",100,600);
  ctx.fillStyle = "yellow";
  ctx.font = "40px Codystar";
  ctx.fillText("幸運の小さな戦士",370,700);
  ctx.restore();
}

function drawStartFrame1(){
  ctx.save();
  ctx.clearRect(0,0,width,height);
  ctx.fillStyle = "#ff62b1";
  ctx.font = "200px Codystar";
  ctx.fillText("3",500,600);
  ctx.fillStyle = "yellow";
  ctx.font = "40px Codystar";
  ctx.fillText("grab some candy",350,700);
  ctx.restore();
}

function drawStartFrame2(){
  ctx.save();
  ctx.clearRect(0,0,width,height);
  ctx.fillStyle = "#ff62b1";
  ctx.font = "200px Codystar";
  ctx.fillText("2",500,600);
  ctx.fillStyle = "yellow";
  ctx.font = "30px Codystar";
  ctx.fillText("幸運の小さな戦士",420,700);
  ctx.restore();
}


function drawStartFrame3(){
  ctx.save();
  ctx.clearRect(0,0,width,height);
  ctx.fillStyle = "#ff62b1";
  ctx.font = "200px Codystar";
  ctx.fillText("1",500,600);
  ctx.fillStyle = "yellow";
  ctx.font = "40px Codystar";
  ctx.fillText("plant a tree",400,700);
  ctx.restore();
}

function drawBorder(){
  var lessFrames = Math.floor(frames%10/6); // gives 0 or 1
  if (lessFrames == 0) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle="#ff62b1";
    ctx.setLineDash([5,5]);
    ctx.lineWidth=15;
    ctx.strokeRect(0,0,width,height);
    ctx.closePath();
    ctx.restore();
  } 

  else {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle="#ff62b1";
    ctx.setLineDash([20,15]);
    ctx.lineWidth=15;
    ctx.strokeRect(0,0,width,height);
    ctx.closePath();
    ctx.restore();
  }
}

function drawBullets(){
  for (var i = 0; i < allBullets.length; i++) {
    allBullets[i].draw();
  }
  
}

//filter out the bullets that are still visible and change their position)
function moveBullets(){
  for (var i = 0; i < allBullets.length; i++) {
    allBullets[i].changePosition(playingField);
  }
  allBullets = allBullets.filter(function(element){
  return (element.y > playingField.yMax && element.x > playingField.xMin && element.x < playingField.xMax ) //ymin = 540 
  });
}

function drawScore(){
  ctx.fillStyle = "white";
  ctx.font = "50px Codystar";
  ctx.fillText(fighter.score.toString(),70,120);
};

function drawLives(){
  for (var index = 0; index < fighter.lives; index++) {
  ctx.drawImage(heart,640+index*80,20);};
};


function drawEvils(){
  for (var i = 0; i < allEvils.length; i++) {
  allEvils[i].draw();
  }
}
//moveEvils moves the Evils and removes them from the array if they leave the playing field. 
//When Evil leaves the y Axis, EvilsToCreate is set +1 
function moveEvils(){
  for (var i = 0; i < allEvils.length; i++) {
    allEvils[i].changePosition();
    if ((allEvils[i].y +75)> playingField.yMin){
    evilsToCreate++;
  }
}

  allEvils = allEvils.filter(function(element){
    return (element.y +75 < playingField.yMin) //ymin = 540 
  });
    // console.log("allEvils after filter",allEvils)
}

//checkCollission1() checks if fighter and squareBall meet 
//yCollision checks if they collide on y axis
//xCollissionA checks if the edge of the squareBall is right of the left outer edge of the fighter
//xCollisionB checks the same for the right edge of the fighter

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
    fighter.score +=10;
  };

};

//checkCollission2 checks if ONE Bullet b part of allBullets 
//collides with ONE Evil e part of allEvils 

function checkCollission2(){
  if(allEvils.length>0){
    var ColBulletEvilY = false;
    var ColBulletEvilX = false;
    // var numberOfCollissions; 

    for (let e = 0; e < allEvils.length; e++) {
      for (let b = 0; b < allBullets.length; b++) { 
          ColBulletEvilY = ((allEvils[e].y)+75  > allBullets[b].y);
          // console.log("allEvils[e].y",allEvils[e].y,"allBullets[b].y", allBullets[b].y);
      
          ColBulletEvilX = ( (allEvils[e].x <= allBullets[b].x) && (allEvils[e].x + 75 > allBullets[b].x));
          
            if (ColBulletEvilY && ColBulletEvilX){
              allEvils.splice(e,1); //delete the evil that was shot 
              console.log("allEvils after collission",allEvils); 
              allBullets.splice(b,5); //delete the array of the 5 bullets used to shoot 
              evilsToCreate++; // make sure another evil is introduced into the game 
              fighter.score +=50;
              // e--; //we took out one Evil, so the next one "moves up"
              // b--; //we took out one Bullet, so the next one "moves up"
            }
          
          
      }
    }
  }
}

function checkCollissionFighterEvil(){
 
  var yCollissionTop = false;
  var xCollissionA = false ;
  var xCollissionB = false;

  for (var e = allEvils.length-1; e >= 0; e-- ) {
    
    if((allEvils[e].y+ 75) >= (playingField.yMin-fighter.height)){
    yCollissionTop  = true};
  
    if ((allEvils[e].x + 75 > fighter.x) === true){
      xCollissionA = true};
    if(allEvils[e].x < (fighter.x + fighter.width) === true){
      xCollissionB = true};
  
    if (xCollissionA && xCollissionB && yCollissionTop){ 
      allEvils.splice(e,1);
      fighter.lives-=1; 
      evilsToCreate++;
      fighter.color ="yellow";
      setTimeout(function(){fighter.color ="white";}, 500);
    };

    
  }

};

setInterval(function()
{
  ctx.clearRect(0,0,width,height);
  ctx.save(); 
  frames++;


  if (frames<120){
    drawStartFrame0()
  }

  if (frames<240 && frames > 119){
    drawStartFrame1()
  }

  if (frames<360 && frames > 240){
    drawStartFrame2()
  }

  if (frames<480 && frames > 360){
    drawStartFrame3()
  }
  

  if (frames>480){

    drawBorder();
    drawBullets(); 
    moveBullets();
    drawScore();
    drawLives(); 
    fighter.draw(ctx);

    //draw ball, if we are still alive. 
    if (fighter.lives>0) {
      squareBall.draw();
      squareBall.changePosition(playingField,canvas,fighter);
      checkCollission1(squareBall);

      while (evilsToCreate>0){
          fighter.createEvils(evilImages,allEvils,playingField);
          evilsToCreate--;
      }
        
      drawEvils();
      moveEvils();     
      checkCollission2();
      checkCollissionFighterEvil();
    }

      if (fighter.lives === 0) {
        ctx.clearRect(0,0,width,height);
        ctx.fillStyle = "yellow";
        ctx.font = "80px Codystar";
        ctx.fillText("Game Over",250,300);
        ctx.font = "40px Codystar";
        ctx.fillText("refresh to play again",250,400);
        clearInterval(1); //stops the animation 
      }
    }

    ctx.save();
  },1000/60);



  //fighter animation through keys 

  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 39:
        fighter.moveRight(playingField);
        break;
      
      case 37:
        fighter.moveLeft(playingField);
        break;

      case 32:
        e.preventDefault();
        fighter.createBullets(allBullets);
        break;
    }
  
}

