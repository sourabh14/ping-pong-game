// Game Canvas
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext('2d');

// Ball movement
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 1.5;
var dy = -1.5;

// Paddle size
var paddleHeight = 10;
var paddleWidth = 120;
var paddleX = (canvas.width-paddleWidth) / 2;

// Paddle movement
var rightPressed = false;
var leftPressed = false;

// Player score
var score = 1;



// Event listeners for key press
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

// To draw a circle with radius 8
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
}

// To draw the paddles
function drawUpperPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, 0, paddleWidth, paddleHeight);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
}

function drawLowerPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
}

// Display score
function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: "+score, 8, 20);
}

// Draw the canvas
function draw() {
	// Clear the canvas before every draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawUpperPaddle();
    drawLowerPaddle();
    drawScore();
    // Changing position of ball by dx and dy
    x += dx;
    y += dy;

    // Bounce off the left and right edge
    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
	    dx = -dx;
	}

	// Upper and lower edge
	if(y + dy < ballRadius) {
		// Bounce off if ball hits the paddle
		if(x > paddleX && x < paddleX + paddleWidth) {
	        dy = -dy;
	        score++;
	    }
	    else { // Game over if ball hits otherwise
	        alert("GAME OVER\nYour score is : " + score);
	        document.location.reload();
	        clearInterval(interval);
	    }
	} 
	else if(y + dy > canvas.height-ballRadius) {
		// Bounce off if ball hits the paddle
		if(x > paddleX && x < paddleX + paddleWidth) {
	        dy = -dy;
	        score++;
	    }
	    else { // Game over if ball hits otherwise
	        alert("GAME OVER\nYour score is : " + score);
	        document.location.reload();
	        clearInterval(interval);
	    }
	}

	// Paddle movement
	if(rightPressed) {
	    paddleX += 9; // Move 9 pixel on right key press
	    if (paddleX + paddleWidth > canvas.width){
	        paddleX = canvas.width - paddleWidth;
	    }
	}
	else if(leftPressed) {
	    paddleX -= 9;
	    if (paddleX < 0){
	        paddleX = 0;
	    }
	}
	
	// Level up - increase ball speed
	if ((score % 10) == 0) {
		if (dx > 0) dx+=0.5;
		else dx-=0.5;

		if (dy > 0) dy+=0.5;
		else dy-=0.5;
		score++;
	}
}

// Call draw() after every 10 mx
var interval = setInterval(draw, 10);