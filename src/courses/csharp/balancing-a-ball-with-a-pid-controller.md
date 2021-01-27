---
title: Balancing a ball with a PID controller
author: Theo Gillespie
language: csharp
difficulty: 2
description: Create a PID controller in Unity
date: January 27, 2021
draft: false
hide: false
slug: ""
---
# Balancing Ball with a PID controller

![enter image description here](https://imgur.com/pPdcFZS.gif)
PID controllers are extremely robust control loops used in everything like industrial machines, to even rockets. They work by using Three values (The P, I and D) to modulate a input and return the desired output.

Today we are going to explore these systems in Unity, a enviroment we will use for its ease, but most importantly, the visuals. Everything is more fun in 3D.

# Let's Begin

To start we are going to create a new Unity Project. I am using Version 2020.1.1f1. but any semi-recent version will suffice.

![Image](https://imgur.com/3hNrwnw.png)

Make sure the project is "3D", it can be named whatever you desire.
Then, create the project. While we wait, we can discuss the priniciples surronding PID systems.

# PID Overview

So, as we discussed, PID is composed of three main elements. These operate around a "error", think of this as the input. This is the difference between the desired value and the current input.

**P** - proportional to the error, takes into account a gain (usually seen as *k*)
**I** - "integrates", takes into account past errors and combines them, its goal is clean this up.
**D** - The derevative, operates around the change in the error.

Combine these all together and you get a (hopefully) nice output. However this is missing a key step. As you can see each method produces their own result, and will have varying success. Therefore its nice to have a variable that control the *gain* of each technique. Therefore, essentially all PID systems contain variables you change, or tune, until we get the desired result. We will visit this soon.

# Actually doing things

So now, we have a empty project that we must populate. Lets begin by creating the enviroment. 

1. Create a cube (Right click in the scene hierarchy > 3d Objects > Cube) at the orgin (0,0,0) and scale it like so (10, .5, 10). This provides the platform that the ball will roll around and what will actually rotate to control the ball. Ensure this gameobject has a "Box Collider" Component.
2. Create the Ball  (Right click in the scene hierarchy > 3d Objects > Sphere) with the position of (0, 2, 0). Then scroll down in the inspector and add a "Rigidbody" Component. This enables physics.

Now we got to do actual stuff: scripting. Normally, if you were replicating this in the real world this would be a much more daunting of a task, but luckily Unity already has tons of methods that will make this easier.

First thing we need to do is create a C# class (Right Click in Assets > Create > C# script).

And we will populate it with the following code:

```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PID : MonoBehaviour
 {
    public Transform ball;
    double PIDX, PIDZ, errorX, errorZ, previous_errorX, previous_errorZ, pX, pZ;



    int desiredPosX = 0;//servoZ
    int desiredPosZ = 0;//servoX





  //P
  double pidX_p = 0;
  double pidZ_p = 0;

  //I
  double pidZ_i = 0;
  double pidX_i = 0;

  //D
  double pidX_d = 0;
  double pidZ_d = 0;


  //Gains
  public double kp = 0.2;
  public double ki = 0.05;
  public double kd = 0.2;

  double dt, currentTime, previousTime;
  // Start is called before the first frame update
  void Start()
  {

  }

  // Update is called once per frame
  void Update()
  {

      dt = Time.deltaTime;
      double[] outputs = pidcompute();

      this.transform.eulerAngles = new Vector3((float)outputs[0], 0, (float)outputs[1]);



  }
  double[] pidcompute () {
      previous_errorX = errorX;
      previous_errorZ = errorZ; 

      //Inputs to the PID Controller
      errorX = ball.position.x - desiredPosX;
      errorZ =  ball.position.z- desiredPosZ;

      //Defining "P" 
      pidX_p = kp*errorX;
      pidZ_p = kp*errorZ;

      //Defining "D"
      pidX_d = kd*((errorX - previous_errorX)/dt);
      pidZ_d = kd*((errorZ - previous_errorZ)/dt);

      //Defining "I"
      pidX_i = ki * (pidX_i + errorX * dt);
      pidZ_i = ki * (pidZ_i + errorZ * dt);

      //Adding it all up
      PIDX = pidX_p + pidX_i + pidX_d;
      PIDZ = pidZ_p + pidZ_i + pidZ_d;

      //Outputs to send to a actuator
      pZ = PIDZ;
      pX = PIDX;

      double[] vals;
      vals = new double[2];
      vals[0] = -pZ;
      vals[1] =  pX;

      return vals;
   }
}
```

   Now lets go over what this does. First of all we declare a bunch of variables, lets go over what they do.

```
	public Transform ball;
    double PIDX, PIDZ, errorX, errorZ, previous_errorX, previous_errorZ, pX, pZ;


    int desiredPosX = 0;
    int desiredPosZ = 0;
```

First of all we create a transform, this is a variable that will hold the position, rotation of our ball. Then we declare some of our PID values, we declare our errors (inputs), previous inputs, our output variables, etc. Lastly, we have our desired positon of our ball, which naturally, is (0,0).

Then, notably, we declare our gains.

```
//Gains
public double kp = 0.2;
public double ki = 0.05;
public double kd = 0.2;
```

These are preset values that I found worked good enough to demonstrate and show whats happening. We will modify them later, as they are not ideal.

Skipping the `Start()` function, that does nothing, we have the `Update()` function thats called once every frame. 

The first thing we must do, regardless of anything else is get our `dt` this is essential for our PID operations as it is time sensitive.

```
	dt = Time.deltaTime;
    double[] outputs = pidcompute();
    
    this.transform.eulerAngles = new Vector3((float)outputs[0], 0, (float)outputs[1]);
```

Then we call the function called `pidcompute()` this is where the actual magic takes place. This will return two values, which in turn (pun intended), will rotate our platform accordingly.

The first thing we'll do is set our previous error, to naturally the older error value.
After this we'll update our inputs with the current balls position for each respective axis.

```
	previous_errorX = errorX;
	previous_errorZ = errorZ; 

    //Inputs to the PID Controller
    errorX = ball.position.x - desiredPosX;
    errorZ =  ball.position.z- desiredPosZ;
```

Now, we get to the actual math, but whilst seemingly daunting, these numbers are remarkably easy to resolve.

```
	//Defining "P" 
	pidX_p = kp*errorX;
	pidZ_p = kp*errorZ;
    //Defining "D"
    pidX_d = kd*((errorX - previous_errorX)/dt);
    pidZ_d = kd*((errorZ - previous_errorZ)/dt);

    //Defining "I"
    pidX_i = ki * (pidX_i + errorX * dt);
    pidZ_i = ki * (pidZ_i + errorZ * dt);
```

Now that we have our P, I & D values we solve them all together.

```
PIDX = pidX_p + pidX_i + pidX_d;
PIDZ = pidZ_p + pidZ_i + pidZ_d;
```

After this, we bundle it as an array and which, as stated, gets turned into the rotation of the platform.

Now we can Test!

![enter image description here](https://imgur.com/pPdcFZS.gif)
As you can see our code prevents the ball from rolling, off whilst manipulating itself so it homes in on the orgin! You can see the panel rotate as the ball translates itself across the surface.

However, after only a couple of seconds you will realize its oscillating, the behaviour isnt completely desirable. Let me introduce you to the hell they call "Tuning".

# Tuning

Our PID controller is only as good as the gains we supply it with. Our base values work, but they dont work well. Therefore we must tune it.
To be honest, you could brute force this, sitting around and changing values until you get a good outcome. But thats for losers, real gamers either use proper documented methodology or AI.

The best, and most common method is the following:
To tune a PID use the following steps:

1. Set all gains to zero.
2. Increase the P gain until you get steady, consitent oscillation.
3. Increase the D gain until the the oscillations go away.
4. Repeat steps 2 and 3 until increasing the D gain does not stop the oscillations.
5. Increase the I gain until it brings you to the desired point.

Following this I ended up with the values:
P = .14
I = 0.06
D = .04

Which work pretty well.

# The End

This is the end to this tutorial, but I encourage you to continue playing around with tuning and such or simply reuse this code in whole different manner, PID is great for most systems.