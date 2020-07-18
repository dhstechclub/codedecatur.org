---
slug: "/tutorials/javascript/flappy-bird"
date: "2020-07-18"
title: "Creating (Bad) Flappy Bird in HTML5/Javascript"
author: "Carter Semrad"
---

![game](../images/flappy.png)

1.)
Open up a new folder in Visual Studio Code. In it, create two files: index.html and main.js:


## Creating HTML
2.)
Type the following markup into your index.html page. This will allow the javascript we write to control the html of the page:
```
<html>
    <head>

    </head>
    <body>

    </body>
    <script src="main.js"></script>
</html>
```



3.)
Also include the following style tag to ensure everything on the page is formatted correctly:
```
<html>
    <head>
        <style>
            body{
                margin: 0px;
                padding: 0px;
            }
            canvas{
                width: 100%;
                height: 100%;
            }
        </style>
    </head>
    <body>

    </body>
    <script src="main.js"></script>
</html>
```

## Setting up Canvas
4.)
Now, switch to the main.js file. In it, type the following lines to create a canvas, which we will use to draw shapes for the game:

```
var c = document.createElement("canvas"); //Creates a canvas to draw on

document.body.append(c); //Attaches the canvas to the HTML of the page

var ctx = c.getContext("2d"); //Creates a 'pen' for us to draw on the canvas with


//These lines increase the resolution of the canvas by changing the amount of pixels it uses.
var scale = 2;
c.width = window.innerWidth * scale;
c.height = window.innerHeight * scale;

5.)
    Type the following lines at the bottom of the file. The update function is where we will do most of the game’s logic, and the setInterval line calls the update function sixty times per second.

//We will do per-frame game logic here
function update(){

}

//Calls the update function every 1000/60 milliseconds, which is equal to roughly sixty times per second. This means we'll have a 60 FPS game.
setInterval(update, 1000/60);
```

6.)
Now, we’ll create a few variables necessary to the game’s core function, such as the bird’s height and velocity. We’ll store these in an object called bird:
```
var c = document.createElement("canvas"); //Creates a canvas to draw on

document.body.append(c); //Attaches the canvas to the HTML of the page

var ctx = c.getContext("2d"); //Creates a 'pen' for us to draw on the canvas with
______________________________________

var gravity = 0.00025; //gravity is positive because the canvas starts at y=0 at the top

var bird = {
    height: 0,
    velocity: 0,
}
______________________________________

//These lines increase the resolution of the canvas by changing the amount of pixels it uses.
var scale = 2;
c.width = window.innerWidth * scale;
c.height = window.innerHeight * scale;


//We will do per-frame game logic here
function update(){

}

//Calls the update function every 1000/60 milliseconds, which is equal to roughly sixty times per second. This means we'll have a 60 FPS game.
setInterval(update, 1000/60);

```
7.)
Now, add the following code into the update function. It will clear the canvas, so we can draw on it, update the bird’s position based on gravity, and then draw the bird on the canvas each frame:
```
//We will do per-frame game logic here
function update(){
    //Clear the canvas
    ctx.clearRect(0, 0, c.width, c.height);

    //Update the bird's position to account for gravity
    bird.velocity += gravity;//positive change in y goes down because the canvas starts at 0 on top

    bird.height += bird.velocity;

    //Draw the bird (It's really a circle);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc((c.width / 2) - c.height / 4, bird.height * c.height, c.height / 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}
```

If you open the index.html page in your browser now, you should see a black circle that falls on page load.

## Setting up controls
8.)
The following code allows us to tell when the user is pressing keys. Add it to the top of the main.js file. The array keyDown will be true at indexes of keys being pressed.
```
var keyDown = []; //true at newly pressed keys, false everywhere else

onkeydown = function(key){
    keyDown[key.which] = true; //Set keydown to true at index of keycode
}

Then, add the following code to the bottom of the update function, so the keys being pressed are cleared at the end of each frame:
//We will do per-frame game logic here
function update(){
    //Clear the canvas
    ctx.clearRect(0, 0, c.width, c.height);

    //Update the bird's position to account for gravity
    bird.velocity += gravity;//positive change in y goes down because the canvas starts at 0 on top

    bird.height += bird.velocity;

    //Draw the bird (It's really a circle);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc((c.width / 2) - c.height / 4, bird.height * c.height, c.height / 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

________________________________
    //clear the keyDown array
    keyDown = [];
________________________________
}
```
9.)
Now, we want the bird to flap, so we’ll check if the key spacebar is being pressed, which has a keycode of 32. If the player did press the spacebar, we want to set the bird’s velocity to be negative, because the canvas has a y of 0 at the top. Put this code in the update function:
```
//We will do per-frame game logic here
function update(){
    //Clear the canvas
    ctx.clearRect(0, 0, c.width, c.height);

    //Update the bird's position to account for gravity
    bird.velocity += gravity; //positive change in y goes down because the canvas starts at 0 on top
    bird.height += bird.velocity;

_____________________________________________
    //Check if spacebar is being pressed
    if(keyDown[32]){
        bird.velocity = -0.01; //If it is, set the bird's velocity to point up.
    }
_____________________________________________

    //Draw the bird (It's really a circle);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc((c.width / 2) - c.height / 4, bird.height * c.height, c.height / 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    //clear the keyDown array
    keyDown = [];
}
```
## Adding pipes
10.)
Now all we have to do is add the pipes to the game. We want to create these on the right side of the screen, with a gap at a random y coordinate on the canvas. The pipes will be stored in an array. We also want to add a gameOver variable so we can end the game when the player hits a pipe. We also want to create a pipe every 2 seconds. Type this code at the bottom of the file: 

```
var gameOver = false; //tells whether or not the game is over

var pipes = []; //All of the pipes' data will be stored here.

function makePipe(){
    var pipe = {
        x: c.width, //x coordinate of pipe. Starts at the right edge of the canvas
        gapY: (Math.random() * c.height * 3/4) + 1/8 * c.height, //y coordinate of the center of the gap in the pipe. Set to a random number in the middle 3/4 of the canvas
        gapHeight: 2/8 * c.height, //Size of the gap
        width: c.height / 6 //Width of the pipe
    }

    pipes.push(pipe); //Add the pipe to the pipes array. This is the equivalent of .append() in python
}


setInterval(makePipe, 2000); //Make a pipe every 2 seconds. The function takes milliseconds as an argument.
```



11.)
Now that we can create pipes, we want to move them. We can also make them check if they are hitting the player and set gameOver to true in the same loop. Here’s a function that does that. Put the function at the end of the file. We want to call it in the update function, so that the pipes are updated every frame:

```
function updatePipes(){
    for(i of pipes){
        i.x -= 0.005 * c.height; //move each pipe to the left
        if(Math.abs(bird.height * c.height - i.gapY) > i.gapHeight / 2 && ((c.width / 2) - c.height / 4) > i.x && ((c.width / 2) - c.height / 4) < i.x + i.width){ //If the bird is outside of the gap but in the pipe
            gameOver = true; //If the bird touches the pipe, end the game
        }
        ctx.fillRect(i.x, 0, i.width, i.gapY - i.gapHeight / 2);//Draw the top of the pipe
        ctx.fillRect(i.x, i.gapY + i.gapHeight/2, i.width, c.height);//Draw the top of the pipe

    }
}
```
```
//We will do per-frame game logic here
function update(){
    //Clear the canvas
    ctx.clearRect(0, 0, c.width, c.height);

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
______________________________
    //Update the pipes
    updatePipes();
______________________________
    //clear the keyDown array
    keyDown = [];
}
```

12.)
Now, we want to end the game when the gameOver variable is true. To do this, we can put an if statement around the update function’s contents and show the game over screen when gameOver is true:
```
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
    } else {
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, c.width, c.height); //
        ctx.fillStyle = "black";
        ctx.font = "50px sans-serif";
        ctx.fillText("Game Over!", c.width / 2, c.height / 2);
    }
}
```

13.)
Now, all we have to do is add a score. Let’s make sure each pipe is only scored once, and increment a score variable each time the player enters one. We also need to draw the score. Make the following changes in the code, surrounded by the underlines. This is also what your final code should look like (minus the unerlines):

```
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
_____________________________________
        //Draw score text
        ctx.fillStyle = "black";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 10;
        ctx.font = "50px sans-serif";
        ctx.strokeText("Score: " + score, 50, 50);
        ctx.fillText("Score: " + score, 50, 50);
_____________________________________
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
_____________________________________
        width: c.height / 6, //Width of the pipe
        scored: false //whether or not a pipe has been scored
_____________________________________
    }

    pipes.push(pipe); //Add the pipe to the pipes array. This is the equivalent of .append() in python
}

setInterval(makePipe, 2000); //Make a pipe every 2 seconds. The function takes milliseconds as an argument.


_____________________________________
var score = 0; //keeps track of score
_____________________________________

function updatePipes(){
    for(i of pipes){
_____________________________________
        //If past the pipe's entrance, count the pipe as scored and increment the score variable
        if(((c.width / 2) - c.height / 4) > i.x && !i.scored){ 
            i.scored = true;
            score++;
        }
_____________________________________


        i.x -= 0.005 * c.height; //move each pipe to the left
        if(Math.abs(bird.height * c.height - i.gapY) > i.gapHeight / 2 && ((c.width / 2) - c.height / 4) > i.x && ((c.width / 2) - c.height / 4) < i.x + i.width){ //If the bird is outside of the gap but in the pipe
            gameOver = true; //If the bird touches the pipe, end the game
        }
        ctx.fillRect(i.x, 0, i.width, i.gapY - i.gapHeight / 2);//Draw the top of the pipe
        ctx.fillRect(i.x, i.gapY + i.gapHeight/2, i.width, c.height);//Draw the top of the pipe

    }
}
```
## Final code
Here’s the final code for each file if you just want to copy and paste it:

### index.html
```
<html>
    <head>
        <style>
            body{
                margin: 0px;
                padding: 0px;
            }
            canvas{
                width: 100%;
                height: 100%;
            }
        </style>
    </head>
    <body>

    </body>
    <script src="main.js"></script>
</html>
```

### main.js
```
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
```