---
title: Creating a Basic Calculator in Python with Tkinter
author: Jackson Reynolds
language: python
difficulty: 2
description: Learn the ways of this graphical user interface.
date: August 11, 2020
slug: ""
---
# Creating a Basic Calculator in Python with Tkinter
In this tutorial, we'll be using a GUI with Python to create a calculator. That GUI will be Tkinter, the most commonly used GUI with Python. (I, for one, rely heavily on StackOverflow for lots of answers. And more users = more answers = good.) The calculator will be a simple 4-function calculator because I don't want to create five hundred buttons. And yes, it would be simpler to just type expressions into the Python shell to perform calculations, but simplicity is not our goal; rather, it is to learn a few of the many, many things that can be done with this simple yet effective graphical user interface.

## Step 1: Importing Tkinter and Making a Window
```python
from tkinter import * # That was easy.

master = Tk()
master.geometry('225x150') # Width: 225 pixels; Height: 150 pixels

mainloop() # Infinite loop. We want to constantly check for user input.
           # Be sure to keep mainloop() at the very end of your code.
```
If you run this code, you should see a Tkinter window appear. But you can't really do much with it, it doesn't look calculator-ey, and it is clearly unable to calculate the product of six and nine. To fix this atrocity, let's add some buttons!

## Step 2: Adding Some Buttons
I lied. When I said "some" buttons, I really meant "a lot of" buttons. After all, a calculator is nothing but buttons and a display screen. Even a basic calculator will need the following:
- A display screen
- Ten buttons for the digits 0-9
- Another button for the decimal point - don't forget the decimal point
- Four more buttons for adding, subtracting, multiplying, and dividing
- A button for calculating what the user's typed in the calculator
- And finally, a button to clear the display screen

That's *eighteen widgets*. Programming eighteen widgets is not ideal. Then again, such an ideal world where all code is conveniently short and all cows are perfectly spherical simply doesn't exist. So we'll just have to take it one widget at a time.

Let's start with the display screen. This will be a simple ***Label*** widget that displays whatever text we need, but only on one line, which is fine for our purposes and many other purposes in Tkinter. Since it will contain ever-changing text, it's also time to declare a variable.

```python
displayedText = ''
output = Label(master, text = '0')
# Most basic calcs make 0 their default "nothing entered yet" screen.
# Also, displayedText will change according to user input.
# Then output's text will be changed to displayedText.
# I'll get to all of that later.
```
We've created the label widget, but it's not showing up! The reason for this is simple: we haven't added it to our window yet.

There are many different ways to add widgets to a window, but the easiest is definitely the **grid()** method. This method allows you to choose where a widget will go by manipulating its *column* and *row* values, and it also lets you choose how many columns and rows it will take up by manipulating its *columnspan* and *rowspan* values. Oh, a quick note: in Tkinter and all things programming, it's important to remember two things:

1. Counting starts at 0.
2. The point (0, 0) is at the top-left of the screen. Not the bottom-left.

Therefore, to make a label widget at the top-left of the screen, write the following:

```python
output.grid(column = 0, row = 0, columnspan = 5, rowspan = 1)
```
But I don't want to write this *eighteen times*. Let's make a quick function to simplify things a little.

```python
def Grid(Thing, Column, Row, Columnspan, Rowspan):
    Thing.grid(column = Column, row = Row, columnspan = Columnspan, rowspan = Rowspan)
```
Now we can instead just write:

```python
Grid(output, 0, 0, 5, 1)
```
If you run this code and give *displayedText* some value, you should see it show up in your window. Though you should keep *displayedText* empty for now. Meanwhile, it's time to add a button.

Going left to right, top to bottom, after adding the display screen, the upcoming buttons to add for the second row (row = 1) are:
- The seven button
- The eight button
- The nine button
- The plus sign button

I'll not be writing out code for all eighteen widgets here. You'll be able to figure out the rest. (Hint: all columnspan and rowspan values should be 1 from now on.) Anyway, on to the ***Button*** widget. First, the seven button.

```python
sevenButton = Button(master, text = '7', command = )
Grid(sevenButton, 0, 1, 1, 1)
```
The *command* value determines what function to run whenever that button is clicked. As we've got no useful functions at the moment, I've left it blank for now, but I'll get back to it.

Okay, map out all the buttons where they should be on the grid, and then check back here. (You can refer back to the list of buttons at the beginning of Step 2.) To see if they're going where you want them to, and to be able to run your program, you can create a temporary function and assign its name to *command* like so:

```python
def doNothing():
    # It doesn't do anything...

sevenButton = Button(master, text = '7', command = doNothing)
Grid(sevenButton, 0, 1, 1, 1)
# Notice the lack of a parentheses pair after the function. ^
```
## Step 3: Creating the Functions
You're back? Great, now it's time to create the functions we need. These functions will interact with the calculator and let it actually perform calculations.

The very first of the relatively few functions we need is a simple one. To make the code easier to understand while and after the coding process, we can make a quick function that updates the value that's displayed in our *output* widget, as we'll need it a couple of times very soon:

```python
def updateValue():
    output.config(text = str(displayedText))
      # Making displayedText a string just in case.
      # It'll go through a lot of math, and I want it to remain a string when displayed because I hate getting errors too.
```
We also want to put values into *displayedText* that correspond to the digits and mathematical symbols the user clicks on. To do that, we'll need to create another function:

```python
def append(value):
    global displayedText
    displayedText += value
    updateValue()
```
Now we can change the function assigned to *command* in all of the buttons except for the equal sign and the clear button. Here's what that would look like for the plus button:

```python
plusButton = Button(master, text = '+', command = lambda : append('+'))
# Notice the "lambda : " right after "command = ".
# This lets you put parameters into the function, in this case a plus sign.
```

Another function we need is the one to clear whatever's in the *output* widget. This is the one that the clear button will use, and it's quite simple:

```python
def clearText():
    global displayedText
    displayedText = '' # Get rid of whatever was in displayedText.
    output.config(text = '0')
    # Reset text in output.
```

Once you've changed the clear button's *command* value, the last two things to do are to create the function that calculates the user's input and to make the equal sign's *command* call that function:

```python
def evaluate():
    global displayedText
    displayedText = str(float(eval(displayedText)))
    # All the calculating is done in the eval function.
    if float(displayedText) == round(float(displayedText)):
    # If the float's an integer
        displayedText = str(round(float(displayedText)))
        # Chop off the ".0" at the end
    updateValue()

equalsButton = Button(master, text = '=', command = evaluate)
```
## The Complete Code
That was a lot of code for just a little calculator. I've got over eighty lines of code here, which you can refer to whenever necessary.

If you run your code and click on the buttons, you should see something pop up that looks like a calculator and calculates like a calculator. You've made a calculator! And you've also tapped into the power of this simple yet capable graphical user interface along the way.

```python
# A basic and functioning calculator using Tkinter in Python.
from tkinter import *

master = Tk()
master.geometry('225x150')

def Grid(Thing, Column, Row, Columnspan, Rowspan):
    # A function I made that lets me write less code.
    Thing.grid(column = Column, row = Row, columnspan = Columnspan, rowspan = Rowspan)

displayedText = ''

output = Label(master, text = '0')
# Most calcs make 0 their default "nothing entered yet" screen.
# Displays 0 at beginning of program.
Grid(output, 0, 0, 5, 1)

def updateValue():
    output.config(text = str(displayedText))

def append(value):
    global displayedText
    displayedText += value
    updateValue()

def clearText():
    global displayedText
    displayedText = '' # Get rid of whatever was in displayedText.
    output.config(text = '0') # Reset text in output.

def evaluate():
    global displayedText
    displayedText = str(float(eval(displayedText)))
    if float(displayedText) == round(float(displayedText)):
    # If the float's an integer
        displayedText = str(round(float(displayedText))) 
        # Chop off the ".0" at the end
    updateValue()

# HERE THERE BE BUTTONS.
# In order, left to right, top to bottom.

sevenButton = Button(master, text = '7', command = lambda : append('7'))
Grid(sevenButton, 0, 1, 1, 1)

eightButton = Button(master, text = '8', command = lambda : append('8'))
Grid(eightButton, 1, 1, 1, 1)

nineButton = Button(master, text = '9', command = lambda : append('9'))
Grid(nineButton, 2, 1, 1, 1)

plusButton = Button(master, text = '+', command = lambda : append('+'))
Grid(plusButton, 3, 1, 1, 1)

fourButton = Button(master, text = '4', command = lambda : append('4'))
Grid(fourButton, 0, 2, 1, 1)

fiveButton = Button(master, text = '5', command = lambda : append('5'))
Grid(fiveButton, 1, 2, 1, 1)

sixButton = Button(master, text = '6', command = lambda : append('6'))
Grid(sixButton, 2, 2, 1, 1)

minusButton = Button(master, text = '-', command = lambda : append('-'))
Grid(minusButton, 3, 2, 1, 1)

oneButton = Button(master, text = '1', command = lambda : append('1'))
Grid(oneButton, 0, 3, 1, 1)

twoButton = Button(master, text = '2', command = lambda : append('2'))
Grid(twoButton, 1, 3, 1, 1)

threeButton = Button(master, text = '3', command = lambda : append('3'))
Grid(threeButton, 2, 3, 1, 1)

multiplyButton = Button(master, text = '*', command = lambda : append('*'))
Grid(multiplyButton, 3, 3, 1, 1)

zeroButton = Button(master, text = '0', command = lambda : append('0'))
Grid(zeroButton, 0, 4, 1, 1)

decimalButton = Button(master, text = '.', command = lambda : append('.'))
Grid(decimalButton, 1, 4, 1, 1)

equalsButton = Button(master, text = '=', command = evaluate)
Grid(equalsButton, 2, 4, 1, 1)

divideButton = Button(master, text = '/', command = lambda : append('/'))
Grid(divideButton, 3, 4, 1, 1)

clearButton = Button(master, text = 'Clear', command = clearText)
Grid(clearButton, 4, 4, 1, 1)

mainloop() # Repeat forever...watching...waiting...for user input.

```
