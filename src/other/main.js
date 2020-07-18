var keyDown = []; //true at newly pressed keys, false everywhere else

onkeydown = function(key){
    keyDown[key.which] = true; //Set keydown to true at index of keycode
}

var c = document.createElement("canvas"); //Creates a canvas to draw on

document.body.append(c); //Attaches the canvas to the HTML of the page

var ctx = c.getContext("2d"); //Creates a 'pen' for us to draw on the canvas with

var gravity = 0.00025; //gravity is positive because the canvas starts at y=0 at the top

var bird = {
    height: 0.5,
    velocity: 0,
}

//These lines increase the resolution of the canvas by changing the amount of pixels it uses.
var scale = 2;
c.width = window.innerWidth * scale;
c.height = window.innerHeight * scale;


//We will do per-frame game logic here
function update(){
    //Clear the canvas
    ctx.clearRect(0, 0, c.width, c.height);
    if(!gameOver){
        //Update the bird's position to account for gravity
        bird.velocity += gravity; //positive change in y goes down because the canvas starts at 0 on top
        bird.height += bird.velocity;

        //Check if spacebar is being pressed
        if(keyDown[32]){
            bird.velocity = -0.01; //If it is, set the bird's velocity to point up.
        }

        //Draw the bird (It's really a circle);
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc((c.width / 2) - c.height / 4, bird.height * c.height, c.height / 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        //Update the pipes
        updatePipes();

        //clear the keyDown array
        keyDown = [];

        //Draw score text
        ctx.fillStyle = "black";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 10;
        ctx.font = "50px sans-serif";
        ctx.strokeText("Score: " + score, 50, 50);
        ctx.fillText("Score: " + score, 50, 50);
    } else {
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, c.width, c.height); //
        ctx.fillStyle = "black";
        ctx.font = "50px sans-serif";
        ctx.fillText("Game Over!", c.width / 2, c.height / 2);
    }
}

//Calls the update function every 1000/60 milliseconds, which is equal to roughly sixty times per second. This means we'll have a 60 FPS game.
setInterval(update, 1000/60);

var gameOver = false; //tells whether or not the game is over

var pipes = []; //All of the pipes' data will be stored here.

function makePipe(){
    var pipe = {
        x: c.width, //x coordinate of pipe. Starts at the right edge of the canvas
        gapY: (Math.random() * c.height * 3/4) + 1/8 * c.height, //y coordinate of the center of the gap in the pipe. Set to a random number in the middle 3/4 of the canvas
        gapHeight: 2/8 * c.height, //Size of the gap
        width: c.height / 6, //Width of the pipe
        scored: false //whether or not a pipe has been scored
    }

    pipes.push(pipe); //Add the pipe to the pipes array. This is the equivalent of .append() in python
}

setInterval(makePipe, 2000); //Make a pipe every 2 seconds. The function takes milliseconds as an argument.

var score = 0; //keeps track of score

function updatePipes(){
    for(i of pipes){
        //If past the pipe's entrance, count the pipe as scored and increment the score variable
        if(((c.width / 2) - c.height / 4) > i.x && !i.scored){ 
            i.scored = true;
            score++;
        }


        i.x -= 0.005 * c.height; //move each pipe to the left
        if(Math.abs(bird.height * c.height - i.gapY) > i.gapHeight / 2 && ((c.width / 2) - c.height / 4) > i.x && ((c.width / 2) - c.height / 4) < i.x + i.width){ //If the bird is outside of the gap but in the pipe
            gameOver = true; //If the bird touches the pipe, end the game
        }
        ctx.fillRect(i.x, 0, i.width, i.gapY - i.gapHeight / 2);//Draw the top of the pipe
        ctx.fillRect(i.x, i.gapY + i.gapHeight/2, i.width, c.height);//Draw the top of the pipe

    }
}