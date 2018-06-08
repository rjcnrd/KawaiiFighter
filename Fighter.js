function Fighter (x=430,y=500,vx=0,vy=0,ax=0,ay=0,color="white",ctx,score=0,lives=3) {
  this.x = x;
  this.y = y;
  this.vx = vx; 
  this.vy = vy;
  this.ax = ax;
  this.ay = ay;
  this.color= color;
  this.height= 40; //height of player
  this.width= 140; //widt of player
  this.ctx = ctx;
  this.score = score;
  this.lives = lives; 
}

//fither has  an initial position and can move to left or right.
// x : position in pixel. y: position in pixel vx: velocity on x axis vy : velocity on y axis


Fighter.prototype.draw = function () {
  this.ctx.save();
  this.ctx.beginPath();
  this.ctx.rect(this.x,this.y,this.width,this.height);
  this.ctx.fillStyle = this.color;
  this.ctx.fill();
  this.ctx.closePath();
  this.ctx.restore();
  }

//move functions for right or left arrow 

Fighter.prototype.moveRight = function (playingField) 
  {
  if (playingField.xMax-(this.x + this.width)<=this.vx)
    {
    this.x = playingField.xMax - this.width
    }
    else this.x +=this.vx;
  };

Fighter.prototype.moveLeft = function (playingField) {
    if (this.x - playingField.xMin < this.vx)
      {
        this.x = playingField.xMin;
      }
    else this.x -= this.vx;
    };

Fighter.prototype.createBullets = function () {
  allBullets.push(new Bullet(this.x+(this.width/2)+2,this.y+this.height-10,-0.5,-10,"#1bc9ee",this.ctx,10,10,5));//tur
  allBullets.push(new Bullet(this.x+(this.width/2)+1,this.y+this.height-10,-0.3,-10,"#6647f0",this.ctx,10,10,5));//purp
  allBullets.push(new Bullet(this.x+(this.width/2)+1,this.y+this.height-10,-0.2,-10,"#ff62b1",this.ctx,10,10,5));//pink
  allBullets.push(new Bullet(this.x+(this.width/2)+1,this.y+this.height-10,-0.1,-10,"#fe0000",this.ctx,10,10,5));//red
  allBullets.push(new Bullet(this.x+(this.width/2),this.y+this.height-10,0,-10,"#fff7b4",this.ctx,10,10,5)); //yellow center 
  allBullets.push(new Bullet(this.x+(this.width/2)-1,this.y+this.height-10,0.1,-10,"#fe0000",this.ctx,10,10,5));//red 
  allBullets.push(new Bullet(this.x+(this.width/2)-1,this.y+this.height-10,0.2,-10,"#ff62b1",this.ctx,10,10,5)); // pink 
  allBullets.push(new Bullet(this.x+(this.width/2)-1,this.y+this.height-10,0.3,-10,"#6647f0",this.ctx,10,10,5)); //purple
  allBullets.push(new Bullet(this.x+(this.width/2)-2,this.y+this.height-10 ,0.5,-10,"#1bc9ee",this.ctx,10,10,5));//tur
  bulletShotSound.play(); 

  
}

Fighter.prototype.createEvils = function(images,allEvils,playingField){
  var selectImage = Math.floor(Math.random()*4);
  var selectPosition = playingField.xMin + Math.floor(Math.random()*(playingField.xMax-playingField.xMin-75));
  allEvils.push(new Evil(selectPosition,50,0,2,0,images[selectImage],this.ctx));
}       