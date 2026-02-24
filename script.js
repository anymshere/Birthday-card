function startParty(){
document.getElementById("intro").style.display="none";
document.querySelector(".container").style.display="block";

document.getElementById("ytplayer").src =
"https://www.youtube.com/embed/sqkzN2Ye_pk?autoplay=1&loop=1&playlist=sqkzN2Ye_pk";

createFireworkBlast();
}

// 🎇 Fireworks
const canvas=document.getElementById("fireworks");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];

function createFireworkBlast(){
for(let i=0;i<100;i++){
particles.push({
x:canvas.width/2,
y:canvas.height/2,
radius:2,
color:`hsl(${Math.random()*360},100%,50%)`,
speedX:(Math.random()-0.5)*8,
speedY:(Math.random()-0.5)*8,
life:100
});
}
}

function animate(){
ctx.fillStyle="rgba(0,0,0,0.2)";
ctx.fillRect(0,0,canvas.width,canvas.height);

particles.forEach((p,index)=>{
ctx.beginPath();
ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
ctx.fillStyle=p.color;
ctx.fill();
p.x+=p.speedX;
p.y+=p.speedY;
p.life--;
if(p.life<=0) particles.splice(index,1);
});
requestAnimationFrame(animate);
}
animate();

// 🎂 Cake
function cutCake(){
document.getElementById("cakeMessage").innerText="🎂 Cake Cut! Party Mode Activated!";
createFireworkBlast();
}

// 🎮 Mini Game
let score=0;
const gift=document.getElementById("gift");
const gameArea=document.getElementById("gameArea");

function moveGift(){
let x=Math.random()*(gameArea.clientWidth-40);
let y=Math.random()*(gameArea.clientHeight-40);
gift.style.left=x+"px";
gift.style.top=y+"px";
}

gift.addEventListener("click",()=>{
score++;
document.getElementById("score").innerText="Score: "+score;
moveGift();
});

setInterval(moveGift,1000);
moveGift();
