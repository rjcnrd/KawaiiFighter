
var ctx = document.getElementById("canvas").getContext("2d");

var width =  1000;
var height = 600;
var background1 = new Image;
var background2 = new Image; 
background1.src = "images/background-1.png";
background2.src = "images/background-2.png";
var drawBackground1; 

// background1.onload = function() {
//   console.log("drawing image");
//     drawBackground1 = ctx.drawImage(background1, 0, 0)
//   };     

// background2.onload = function() {
//       drawBackground2 = ctx.drawImage(background2, 0, 0)
//       };



//background animation

var frames = 0; 

setInterval(function(){
ctx.clearRect(0,0,width,height);
ctx.save(); 
frames++; 
// console.log("frames",frames);
if (frames%2==0){
  
  // console.log("drawing background1");
  ctx.drawImage(background1,0,0);
}else
{;
  ctx.drawImage(background2,0,0);
};
fighter.draw(ctx);
ctx.save();
},1000/10)

fighter = new Fighter(430,500,0,0,0,0,"white",ctx);
fighter.draw(ctx);


document.getElementById("").onclick = function(){
  e.preventDefault();
  ball.vx *= 1.1;
}