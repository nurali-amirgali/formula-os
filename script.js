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

// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("stopwatch"))

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
    // Step 2: Set up variables to keep track of the element's position.
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

    // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
    function startDragging(e) {
      e = e || window.event;
      e.preventDefault();
      // Step 7: Get the mouse cursor position at startup.
      initialX = e.clientX;
      initialY = e.clientY;
      // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
      document.onmouseup = stopDragging;
      document.onmousemove = elementDrag;
    }

    // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // Step 10: Calculate the new cursor position.
      currentX = initialX - e.clientX;
      currentY = initialY - e.clientY;
      initialX = e.clientX;
      initialY = e.clientY;
      // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
      element.style.top = (element.offsetTop - currentY) + "px";
      element.style.left = (element.offsetLeft - currentX) + "px";
    }

    // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
    function stopDragging() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
}

var welcomeScreen = document.querySelector("#welcome")

function closeWindow(element) {
  element.style.display = "none"
}

var welcomeScreenClose = document.querySelector("#welcomeclose")

var welcomeScreenOpen = document.querySelector("#welcomeopen")

welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

var stopwatchScreen = document.querySelector("#stopwatch")

var stopwatchScreenClose = document.querySelector("#stopwatchclose")

stopwatchScreenClose.addEventListener("click", () => closeWindow(stopwatchScreen));

var selectedIcon = undefined

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
} 

var biggestIndex = 1;

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}

function handleWindowTap(element) {
  biggestIndex++;  
  element.style.zIndex = biggestIndex;
}

function openWindow(element) {
  element.style.display = "block";
  biggestIndex++;  
  element.style.zIndex = biggestIndex;
}

var stopwatchIcon = document.querySelector("#stopwatchIcon");
var welcomeIcon = document.querySelector("#welcomeIcon");

stopwatchIcon.addEventListener("dblclick", function() {
  openWindow(stopwatchScreen);
});

welcomeIcon.addEventListener("dblclick", function() {
  openWindow(welcomeScreen);
});

welcomeIcon.addEventListener("click", function() {
  handleIconTap(welcomeIcon);
});

stopwatchIcon.addEventListener("click", function() {
  handleIconTap(stopwatchIcon);
});

function deselectIcon(element) {
  if (element) {
    element.classList.remove("selected");
  }
  selectedIcon = undefined;
}

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

addWindowTapHandling(welcomeScreen);
addWindowTapHandling(stopwatchScreen);