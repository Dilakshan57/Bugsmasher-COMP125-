const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const bugSize = 40;
const maxSpeed = 1000; // Maximum hopping interval in milliseconds
let interval = 2000; // Initial hopping interval
let score = 0;
let bugX, bugY;
let timer;
let selectedTime = 30; // Default timer duration

// Function to draw the bug on the canvas
function drawBug() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = new Image();
    img.src = 'https://media.istockphoto.com/id/1168803180/vector/ladybug-icon-isolated-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=rSfX20GnzAy89mWpRkDd761cC8SoKhz_enLCgh7To2s='; 
    ctx.drawImage(img, bugX, bugY, bugSize, bugSize);
}

// Function to get a random position for the bug on the canvas
function getRandomPosition() {
    const x = Math.floor(Math.random() * (canvas.width - bugSize));
    const y = Math.floor(Math.random() * (canvas.height - bugSize));
    return { x, y };
}

// Function to move the bug on the canvas
function moveBug() {
    const position = getRandomPosition();
    bugX = position.x;
    bugY = position.y;
    drawBug();
    timer = setTimeout(moveBug, interval);
}

// Function to start the game
function startGame() {
    clearTimeout(timer);
    score = 0;
    interval = 2000;
    document.getElementById("score").textContent = score;
    moveBug();
}

// Function to increase the score when the bug is clicked
function increaseScore() {
    score += 10;
    document.getElementById("score").textContent = score;
    clearInterval(timer);
    interval -= 100; // Decrease the hopping interval by 100 milliseconds
    if (interval < maxSpeed) {
        interval = maxSpeed;
    }
    moveBug();
}

// Function to reset the score to 0
function resetScore() {
    score = 0;
    document.getElementById("score").textContent = score;
}

// Function to reset the speed of the bug hopping
function resetSpeed() {
    clearTimeout(timer);
    interval = 2000;
    moveBug();
}

// Function to update the game timer
function updateTime() {
    clearTimeout(timer);
    const timerSelect = document.getElementById("timer");
    selectedTime = parseInt(timerSelect.value);
    startGame();
    setTimeout(function () {
        clearTimeout(timer);
        resetScore();
    }, selectedTime * 1000);
}

// Event listener for clicking on the canvas to catch the bug
canvas.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (
        mouseX >= bugX &&
        mouseX <= bugX + bugSize &&
        mouseY >= bugY &&
        mouseY <= bugY + bugSize
    ) {
        increaseScore();
    }
});

// Start the game initially
startGame();
