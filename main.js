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
var squareBallSpeedLevels = 3; // Enables increasing the speed step by step during setinterval 
var musicToPlay = 3; 
var boniToCreate = 2;

//ANIMATED GAME ELEMENTS 
//.................................
//.................................

var fighter = new Fighter(430,1145,80,80,0,0,"white",ctx);
var squareBall = new SquareBall(250,250+600,4,-10,40,"#7FFFD4",ctx,0);
var allBullets = []; //Collecting all the Bullets 
var allEvils = []; // Collecting all the Evil Warriors 
var allBoni = []; //Collecting all the Bonuses 

//AUDIO
//.................................
//.................................

var nextLevelSound = new Audio;
nextLevelSound.src = "./sounds/star_win_gain.mp3";

var fighterHurtSound = new Audio; 
fighterHurtSound.src = "./sounds/game_lose_negative.mp3"; 

var bulletShotSound = new Audio;
bulletShotSound.src = "./sounds/Shooter-2.mp3";

var gameOverSound = new Audio;
gameOverSound.src = "./sounds/gameover.mp3";

var pongSound = new Audio;
pongSound.src = "./sounds/simple-pong.mp3";

var ballLostSound = new Audio;
ballLostSound.src = "./sounds/blip.mp3";

var evilShotSound = new Audio; 
evilShotSound.src = "./sounds/dead-evil1.mp3";

var collectBonusSound = new Audio; 
collectBonusSound.src = "./sounds/collectBonus.mp3"

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

var star = new Image;
star.src = "./images/YellowStar2.png";

var bonusImages = [star,star,star,star];

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
  ctx.font = "80px Codystar";
  ctx.restore();
}
function drawStartFrame1(){
  ctx.save();
  ctx.clearRect(0,0,width,height);
  ctx.fillStyle = "#ff62b1";
  ctx.font = "200px Codystar";
  ctx.fillText("3",500,600);
  ctx.fillStyle = "yellow";
  ctx.font = "80px Codystar";
  ctx.fillText("[tab]: shoot",270,700);
  ctx.restore();
}
function drawStartFrame2(){
  ctx.save();
  ctx.clearRect(0,0,width,height);
  ctx.fillStyle = "#ff62b1";
  ctx.font = "200px Codystar";
  ctx.fillText("2",500,600);
  ctx.fillStyle = "yellow";
  ctx.font = "80px Codystar";
  ctx.fillText("[<-] move left",250,700);
  ctx.fillText("[->] move right",250,800);
  ctx.restore();
}
function drawStartFrame3(){
  ctx.save();
  ctx.clearRect(0,0,width,height);
  ctx.fillStyle = "#ff62b1";
  ctx.font = "200px Codystar";
  ctx.fillText("1",500,600);  
  ctx.fillStyle = "yellow";
  ctx.font = "80px Codystar";
  ctx.fillText("みんな大好き",320,720);
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

function drawRainbowBorder(){
  var lessFrames = Math.floor(frames%10/6); // gives 0 or 1
  if (lessFrames == 0) {
    ctx.save();
    ctx.beginPath();
    var gradient=ctx.createLinearGradient(0,0,width,height);
    gradient.addColorStop("0","#1bc9ee");
    gradient.addColorStop("0.2","#6647f0");
    gradient.addColorStop("0.4","#ff62b1");
    // gradient.addColorStop("0.6","fe0000");
    // gradient.addColorStop("1.0","#fff7b4");
    ctx.strokeStyle=gradient;
    ctx.setLineDash([5,5]);
    ctx.lineWidth=15;
    ctx.strokeRect(0,0,width,height);
    ctx.closePath();
    ctx.restore();
  } 

  else {
    ctx.save();
    ctx.beginPath();
    var gradient=ctx.createLinearGradient(0,0,width,height);
    gradient.addColorStop("0.6","yellow");
    gradient.addColorStop("1.0","#fff7b4");
    ctx.strokeStyle=gradient;
    ctx.setLineDash([20,15]);
    ctx.lineWidth=15;
    ctx.strokeRect(0,0,width,height);
    ctx.closePath();
    ctx.restore();
  }
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

//BULLETS 

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

function drawBoni(){
  for (var i = 0; i < allBoni.length; i++) {
  allBoni[i].draw();
  }
}
//moveEvils moves the Evils and removes them from the array if they leave the playing field. 
//When Evil leaves the y Axis, EvilsToCreate is set +1 

function moveBoni(){
  for (var i = 0; i < allBoni.length; i++) {
    allBoni[i].changePosition();
    if ((allBoni[i].y) > playingField.yMin){
    boniToCreate++;
  }
}

  allBoni = allBoni.filter(function(element){
    return (element.y < playingField.yMin) 
  });
}

//checkCollissionFighterSquareBall() checks if fighter and squareBall meet 
//yCollision checks if they collide on y axis
//xCollissionA checks if the edge of the squareBall is right of the left outer edge of the fighter
//xCollisionB checks the same for the right edge of the fighter

function checkCollissionFighterSquareBall(squareBall) {
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
    pongSound.play();
  };

};

//checkCollissionFighterBullet checks if ONE Bullet b part of allBullets 
//collides with ONE Evil e part of allEvils 

function checkCollissionFighterBullet(){
  if(allEvils.length>0){
    var ColBulletEvilY = false;
    var ColBulletEvilX = false;
    // var numberOfCollissions; 

    for (let e = 0; e < allEvils.length; e++) {
      for (let b = 0; b < allBullets.length; b++) { 
          ColBulletEvilY = ((allEvils[e].y)+75  > allBullets[b].y);
          ColBulletEvilX = ( (allEvils[e].x <= allBullets[b].x) && (allEvils[e].x + 75 > allBullets[b].x));

            if (ColBulletEvilY && ColBulletEvilX){
              evilShotSound.play(); 
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
      fighterHurtSound.play();
      setTimeout(function(){fighter.color ="white";}, 500);
    };

    
  }

};

function checkCollissionFighterBonus(){
  var yCollissionTop = false;
  var xCollissionA = false ;
  var xCollissionB = false;

  for (var e = allBoni.length-1; e >= 0; e-- ) {
    
    if((allBoni[e].y+ 75) >= (playingField.yMin-fighter.height)){
    yCollissionTop  = true};
  
    if ((allBoni[e].x + 75 > fighter.x) === true){
      xCollissionA = true};
    if(allBoni[e].x < (fighter.x + fighter.width) === true){
      xCollissionB = true};
  
    if (xCollissionA && xCollissionB && yCollissionTop){
      allBoni.splice(e,1);
      fighter.score+=30; 
      collectBonusSound.play();
      boniToCreate++;
      fighter.color ="#ff62b1";
      fighter.width=200; 
      //new sound 
      setTimeout(function(){
      fighter.color ="white";
      fighter.width=140;
      }, 500);
    };

    
  }


}

setInterval(function()
{
  ctx.clearRect(0,0,width,height);
  ctx.save(); 
  frames++;

  //INTRO FRAMES 


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
  
//GAME STARTS 

  if (frames>480){
  
    drawBorder(); 

    // drawBorder();
    
    drawBullets(); 
    moveBullets();
    drawScore();
    drawLives(); 
    fighter.draw(ctx);

    //draw ball, if we are still alive. 
    if (fighter.lives>0) {

      squareBall.draw();
      squareBall.changePosition(playingField,canvas,fighter);
      checkCollissionFighterSquareBall(squareBall);

      //INTRODUCING BONUS
      while (boniToCreate>0){
      fighter.createBonus(bonusImages,allBoni,playingField);
      boniToCreate--;
       };

      if(fighter.score>50){

        //EFFECTS 
        if (fighter.score<100){
          drawRainbowBorder();
          if (musicToPlay>2){
            nextLevelSound.play();  
            musicToPlay++;
          }
        };

        //INTRODUCING EVILS! 

        while (evilsToCreate>0){
          fighter.createEvils(evilImages,allEvils,playingField);
          evilsToCreate--;
        };

        if(fighter.score>1500){
          if(squareBallSpeedLevels>2){
            squareBall.vx=squareBall.vx*2;
            squareBallSpeedLevels--; 
          }


          if (fighter.score<1550){
            drawRainbowBorder();
            nextLevelSound.play();  
            };
       
        };

        
      } 
      drawBoni();
      moveBoni(); 
      checkCollissionFighterBonus();

      drawEvils();
      moveEvils();     
      checkCollissionFighterBullet();
      checkCollissionFighterEvil();
    }

      if (fighter.lives <= 0) {
        // gameOverSound.play();
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
    e.preventDefault();
    switch (e.keyCode) {
      case 39:
        fighter.moveRight(playingField);
        break;
      
      case 37:
        fighter.moveLeft(playingField);
        break;

      case 32:
        fighter.createBullets(allBullets);
        break;
    }
  
}

