const subtitle = document.getElementById("subtitle");
const body = document.body;

let phases = [
    "Between Stability and Collapse",
    "Between Stability and Collapse (Observed Drift)",
    "STABILITY THRESHOLD EXCEEDED",
    "LUMEN BREAKDOWN // TRUTH EMERGENCE"
];

let colors = [
    "#000000", // stable void
    "#261b33", //slight drift(purple hint)
    "#120022", //unstable purple
    "#2e0113", //corrupted reality
];



let current = 0; 

let audio;
try{
    audio = new Audio("lumen_hum.mp3");
    audio.loop = true; 
    audio.volume = 4; 
} catch (e) {         
    console.log("Audio failed to load:", e );
}

//try to start audio
window.addEventListener("click", () =>{
    if (audio && audio.paused) {
        audio.volume = 0;
        audio.play().then(() => {
            let vol = 0;
            let fade = setInterval(() => {
                vol += 0.02;
                audio.volume = Math.min(vol, 0.25);
                if(vol >= 0.25) clearInterval(fade);
            }, 100);
        }).catch(() => {});
    }
}); 

window.addEventListener("load", () => { 
    const boot = document.getElementById("bootText");
    const container = document.querySelector(".container");
    
    requestAnimationFrame(() => {
        document.body.style.opacity = 1;

    });

    setTimeout(() => {
        boot.style.opacity = 1;
    }, 500);

    setTimeout(() => {
        document.body.style.background = "#05010a";
    }, 1500);

    setTimeout(() => {
        boot.style.opacity = 0;
    }, 2500);
    
    
    setTimeout(() =>{
        const container = document.querySelector(".container");
        container.style.opacity = 1;
        container.style.transform = "translateY(0)";
    }, 3000);

}); 


const bootText = document.getElementById("bootText");
const bootStatus = document.getElementById("bootStatus");
const loadingFill = document.getElementById("loadingFill");
const bootScreen = document.getElementById("bootScreen");
const container = document.querySelector(".container");

let bootMessages = [
  "Initializing Lumen...",
  "Loading Core Systems...",
  "Stabilizing Reality...",
  "Aligning Memory Structures..."
];

let corruptedMessage = "ERROR: COHERENCE FAILURE DETECTED";

function typeText(text, callback) {
  let i = 0;
  bootText.textContent = "";

  let typing = setInterval(() => {
    bootText.textContent += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(typing);
      if (callback) setTimeout(callback, 500);
    }
  }, 40);
}

function runBootSequence() {
  let index = 0;

  function nextMessage() {
    if (index >= bootMessages.length) {
      startLoading();
      return;
    }

    typeText(bootMessages[index], () => {
      bootStatus.textContent = "";
      index++;
      setTimeout(nextMessage, 500);
    });
  }

  nextMessage();
}

function startLoading() {
  let progress = 0;

  let load = setInterval(() => {
    progress += Math.random() * 8;
    loadingFill.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(load);
      triggerCorruption();
    }
  }, 120);
}

function glitchText(text) {
  const chars = "!<>-_\\/[]{}—=+*^?#";
  return text
    .split("")
    .map(c => (Math.random() < 0.15 ? chars[Math.floor(Math.random() * chars.length)] : c))
    .join("");
}

function triggerCorruption() {
  let count = 0;

  let glitch = setInterval(() => {
    bootText.textContent = glitchText(corruptedMessage);
    count++;

    if (count > 10) {
      clearInterval(glitch);
      revealMainUI();
    }
  }, 80);
}

function revealMainUI() {
  document.body.style.background = "#05010a";

  bootScreen.style.opacity = 0;

  setTimeout(() => {
    bootScreen.style.display = "none";

    document.body.classList.remove("booting");

    container.style.opacity = 1;
    container.style.transform = "translateY(0)";

    
    startPhaseSystem();
  }, 1000);
}

function glitchText(text) {
    const chars = "!@<>-_\\/[]{}-=+*^?#______";
    return text
    .split("")
    .map(char => (Math.random()< 0.08 ? chars[Math.floor(Math.random()* chars.length)] : char))
    .join("");
} 

function updatePhase() {
    if (current >= phases.length) return;

    let baseText = phases[current];
    let flickerCount = 0; 

    //phase transtion effect
    let flicker = setInterval(() => {
        subtitle.textContent = glitchText(baseText);
        flickerCount++; 

        if (flickerCount > 8) {
            clearInterval(flicker);
            subtitle.textContent = baseText;
        }
    } , 60);
    //background shift

    body.style.background = colors[current];

    /*Audio Phase control*/
    if (!audio.paused) {
        if (current === 0) {
            audio.volume = 0.25;
            audio.playbackRate = 1.0;
        } 
        if (current === 1) {
            audio.volume = 0.3;
            audio.playbackRate = 0.95;
        } 

        if (current === 2) {
            audio.volume = 0.35;
            audio.playbackRate = 0.7;
        }  

        if (current === 3) {
            audio.volume = 0.4;
            audio.playbackRate = 0.5;
        } 

    }
    //Phase 3: system instability
    if (current === 2) {
        body.classList.add("shake");
    } 

    //PHASE 4: full breakdown
    if (current === 3) {
       document.querySelector(".container").classList.add("glitch");
    } 
    
    current++;
}



function startPhaseSystem() {
  setInterval(updatePhase, 3000);
} 


window.addEventListener("load", () => {
  document.body.classList.add("booting");

  requestAnimationFrame(() => {
    document.body.style.opacity = 1;
  });

  setTimeout(runBootSequence, 800);
});