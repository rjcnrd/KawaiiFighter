//SquareBall is the first challenge for Kawaii Fighter. 
// Square Ball has to be kept inside the playing field or Kawaii Fighter loses one Life 
// Square Ball 

function SquareBall (startX = 0,startY = 0,startVX = 0,startVY = 0,side=10,color = "#7FFFD4",ctx,ax=0) 
{  
  this.x = startX;
  this.y = startY;
  this.vx = startVX;
  this.vy = startVY;
  this.side = side;
  this.color = color;
  this.ctx = ctx; 
  this.ax= ax; 
}

//draw()

SquareBall.prototype.draw = function () {
  this.ctx.save();
  this.ctx.beginPath();
  this.ctx.rect(this.x,this.y,this.side,this.side);
  this.ctx.fillStyle = this.color;
  this.ctx.fill();
  this.ctx.closePath();
  this.ctx.restore();
  }

  

//Change position  reflects ball on left,right, and top border and changes the ball status if 
// the ball is lost. 

SquareBall.prototype.changePosition = function (playingField,canvas,fighter) {
    this.x += this.vx; 
    this.y += this.vy;
    this.xy += this.ax;
  //reflect on right border
    if(this.x >= playingField.xMax-this.side){
      // console.log("touched right",this.x);
      this.x = playingField.xMax - this.side;
      this.vx *=-1;
    };
  //Reflect on left border

    if(this.x <=playingField.xMin){
      this.x = playingField.xMin+1;
      // console.log("touched left",this.x);
      this.vx *= -1;
    };

    //reflect on top border 
  
    if(this.y === playingField.yMax){
      this.y = playingField.yMax;
      // console.log("touched top",this.y);
      this.vy *= -1;
    };

    //check if ball is lost

    if(this.y > document.getElementById("canvas").height){
      ballLostSound.play(); 
      fighter.lives -= 1;
      //shoot the ball back in if the fighter is still living! 
      if(fighter.lives>0){
        var randomVx =  Math.floor(Math.random()*21)-10; //random start speed for the ball
        var randomVy =  Math.floor(Math.random()*21)-10; //random start speed for the ball  
        // this.color = ;
        this.x = playingField.xMax;
        this.y = (playingField.yMax);     
        this.vx = this.vx;
        this.vy = this.vy;
      }
      console.log("fighter.live",fighter.lives);
    }
  
  }