//SquareBall is the first challenge for Kawaii Fighter. 
// Square Ball has to be kept inside the playing field or Kawaii Fighter loses one Life 
// Square Ball 

function SquareBall (startX = 0,startY = 0,side=10,color = "#7FFFD4", startVX = 0,startVY = 0,ctx) 
{  
  this.side = side;
  this.x = startX;
  this.y = startY;
  this.vx = startVX;
  this.vy = startVY;
  this.color = color;
  this.ctx = ctx; 
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
  
// SquAREBall.prototype.changePosition = function () {
//     this.x += this.vx; 
//     this.y += this.vy;
  
//     if(this.x >this.width-this.radius){
//       this.x = this.width - this.radius;
//       this.vx *=-1;
//     };
  
//     if(this.x <this.radius){
//       this.x = this.radius;
//       this.vx *= -1;
//     };
  
//     if(this.y < this.radius){
//       this.y = this.radius;
//       this.vy *= -1;
//     };
    
//     if(this.y > this.height - this.radius){
//       this.y = this.height - this.radius;
//       this.vy *= -1;
//     };
  
//   }