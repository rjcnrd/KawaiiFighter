function Fighter (x=430,y=500,vx=0,vy=0,ax=0,ay=0,color="white",ctx) {
  this.x = x;
  this.y = y;
  this.vx = vx; 
  this.vy = vy;
  this.ax = ax;
  this.ay = ay;
  this.color= color;
  this.height= 40;
  this.width= 140;
  this.ctx = ctx;
}

//fither has  an initial position and can move to left or right.
// x : position in pixel.
// y: position in pixel 
// vx: velocity on x axis
// vy : velocity on y axis


Fighter.prototype.draw = function (ctx) {
  this.ctx.save();
  this.ctx.beginPath();
  this.ctx.rect(this.x,this.y,this.width,this.height);
  this.ctx.fillStyle = this.color;
  this.ctx.fill();
  this.ctx.closePath();
  this.ctx.restore();
  }

//move functions for right or left arrow 

Fighter.prototype.moveRight = function () {
  if(this.x<790)this.x +=60;
  else this.x = 805;
  console.log(this.x, "x");
  }

Fighter.prototype.moveLeft = function () {
    if (this.x> 70) this.x -=60;
    else this.x = 54;
    console.log(this.x, "x");
    }