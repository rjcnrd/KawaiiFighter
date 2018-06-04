//SquareBall is the first challenge for Kawaii Fighter. 
// Square Ball has to be kept inside the playing field or Kawaii Fighter loses one Life 
// Square Ball 

function SquareBall (startX = 0,startY = 0,startVX = 0,startVY = 0,side=10,color = "#7FFFD4",ctx) 
{  
  this.side = side;
  this.x = startX;
  this.y = startY;
  this.vx = startVX;
  this.vy = startVY;
  this.color = color;
  this.ctx = ctx; 
  this.status = "bouncing"; //change status to lost if ball is lost by player (disappearing to y axis)
}

SquareBall.prototype.draw = function (ctx) {
  this.ctx.save();
  this.ctx.beginPath();
  this.ctx.rect(this.x,this.y,this.side,this.side);
  this.ctx.fillStyle = this.color;
  this.ctx.fill();
  this.ctx.closePath();
  this.ctx.restore();
  }
  

//Change position moves around the ball 

SquareBall.prototype.changePosition = function (playingField) {
    this.x += this.vx; 
    this.y += this.vy;
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
      console.log("touched top",this.y);
      this.vy *= -1;
    };
  
  }