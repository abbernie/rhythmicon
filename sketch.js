var audioCtx = new (window.AudioContext || window.webkitAudioContext)();



let num1 = document.getElementById("number1");
let num2 = document.getElementById("number2");
 console.log(num1.value);
let slider = document.getElementById("freq");
let freq = slider.value;
let display = document.getElementById("display");
console.log(freq);

// create Oscillator node
var osc1 = audioCtx.createOscillator();
var osc2 = audioCtx.createOscillator();
var gain1 = audioCtx.createGain();
var gain2 = audioCtx.createGain();
var pan1 = new PannerNode(audioCtx);
var pan2 = new PannerNode(audioCtx);


osc1.type = 'square';
osc1.frequency.setValueAtTime(num1.value * freq, audioCtx.currentTime); // value in hertz
pan1.positionX.setValueAtTime(-1, audioCtx.currentTime);
osc1.connect(pan1);
pan1.connect(gain1);

osc2.type = 'square';
osc2.frequency.setValueAtTime(num2.value * freq, audioCtx.currentTime); // value in hertz
pan2.positionX.setValueAtTime(1, audioCtx.currentTime);
osc2.connect(pan2);
pan2.connect(gain2);

gain1.gain.setValueAtTime(0.5, audioCtx.currentTime);
gain1.connect(audioCtx.destination);
gain2.gain.setValueAtTime(0.5, audioCtx.currentTime);
gain2.connect(audioCtx.destination);



slider.onchange = function(e){

  freq = e.target.value;
  osc1.frequency.setValueAtTime(num1.value * freq, audioCtx.currentTime);
  osc2.frequency.setValueAtTime(num2.value * freq, audioCtx.currentTime);
  display.innerHTML = freq;
  console.log("changed")

}

num1.onchange = function(e){

  osc1.frequency.setValueAtTime(num1.value * freq, audioCtx.currentTime);

  console.log(e.target.value);

}

num2.onchange = function(e){

  osc2.frequency.setValueAtTime(num2.value * freq, audioCtx.currentTime);

  console.log(e.target.value);

}


let toggle = 0;

function clicked(){
  if(toggle == 0){
    osc1.start();
    osc2.start();
    toggle = 1;
  } else if(toggle == 1){
    gain1.gain.setValueAtTime(0, audioCtx.currentTime);
    gain2.gain.setValueAtTime(0, audioCtx.currentTime);

    toggle = 2;
    console.log("me")
  } else if(toggle == 2){
    gain1.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gain2.gain.setValueAtTime(0.5, audioCtx.currentTime);
    toggle = 1;
  }
  console.log(toggle)
}
