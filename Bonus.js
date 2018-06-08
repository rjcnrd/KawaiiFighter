function Bonus (x = 0,y = 50,vx = 0,vy = 0,ay=0,image,ctx) 
{  
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.ay = ay;
  this.image = image;
  this.ctx = ctx; 
  this.height = image.height;
  this.width = image.width; 
}

Bonus.prototype.draw = function () {  
  
  this.ctx.save();
  this.ctx.beginPath();
  this.ctx.drawImage(this.image,this.x,this.y);
  this.ctx.closePath();
  this.ctx.restore();
  }

Bonus.prototype.changePosition = function () {

  this.x += this.vx;
  this.y += (this.vy + this.ay); 
   
}