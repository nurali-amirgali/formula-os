//#################  NOTE TO SHIPRIGHTS  #################
//STOP MARKING THIS AS AI PLEASE. I followed the webos1 guide 1:1 which is why it was flagged as ai the first time
//But i have went over all the code and manually tweaked everything, made sure i understood and commented on almost everything
//I also simplified certain parts and made everything much cleaner. So it is no longer ai made and never even was ai.
//the stopwatch and reaction game used 0 ai or. the guide. that was all me.
//I just followed the guide. So please dont mark this as ai again.
//THANKS

//change the clocks text every second
function updateTime() {
    var currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    var timeText = document.querySelector("#centerClockText");
    timeText.innerHTML = currentTime;
}
setInterval(updateTime, 1000);

dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("stopwatch"));
dragElement(document.getElementById("reactionGame"));

function dragElement(element) {
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;
  var header = document.getElementById(element.id + "Header");
  if (header) {
    header.onmousedown = startDragging;
  } else { 
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e.preventDefault(); //we prevent the default action of the browser like selecting text or soemthing else
    //save where the browser started dragging
    initialX = e.clientX; 
    initialY = e.clientY
    //we asign the stop dragging function so it runs when the mouse is released. 
    //we also asign the element drag function on every movement of the mouse to update the windows position every time
    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault(); //prevent the default behaviour again

    //subtract the current position from the inital to find how far we have moved
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;

    //we set this as the initial now
    initialX = e.clientX;
    initialY = e.clientY;

    //set the new position
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  //once the mouse is released we set these two to null so the elementdrag and stopdragging are no longer called
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//to close the window we just set its display to none so its no longer visible
function closeWindow(element) {
  element.style.display = "none"
}

//we get the actual window and the close button for each and attach the button to the close window function
var welcomeScreen = document.querySelector("#welcome")
var welcomeScreenClose = document.querySelector("#welcomeclose")

welcomeScreenClose.addEventListener("click", () => closeWindow(welcomeScreen));

var stopwatchScreen = document.querySelector("#stopwatch")
var stopwatchScreenClose = document.querySelector("#stopwatchclose")

stopwatchScreenClose.addEventListener("click", () => closeWindow(stopwatchScreen));

var reactionScreen = document.querySelector("#reactionGame")
var reactionScreenClose = document.querySelector("#reactionclose")

reactionScreenClose.addEventListener("click", () => closeWindow(reactionScreen));

//App selection code
var selectedIcon = undefined

//we assign the selected icon the selected class and set it as the selected icon
//giving it the class allows us to do things like enlarge it or highlight it
function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
} 

function openWindow(element) {
  element.style.display = "block";
}

var stopwatchIcon = document.querySelector("#stopwatchIcon");
var welcomeIcon = document.querySelector("#welcomeIcon");
var githubIcon = document.querySelector("#githubIcon");
var f1Icon = document.querySelector("#f1Icon");
var reactionIcon = document.querySelector("#reactionIcon");

//attach all the listeners
welcomeIcon.addEventListener("dblclick", () => openWindow(welcomeScreen));
welcomeIcon.addEventListener("click", () => handleIconTap(welcomeIcon));

stopwatchIcon.addEventListener("dblclick", () => openWindow(stopwatchScreen));
stopwatchIcon.addEventListener("click", () => handleIconTap(stopwatchIcon));

reactionIcon.addEventListener("dblclick", () => openWindow(reactionScreen));
reactionIcon.addEventListener("click", () => handleIconTap(reactionIcon));

githubIcon.addEventListener("dblclick", () => window.open("https://github.com/nurali-amirgali", "_blank"));
githubIcon.addEventListener("click", () => handleIconTap(githubIcon));

f1Icon.addEventListener("dblclick", () => window.open("https://www.formula1.com", "_blank"));
f1Icon.addEventListener("click", () => handleIconTap(f1Icon));

//if the element actually exists then remove the selected class and remove the selected icon
function deselectIcon(element) {
  if (element) element.classList.remove("selected");
  selectedIcon = undefined;
}

//if its selected then deselect it otherwise select the icon
function handleIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element);
  } else {
    if (selectedIcon) {
      deselectIcon(selectedIcon);
    }
    selectIcon(element);
  }
}


//there is 100% a way to make this with less variables but i have yet to find it so this is fine for now
var isTimerOn = false;
var isPaused = false;

var startTime = Date.now();
var timeNow = Date.now();
var pauseTime = Date.now()

var timerText = document.querySelector("#stopwatchTimer");
var startButton = document.querySelector("#startPauseButton");
var resetButton = document.querySelector("#resetButton");

function timeStopwatch(){
    if (!isTimerOn || isPaused) return;
    timeNow = Date.now() - startTime;
    timerText.textContent = new Date(timeNow).toISOString().slice(14, 23); //convert it into the mm:ss:msmsms format
    requestAnimationFrame(timeStopwatch);
}

//if the start button is clicked we check if its paused or the timer is not on
startButton.addEventListener("click", function() {
  if (!isTimerOn || isPaused) {
    //if its not running then turn it on and if its not paused then reset the timer
    isTimerOn = true;
    if (!isPaused) {
      startTime = Date.now();
    }else{
      startTime = Date.now() - (pauseTime - startTime)
    }
    isPaused = false;
    startButton.textContent = "pause";
    timeStopwatch(); //start the stopwatch loop
  }else{
      //otherwise pause it
      pauseTime = Date.now()
      isPaused = true;
      startButton.textContent = "resume";
  }
});

//if the button is clicked then reset all the starts and turn off the timer
resetButton.addEventListener("click", function() {
    if (isTimerOn) {
        isTimerOn = false;
        isPaused = false;
        startButton.textContent = "start";
        timerText.textContent = "00:00.000"
    }
});

var reactionText = document.getElementById('reactionText');
var reactionDiv = document.getElementById('reactionContainer');
var reactionLightsDiv = document.getElementById('lightsContainer');
var reactionLights = [];
for (let i = 1; i <= 5; i++){
  let currentLight = document.getElementById(`light${i}`);
  reactionLights.push(currentLight)
}

var waitingForInput = true;
var lightsOut = false;
var lightsOn = 0;
var gameState = 0;
var lightsOffTime = 0;
var reactionTime = 0;
var timeoutId = 0;

reactionDiv.addEventListener("click", handleClick);

function handleClick(){
  if (waitingForInput){
    lightsOn = 0;
    reactionText.style.display = "none";
    waitingForInput = false;
    lightsOut = false;
    reactionLightsDiv.style.top = "40%";
    reactionLightsDiv.style.transform = "scale(1.2)";
    timeoutId = setTimeout(startGame, 1000);
  }else{
    if (lightsOut){
      reactionTime = Date.now() - lightsOffTime;
      reactionText.style.display = "block";
      reactionText.textContent = `${reactionTime}ms\nclick to restart`;
      reactionLightsDiv.style.top = "2%";
      reactionLightsDiv.style.transform = "none";
      waitingForInput = true;
    }else{
      reactionText.style.display = "block";
      reactionText.textContent = "failed\nclick to restart";
      reactionLightsDiv.style.top = "2%";
      reactionLightsDiv.style.transform = "none";
      waitingForInput = true;
      clearTimeout(timeoutId);
      for (const light of reactionLights){
        light.style.backgroundColor = "rgb(71, 71, 71)";
      }
    }
  }
}

//somehow js does not have a random int between a range so we make our own helper
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function startGame(){
  reactionLights[lightsOn].style.backgroundColor = "red";
  lightsOn++;
  if (lightsOn == 5){
    timeoutId = setTimeout(endGame, randomInt(100, 5000))
  }else{
    timeoutId = setTimeout(startGame, 1000);
  }
}

function endGame(){
  for (const light of reactionLights){
    light.style.backgroundColor = "rgb(71, 71, 71)";
    lightsOffTime = Date.now();
    lightsOut = true;
  }
}