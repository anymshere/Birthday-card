window.addEventListener("load",()=>{
document.body.classList.add("loaded");
});

/* Intro */
function startParty(){
document.getElementById("intro").style.display="none";
document.querySelector(".container").style.display="block";
document.getElementById("ytplayer").src=
"https://www.youtube.com/embed/sqkzN2Ye_pk?autoplay=1&loop=1&playlist=sqkzN2Ye_pk";
createFireworkBlast();
}

/* Matrix */
const matrixCanvas=document.getElementById("matrix");
const mtx=matrixCanvas.getContext("2d");
matrixCanvas.width=window.innerWidth;
matrixCanvas.height=window.innerHeight;
const letters="01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize=14;
const columns=matrixCanvas.width/fontSize;
const drops=[];
for(let i=0;i<columns;i++) drops[i]=1;
function drawMatrix(){
mtx.fillStyle="rgba(0,0,0,0.05)";
mtx.fillRect(0,0,matrixCanvas.width,matrixCanvas.height);
mtx.fillStyle="#0F0";
mtx.font=fontSize+"px monospace";
for(let i=0;i<drops.length;i++){
const text=letters[Math.floor(Math.random()*letters.length)];
mtx.fillText(text,i*fontSize,drops[i]*fontSize);
if(drops[i]*fontSize>matrixCanvas.height&&Math.random()>0.975)
drops[i]=0;
drops[i]++;
}
}
setInterval(drawMatrix,33);

/* Fireworks */
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

/* Floating Particles */
const particleContainer=document.getElementById("particles");
for(let i=0;i<40;i++){
let particle=document.createElement("div");
particle.classList.add("particle");
particle.style.left=Math.random()*100+"vw";
particle.style.animationDuration=(5+Math.random()*5)+"s";
particleContainer.appendChild(particle);
}

/* Parallax */
document.addEventListener("mousemove",(e)=>{
const x=(window.innerWidth/2-e.pageX)/40;
const y=(window.innerHeight/2-e.pageY)/40;
document.querySelectorAll(".parallax-layer")
.forEach(layer=>{
layer.style.transform=`rotateY(${x}deg) rotateX(${y}deg)`;
});
});

/* Slide Animation */
const sliders=document.querySelectorAll(".slide");
const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
},{threshold:0.2});
sliders.forEach(slide=>observer.observe(slide));

/* Cake */
function cutCake(){
document.getElementById("cakeMessage").innerText=
"🎂 Cake Cut! Party Mode Activated!";
createFireworkBlast();
}

/* Game */
let score=0;
const gift=document.getElementById("gift");
const gameArea=document.getElementById("gameArea");
function moveGift(){
let x=Math.random()*(gameArea.clientWidth-40);
let y=Math.random()*(gameArea.clientHeight-40);
gift.style.left=x+"px";
gift.style.top=y+"px";
}
gift.onclick=()=>{
score++;
document.getElementById("score").innerText="Score: "+score;
moveGift();
};
setInterval(moveGift,1000);
moveGift();

/* Quiz */
const answers=["black","football","pizza"];
const questions=[
"Dost ka favourite color?",
"Dost ka favourite game?",
"Dost ka favourite food?"
];
let current=0;
function checkAnswer(){
let input=document.getElementById("answerInput").value.toLowerCase();
if(input===answers[current]){
current++;
if(current<questions.length){
document.getElementById("question").innerText=questions[current];
}else{
document.getElementById("quizResult").innerText="👑 Legend!";
}
}else{
document.getElementById("quizResult").innerText="❌ Try Again!";
}
}

/* Secret */
let secret="";
document.addEventListener("keydown",(e)=>{
secret+=e.key.toLowerCase();
if(secret.includes("legend")){
alert("🎁 SECRET MODE ACTIVATED!");
createFireworkBlast();
document.body.style.background=
"linear-gradient(45deg,#ff00ff,#00ffff)";
secret="";
}
});
