---
title: " Simple API using Flask"
author: Theo Gillespie
language: python
difficulty: 2
description: A introduction to flask and APIs... via cats
date: March 9, 2021
slug: ""
---
# Simple API using Flask
A introduction to flask... via cats

### Step 1: Installation
Like all python packages, Flask can be installed with pip:
`pip install flask`

Optionally, you can also install flask-cors, which is a extension that provides CORS support:
`pip install flask-cors`

### Step 2: The Outline
Flask apps follow a pretty standard structure:
```python
from flask import Flask, jsonify, request
app = Flask(__name__)  
  
@app.route('/')  
def hello():  
    return "Hello World!"  
  
if __name__ == '__main__':  
    app.run()
```

First of all, we have our `app` which is our actual application.
Flask, is a webserver, and websites/servers generally have routes (ex: www.example.com/hey, /hey is the route)

This sentiment is repeated in flask, you can set different routes/locations with the `@app.route()` decorator. These decorators are always right above the function you want to call when a user visits the provided route.

Now, if we run the provided script we'll see the following:
```bash
 * Serving Flask app "main" (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```
Majority of this we can ignore for now, what the most important thing is to get the URL. By default, Flask hosts on `http://127.0.0.1` or `localhost`, on port 5000. We can leave this just how it is.

Now, if we visit the page, we will see:
![enter image description here](https://i.imgur.com/uphxHif.png)
Beautiful :ok_hand:

Now, as you may notice, this is HTML, flask does support html files and rendering, it is a very robust platform.

But, that is boring, lets do something practical with it.

### Step 3: Making the Actual API (backend)
Ok so: we have our server, and we know it works. Now, we need to make it actually useful.

We are going to construct a HTTP API, a method of getting remote information via the web. This is generally referred as a REST API.

But first we must make a critical choice: what should the API do...?

Clearly there is only one answer: cats.
We will make a API that provides cat information (breed, pictures, etc). Then on a request it will return that information as JSON, kinda looking like this:
```json
{
	"name": "meow-alot",
	"id": 1,
	"breed": "russian blue",
	"img": "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"

}
```

We will begin with a new file, dubbed `cats.py`. This will be our "backend".
Then, we our going to make our main data structure, a `Cat` class.

```python
class Cat:
    def __init__(self, name="", id=0, breed="", img=""):
        self.name = name
        self.id = id
        self.breed = breed
        self.img = img

    def jsonify(self):
        return {
            "name": self.name,
            "id": self.id,
            "breed": self.breed,
            "img": self.img
        }
```
This class contains all the information we need, plus a method to easily get that info in the format we need.

Our "database" for demonstration purposes will just be a array, to hold a bunch of cat instances: `instances = []`

Now, we are going to make two functions that will be the main endpoints of our API:
get a random cat, and get a cat from its `id`

We will begin with the foremost option:
```python
import random  
def randomCat():  
    theChoosenOne = random.choice(instances)  
    return theChoosenOne.jsonify()
```
This chooses a random `Cat` from our list, then returns its data. Super easy!

Now we will complete the next task: get a cat from ID. 
This one is a little more trivial, but still quite simple.
```python
def catFromID(id):  
    cat = None  
	 for item in instances:  
        if item.id == id:  
            cat = item  
            break  
	 if cat != None:  
        return cat.jsonify()  
    return {"Error": "can't find cat with supplied ID"}
```
What this does is:
- iterate over all cats, trying to find the one with the ID
- `if` that cat is found, return its data
- if the supplied ID is invalid, return a Error Message.

And that is all we need for a simple "backend", now time to integrate it with flask.

### Step 4: Integration

Now that we have our backend, we can refrence it. We can import our file, then call the functions.

So first we import:
`import cats`

Then, we can create a new Flask Route, for getting random cats:
```python
@app.route('/random')  
def random():  
    return jsonify(cats.randomCat())
```
What this does is create a new endpoint for our API. Then when a user visits it, it asks for a random cat, which returns a `Dict` with a cat's information. Lastly, we then `jsonify` it, so that is JSON safe, and will be returned as such.

We can do the same with our second `cats` function, but remember that it requires a parameter: the `id` of the `Cat` we want to fetch.

Therefore, our endpoint must accomadate this, but flask makes that easy:
```python
@app.route('/getCat')  
def fromId():  
	id = int(request.args.get('id'))
    return jsonify(cats.catFromID(id))
```
Now you may be curious how the id is actually passed in the request, here is an example:
`http://127.0.0.1:5000/getCat?id=1`

Now that we have our two systems implemented, we have one last thing to do: make the cats. I populated the `instances` array in `cats.py` with the following:
```python
instances = [  
    Cat(name="Arrow", id=1, breed="tabby", img="https://bit.ly/2OkC0L4"),  
	Cat(name="Mister", id=2, breed="tuxedo", img="https://bit.ly/3bx0olO"),  
	Cat(name="Mega Chonker", id=3, breed="just fat", img="https://bit.ly/3kYSAfq")  
]
```
Now, we can Test!

### Step 6: Playing Around with it

Now, lets run the program.
First, we can test our random cat system: http://127.0.0.1:5000/random
... And we get our response:
`{"breed":"tuxedo","id":2,"img":"https://bit.ly/3bx0olO","name":"Mister"}`

Now, lets test the ID system: http://127.0.0.1:5000/getCat?id=1
And that works too!
`{"breed":"tabby","id":1,"img":"https://bit.ly/2OkC0L4","name":"Arrow"}`

Awesome, you just created a  :star:working :star: API, with its own database!
Hopefully it is clear that the possibilities are endless (and probably alot more practical than this instance).