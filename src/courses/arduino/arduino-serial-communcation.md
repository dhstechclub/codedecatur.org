---
title: "Arduino Serial Communcation "
author: Theo Gillespie
language: arduino
difficulty: 3
description: Send Data over USB!
date: February 5, 2021
slug: ""
---
# Arduino Serial Communication

This tutorial assumes you have already completed the [How To Install and Use the Arduino IDE](https://codedecatur.org/tutorials/arduino/how-to-install-and-use-the-arduino-ide) & the [How to Make a LED Blink with Arduino Tutorial](https://codedecatur.org/tutorials/arduino/how-to-make-an-led-blink-with-arduino). We will be using the same methods today.

This is also kinda a Tutorial in Proccessing, you'll see.

## Stuff you need

* Arduino Compatiable Microcontroller (the Arduino Uno is a great starter board)
* an LED
* Breadboard (optional)
* a 100-400 ohm resistor 
* An assortment of Jumper Wires
* A computer with the Arduino IDE

## Intro

Perhaps you have wondered how USB works, how you are able to send data, and such? This is through the seemingly magical process of *Serial Communication* a common method of sending data that many types of Cables, protocols utilize. 

More specifically, in the context of Arduinos, data (such as your program) are sent over to the Arduino (generally as a hex file) which the Arduino then proceeds to store and execute.

However, we can utilize this same method todo our own communication! We can send our own Data, such as strings, or just raw numbers.

Luckily many common programs, including the Arduino library make it super easy to do this, and today we will explore how.

## Wiring

The demonstration we will do today is simply: press a button on our computer, send a signal over USB and then have the Arduino turn on and off a light.

Therefore we must wire up our Arduino to complete the desired task.

![enter image description here](https://i.imgur.com/iZBig18.png)
-Wire GND to the Cathode of the LED (the shortest leg of the LED)
-Wire D9 (or any Digital Pin) to a 220 ohm resistor which is therefore connected to the Anode of the LED

## Programming the PC

Great, so our circuit is set up but that means nothing if there is no code. We are going to begin with the code for our computer. 

For our computer's code, we will use the amazing Processing Language. It is a Java-like language that makes it super easy to do graphics, but more importantly, has a super easy to use Serial system.

Most likely, however, you don't have Processing installed, but you can easily download it from [here](https://processing.org/download/).

Then, unpack the zip and run the .exe. This will bring us to the Processing IDE, and we can begin coding!

We are going to begin by making our interface. Personally, I like big red buttons, so that's what we are going to do. However, Processing, being a program designed for Graphics, doesn't have a built-in button system. Therefore we must create our own button.

Processing operates on two functions: a `setup()` function, which runs once at the start of the program, and a `draw()` which runs once every frame. This is similar to an Arduino with its `setup()`and `loop()` function.

Our code will look so:

```
float x = 250;
float y = 250;
float w = 150;
float h = 80;
void setup(){
 size(500,500);
 background(255);
 stroke(0);
 
 rectMode(CENTER);
}

void draw(){
 
 background(255);
 rect(x,y,w,h);
 fill(255,0,0);
 if(mousePressed){
  if(mouseX>x && mouseX <x+w && mouseY>y && mouseY <y+h){
   println("Clicked!");
   fill(0);
   //do stuff 
  }
 } 
}
```

Now if we run this, we have a brilliant bright red button in the center of our screen! And, when we click it, it registers! This is great and all, but how does the code work? Let's see:

First, we declare 4 important variables:

```
float x = 250;
float y = 250;
float w = 150;
float h = 80;
```

These, as you might have found, are the dimensions, and location of our rectangle, which we use as our button.

Then, in the `setup()` function, we do the following:

```
void setup(){
 size(500,500);
 background(255);
 stroke(0);

 rectMode(CENTER);
}
```

What this does is set the window size (`Size()`), sets the background, the stroke (the outline on shapes) , and lastly, sets the method of drawing Rectangles to the center (the position of the rectangle is its center)

Now we move on to the actual graphics, seen in `draw()`:

```
void draw(){
 
 background(255);
 rect(x,y,w,h);
 fill(255,0,0);
 if(mousePressed){
  if(mouseX>x && mouseX <x+w && mouseY>y && mouseY <y+h){
   println("Clicked!");
   fill(0);
   //do stuff 
  }
 } 
}
```

The first thing we do (as a good rule of thumb) is set our `background` . This obviously sets the background of the image, but also clears the screen, which is needed as the `draw()` function is called every frame.

Then, we create our rectangle, with the aforementioned properties.
`rect(x,y,w,h);`

Now, we have our actual button logic.

```
 if(mousePressed){
  if(mouseX>x && mouseX <x+w && mouseY>y && mouseY <y+h){
   println("Clicked!");
   fill(0);
   //do stuff 
  }
 } 
```

What this does is first, check if the mouse is clicked, then check if the location of the mouse during the click is within the rectangle. Then, we acknowledge the click and change the button's color just for giggles. 

Now that we have our button, we are missing the next essential component: the actual Serial stuff. Luckily, Processing makes this super easy to implement.

Here is the updated code:

```
import processing.serial.*;

Serial myPort;

float x = 250;
float y = 250;
float w = 150;
float h = 80;
void setup(){
 size(500,500);
 background(255);
 stroke(0);
 rectMode(CENTER);
 
 printArray(Serial.list());
  
 myPort = new Serial(this, Serial.list()[0], 9600);
}

void draw(){
 
 background(255);
 rect(x,y,w,h);
 fill(255,0,0);
 if(mousePressed){
  if(mouseX>x && mouseX <x+w && mouseY>y && mouseY <y+h){
   println("Clicked!");
   fill(0);
   myPort.write("hey");
  }
 } 
}
```

Let's review the changes: 

```
import processing.serial.*;

Serial myPort;
```

First of all, we import Processing's Serial library, then create a Serial Object.

Then we do the following:

```
printArray(Serial.list());
  
 myPort = new Serial(this, Serial.list()[0], 9600);
```

Here, we print all the open Serial ports. Then we open a Serial Communication at 9600 baud (the rate that information is sent), using the first open port (generally this will automatically detect an Arduino) and add that to our existing Serial Object. 

Lastly, we have this one line that simply sends a message on the Port.
`myPort.write("hey");`

And all that, is what is required to send messages to our Arduino!

## Arduino Code

Now we can send messages, but this is useless if we cannot read them (or at least detect them). Therefore we must write a little C++ to actually complete the task: blink a light.

The code we are using is very similar to the code provided in the [How to Make a LED Blink with Arduino Tutorial](https://codedecatur.org/tutorials/arduino/how-to-make-an-led-blink-with-arduino) and looks like so:

```
int led = 9; //set this to the pin your LED is connected to
bool light;
void setup() {
  Serial.begin(9600); // opens serial port, sets data rate to 9600 bps
}

void loop() {
  
  if (Serial.available() > 0) {
    
    if(light == false) {
      light = true;
      digitalWrite(led, HIGH);
    }
    else {
      light = false;
      digitalWrite(led, LOW);
    }
  }
}
```

What this does is simple: whenever we receive a signal from the Connection, we toggle the led! Majority of the Serial work can be accomplished in the two lines:

`Serial.begin(9600);`
and `if (Serial.available() > 0)`

then we simply just toggle the light!

And that's all we need to finish this tutorial, we (hopefully) now have a togglable light that can be controlled via our PC! Hopefully you see the promise in this technology, a lot is possible with such this simple system.