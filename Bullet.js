function Bullet (x=0,y=-1,vx,vy,color="yellow",ctx,width=10,height=10,ay) {
this.x = x;
this.y = y;
this.vx = vx;
this.vy = vy;
this.color = color;
this.ctx = ctx; 
this.width = width;
this.height = height;
this.ay = ay; 
}

Bullet.prototype.draw = function () {
  this.ctx.save();
  this.ctx.beginPath();
  this.ctx.rect(this.x,this.y,this.width,this.height);
  this.ctx.fillStyle = this.color;
  this.ctx.fill();
  this.ctx.closePath();
  this.ctx.restore();
  }

Bullet.prototype.changePosition = function () {
    this.x += this.vx; 
    this.y += (this.vy + this.ay);
}