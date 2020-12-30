---
title: Creating a Basic Calculator in Python with Tkinter
author: Jackson Reynolds
language: python
difficulty: 2
description: Learn the ways of this graphical user interface
date: December 30, 2020
slug: ""
---
# Creating a Basic Calculator in Python with Tkinter
In this tutorial, we'll be using a GUI with Python to create a calculator. That GUI will be Tkinter, the most commonly used GUI with Python. (I, for one, rely heavily on StackOverflow for answers. More users = good.) The calculator will be a simple 4-function calculator because I don't want to create five hundred buttons. And yes, it would be simpler to just type expressions into the Python shell to perform calculations, but simplicity is not our goal; rather, it is to learn a few of the many, many things that can be accomplished with this simple yet effective graphical user interface.

## Step 1: Importing Tkinter and Making a Window
```python
from tkinter import *

master = Tk()
master.geometry('225x150') # Width: 225 pixels; height: 150 pixels

mainloop() # Infinite loop. We'll want to constantly check for user input.
           # Be sure to keep mainloop() at the very end of your code.
```
If you run this code, you should see a Tkinter window appear. But it can't really do much, it doesn't look like a calculator, and it is clearly unable to calculate the product of six and nine.

In order to rectify this situation, we need to:
- Make buttons and put them in the right places to make the calculator look like a calculator
- Map functions to these buttons so they'll do things when the user clicks on them
- Make a special button that displays everything the user's entered (a display screen)
- Create a text variable of some sort that we can modify and display on the display screen
- I think that's it

Let's start with the text variable. We'll need to reference and modify it all throughout our code, so it would be easiest to make a **Text** class and create an object of type **Text** that we can manipulate.

## Step 2: Making a Text Class and Object
This shouldn't be inordinately difficult.

```python
# Make the Text class
class Text():
    def __init__(self):
        self.text = ''
    def setText(self, text):
        self.text = text
    def getText(self):
        return self.text

# Create a Text object that can be referenced everywhere in the code
txt = Text()
```
And it wasn't. Good.

Having this **txt** object will be really helpful once we need to reference it fifty billion times.

But that'll come later. Right now it's time to add some buttons!

## Step 3: Adding Some Buttons
I lied. When I said "some" buttons, I really meant "a lot of" buttons. After all, a calculator is nothing but buttons and a display screen. Even a basic calculator will need:
- A display screen
- Ten buttons for the digits 0-9
- Another button for the decimal point — don't forget the decimal point
- Four more buttons for adding, subtracting, multiplying, and dividing
- A button for calculating what the user's entered in the calculator
- And finally, a button to clear the display screen

That's a lot of widgets. Luckily, we can create most of these with some for-loops. (I'll come back to those.)

Let's start with the display screen. It's going to incessantly display whatever the user's entered.

This will be a simple **Label** widget that displays whatever text we need, but only on one line, which is fine for our purposes and many other purposes in Tkinter.

```python
output = Label(master, text = '0')
# Most basic calcs make 0 their default "nothing entered yet" screen.
```
We've created the label widget, but it's not showing up! The reason for this is simple: we haven't added it to our window yet.

There are many different ways to add widgets to a window, but the easiest is definitely the **grid()** method. This method allows you to choose where a widget will go by changing its **column** and **row** values, and it also lets you choose how many columns and rows it will take up by changing its **columnspan** and **rowspan** values.

A quick note: in Tkinter and all things programming, it's important to remember that the point (0, 0) is at the top-left of the screen, not the bottom-left.

To make a label widget at the top-left of the screen, we simply write:

```python
output.grid(column = 0, row = 0, columnspan = 5, rowspan = 1)
```
But that looks kind of clunky. I don't want to write all that whenever I create a widget. I suggest you write a quick function to make your life easier.

```python
def Grid(self, Column, Row, Columnspan, Rowspan):
    self.grid(column = Column, row = Row, columnspan = Columnspan, rowspan = Rowspan)
```
Now we can instead just write:

```python
Grid(output, 0, 0, 5, 1)
```
If you run this code, you should see a **Label** widget show up in your window with a zero inside it.

Meanwhile, it's time to add some actual buttons. Lots of actual buttons, in fact.

There are many good ways to do this. By hand is not one of them. For-loops are much less painful.

We can create a two-dimensional array of values that two nested for-loops can deal with. It should look something like this:

```python
numberPad = [
    ['7', '8', '9', '+'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '*'],
    ['0', '.', '=', '/', 'Clear'] ]
```
You can probably tell that each array within the big one will be its own row.

On to the for-loops.

```python
for i in range(len(numberPad)):
    buttonList.append([])
    
    for j in range(len(numberPad[i])):
        buttonList[i].append(Button(master, text = numberPad[i][j]))
        Grid(buttonList[i][j], j, i + 1, 1, 1) # i + 1 b/c of output widget

        if numberPad[i][j] == '=':
            # Code to assign the equals button a command to evaluate txt (written in Step 4)
        elif numberPad[i][j] == 'Clear':
            # Assign the clear button a command to reset the display screen (and the txt object)
        else:
            # Assign all other buttons a command to append their value to txt
```
This for-loop creates a two-dimensional array of **Button** widgets that we can manipulate as we iterate through all the values in **numberPad**.

You can probably tell that some stuff is missing. We still need to map the buttons in the for-loops to certain functions so that they can do stuff when they're clicked on.

In order to map functions to buttons, however, we have to first create some functions.

## Step 4: Creating the Functions
Now it's time to create the functions we need. Whenever we click on a button, it'll call one of these functions.

All that code we wrote earlier was just building up to this. With the framework in place, we are finally able to give our calculator some instructions, tell it what to do.

The very first of the relatively few functions we need is a simple one. To make the code simpler and easier to read during and after the coding process, we can make a quick function that updates the value that's displayed in our **output** widget, as we'll need to call it quite often:

```python
def updateValue(value):
    output.config(text = value)
```
We also want to append to **txt** whatever digits and mathematical symbols the user clicks on. To do that, we'll need to create another function:

```python
def append(value):
    txt.setText(txt.getText() + value)
    updateValue(txt.getText())
```
Let's go back to the section of our for-loops that deals with most of the buttons.

```python
else:
    # Assign all other buttons a command to append their value to txt
```
We can replace this pseudocode with actual code. Tkinter's widgets all have a **config()** method, and the Button's **config()** method comes with a **command** parameter.

This parameter does exactly what we need to do: it assigns the button a function to call whenever it's clicked.

```python
else:
    buttonList[i][j].config(command = lambda x=i, y=j : append(buttonList[x][y]['text']))
    # ['text'] returns the widget's text attribute
    # I could've used numberPad[x][y], but I wanted to use as much Tkinter syntax as possible

# Notice the lambda function.
# Tkinter doesn't like when you map commands that take arguments to buttons. The lambda function is a workaround.

# Lambda functions are pretty cool. If you've never seen one before, you should definitely look into them.

# The x=i, y=j in the lambda function is necessary because Python's variables are what's known as "late binding."
# That is, the variables i and j remain variables within the command parameter until the for-loop finishes. Without the x=i, y=j, every button's command would append the last button's text attribute.
```
Another function we need is the one to clear whatever's in the **output** widget. The clear button will use this function, and it's quite simple. So simple, in fact, you should try to make it yourself (though I've got code you can reference at the end of the article).

Now to change the clear button's **command** value:

```python
elif numberPad[i][j] == 'Clear':
    buttonList[i][j].config(command = clearText)

# Notice there's no pair of parentheses after clearText
# That's because clearText doesn't take any arguments
```
The last two things to do are to create the function that calculates the user's input and to make the equal sign's **command** attribute evaluate the user input and display the result.

This evaluation function is a little more complicated than its predecessors. Evaluating a String is easy — we can just use Python's built-in **eval()** function. What makes this function more complicated is the fact that it has to account for when the user makes a mistake such as, for example, clicking on the times button thrice in a row.

If the user's done something like that and then clicks the equal sign, Python will throw an exception saying something like, "Error: User is too dumb to operate a calculator."

Okay, Python might sugarcoat it a little. In either case, we should use a try/except statement to avoid getting any errors.

```python
def evaluate(expression):
    value = ''
    try:
        value = eval(expression)
        if value == round(value): # If the float's an integer
            value = round(value)  # Chop off the ".0" at the end
        value = str(value)
        txt.setText(value)
    except:
        value = 'Error'
        txt.setText('')
    return value
```
The calculator code is almost finished! All that's left is to edit the equal sign's **command** attribute. (You can do this last part, I bet.)

But wait! There's another button that might come in handy. If the user's entered lots of stuff in the calculator and suddenly misclicks, it would be nice if they could click on a backspace button that deletes only the last character in **txt**. (I'm including this code as well, though you should definitely try to code it yourself.)

## The Complete Code
That was a lot of code for just a little calculator. I've got about sixty lines of code here, excluding comments and whitespace, which you can refer to as needed.

If you run your program and click on some buttons, you should see something pop up that looks like a calculator and calculates like a calculator. You've made a calculator! And you've also tapped into the power of this simple yet capable graphical user interface along the way.

```python
# A basic and functioning calculator using Tkinter in Python
from tkinter import *

master = Tk()
master.geometry('225x150')

# Make a Text class for the text that will be displayed
class Text():
    def __init__(self):
        self.text = ''
    def setText(self, text):
        self.text = text
    def getText(self):
        return self.text

# Also make a Text object
txt = Text()

# Here's a function I made that lets me write less code
def Grid(self, Column, Row, Columnspan, Rowspan):
    self.grid(column = Column, row = Row, columnspan = Columnspan, rowspan = Rowspan)

output = Label(master, text = '0') # Most calcs make 0 their default "nothing entered yet" screen. Display at beginning of program.
Grid(output, 0, 0, 5, 1)

def updateValue(value):
    output.config(text = value)

def append(value):
    txt.setText(txt.getText() + value)
    updateValue(txt.getText())

def backspace():
    txt.setText(txt.getText()[:len(txt.getText()) - 1])
    if len(txt.getText()) == 0:
        updateValue('0')
    else:
        updateValue(txt.getText())

def clearText():
    txt.setText('') # Get rid of whatever was in txt
    updateValue('0') # Reset text in output

def evaluate(expression):
    value = ''
    try:
        value = eval(expression)
        if value == round(value): # If the float's an integer
            value = round(value)  # Chop off the ".0" at the end
        value = str(value)
        txt.setText(value)
    except:
        value = 'Error'
        txt.setText('')
    return value

# Make all the buttons
numberPad = [
    ['7', '8', '9', '+'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '*', '<—'],
    ['0', '.', '=', '/', 'Clear'] ]

# With nested for-loops
buttonList = []

for i in range(len(numberPad)):
    buttonList.append([])
    
    for j in range(len(numberPad[i])):
        buttonList[i].append(Button(master, text = numberPad[i][j]))
        Grid(buttonList[i][j], j, i + 1, 1, 1)

        if numberPad[i][j] == '=':
            buttonList[i][j].config(command = lambda : updateValue(evaluate(txt.getText())))
        elif numberPad[i][j] == '<—':
            buttonList[i][j].config(command = backspace)
        elif numberPad[i][j] == 'Clear':
            buttonList[i][j].config(command = clearText)
        else:
            buttonList[i][j].config(command = lambda x=i, y=j : append(buttonList[x][y]['text'])) # ['text'] returns the widget's text attribute

mainloop()
```
