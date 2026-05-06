function showTab(tab,btn){
document.querySelectorAll('.tabs button').forEach(b=>b.classList.remove('active'));
btn.classList.add('active');

clockTab.classList.add("hidden");
stopwatchTab.classList.add("hidden");
timerTab.classList.add("hidden");

document.getElementById(tab+"Tab").classList.remove("hidden");
}

/* CLOCK */
function updateClock(){
let tz=document.getElementById("timezone").value;
let d=new Date(new Date().toLocaleString("en-US",{timeZone:tz}));

let h=d.getHours();
let m=d.getMinutes();
let s=d.getSeconds();

greeting.innerText=h<12?"Good Morning ☀️":h<18?"Good Afternoon 🌤️":"Good Evening 🌙";

timeText.innerText=
`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;

date.innerText=d.toDateString();
}
setInterval(updateClock,1000);
updateClock();

/* STOPWATCH */
let sw=0,swInt;

function startSW(){
if(!swInt){
swInt=setInterval(()=>{sw++;updateSW();},1000);
}
}

function stopSW(){clearInterval(swInt);swInt=null;}

function resetSW(){sw=0;updateSW();}

function updateSW(){
let h=Math.floor(sw/3600);
let m=Math.floor((sw%3600)/60);
let s=sw%60;

document.getElementById("sw").innerText=
`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

/* TIMER */
let timerInt,remaining=0,total=0,paused=false;

function setPreset(sec){
hrs.value=Math.floor(sec/3600);
mins.value=Math.floor((sec%3600)/60);
secs.value=sec%60;
}

function startTimer(){
clearInterval(timerInt);

if(!paused){
let h=+hrs.value||0;
let m=+mins.value||0;
let s=+secs.value||0;
total=remaining=(h*3600)+(m*60)+s;
}

if(remaining<=0)return;

paused=false;

timerInt=setInterval(()=>{
remaining--;
updateTimer();
if(remaining<=0){
clearInterval(timerInt);
alert("⏰ Time Up!");
}
},1000);
}

function pauseTimer(){
clearInterval(timerInt);
paused=true;
}

function resetTimer(){
clearInterval(timerInt);
remaining=0;
paused=false;
hrs.value=mins.value=secs.value="";
updateTimer();
}

function updateTimer(){
let h=Math.floor(remaining/3600);
let m=Math.floor((remaining%3600)/60);
let s=remaining%60;

timerDisplay.innerText=
`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;

progressFill.style.width=total?(remaining/total)*100+"%":"0%";
}

/* THEME */
themeBtn.onclick=()=>document.body.classList.toggle("light");