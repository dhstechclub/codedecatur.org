---
title: Coding Basic Hangman Game with Python
author: Teo Lara
language: python
difficulty: 1
description: Easy python tutorial for beginner programmers.
date: February 6, 2021
slug: ""
---
<!--StartFragment-->

This is a simple tutorial to create the classic game of hangman in Python. If you do not already have Python installed, follow [this tutorial](https://www.youtube.com/watch?v=pfPCV7DXc5w). 

1. Create a new file and name it Hangman. 
2. First, we need a list of secret words. My words are going to be my favorite foods Make a list by using \[ ] brackets, like so:

\`\``python

words = \["Tofu", "Cheese", "Onion", "Bread", "Honey", "Oil", "Butter"]

\`\``

3. One of these has to be the secret word, important the random feature to pick a random word.

**\`\``**python

import random

word = random.choice(words)

**\`\``**

4. Now that we have our secret word, we need variables for guesses and turns. The guesses will be list which begins empty so it can be filled. The turns variable can be any number, the less turns you have to guess the harder the game will be. 

\`\``python

guesses = \[ ]

turns = 6

\`\``

5. Finally you need a line to make the secret word lowercase so that the guesser is not confused. This is done with the lower function like so:

\`\``python

word = word.lower()

\`\``

6. Your code should look like this:

\`\``python

words = \["Tofu", "Cheese", "Onion", "Bread", "Honey", "Oil", "Butter"]

import random

word = random.choice(words)

guesses = \[]

turns = 6

word = word.lower()

\`\``

7. Before the game starts, we need to tell the player what to do, enter instructions with the print function:

\`\``python

print("Guess the word!")

\`\``

8. Now we need a loop to occur multiple times, with each repetition asking the player for a letter, checking if it is in the secret word and telling the player what letters they’ve gotten right so far. This can be done in lots of ways, but we’ll use a while loop. As the game goes on the turns variable will go down, and once it is zero this loop will break and the game will end. 

\`\``python

while turns > 0:

\`\``

9. Next we need make a variable called misses to keep track of the amount of letters that are missing. Set this variable to zero. Next make a for loop for each character in the word, your code should fit inside the while loop and should look like this:

\`\``python

    missing = 0

    for char in word:

\`\``

10. Inside this for loop we need to check if the guessed characters match ones in the word. This is done with an if loop. If the character does match the guess, it will be printed. If not, we’ll print a dash and add one to the failed value. To do this use the following code:

\`\``python

        if char in guesses:

            print(char)

        else:

            print ("-")

            missing +=1

\`\``

11. All your code should look like this:

\`\``python

words = \["Tofu", "Cheese", "Onion", "Bread", "Honey", "Oil", "Butter"]

import random

word = random.choice(words)

guesses = \[]

turns = 6

word = word.lower()

print("Guess the word!")

while turns > 0:

    missing = 0

    for char in word:

        if char in guesses:

            print(char)

        else:

            print ("-")

            missing +=1

\`\``

12. Now we need to check if you’ve won the game. This is simple, if no letters are missing you win and you get a nice you win message. The word is revealed  and we also need to end the game at this point with a break function. 

\`\``python

    if missing == 0:

        print ("You Win!")

        print("The word is: ", word)

        Break

\`\``

13. All that’s left is to let the player input their guesses. Create a guess variable and set it equal to an input. This allows players to enter letters. Then make this letter lowercase with a lower function. All of this should still be in your while loop. 

\`\``python

    guess = input("guess a letter: ")

    guess = guess.lower()

\`\``

14. Before checking if the secret word contains the guess, we need to check if the guess has been guessed before. This is done with an if statement, that if true the guess is added to the guessed letters. 

\`\``python

    if guess not in guesses:

        guesses.append(guess)

\`\``

15. So far, your code should like so:

\`\``python

words = \["Tofu", "Cheese", "Onion", "Bread", "Honey", "Oil", "Butter"]

import random

word = random.choice(words)

guesses = \[]

turns = 6

word = word.lower()

print("Guess the word!")

while turns > 0:

    missing = 0

    for char in word:

        if char in guesses:

            print(char)

        else:

            print ("-")

            missing +=1

    if missing  == 0:

        print ("You Win!")

        print("The word is: ", word)

        break

    guess = input("guess a letter: ")

    guess = guess.lower()

    if guess not in guesses:

        guesses.append(guess)

\`\``

16. Now we need to check if the guess is in the word, if it is we will congratulate the player. 

\`\``python

        if guess in word:

            print ("Good job, you have", + turns, "more guesses")

\`\``

17. Finally, we add another if statement to either let the player guess again if they did not guess correctly. 

\`\``python

        if guess not in word:

            turns -= 1 

            if turns >= 1:

                print("Try Again!")

                print("You have", + turns, "more guesses")

\`\``

18. Lastly, if they are out of turns the player will lose the game. 

\`\``python

            if turns == 0:

                print("You Loose!")

                break

\`\``

19. At the end we just need an else to let the player guess again if they already tried a letter. 

\`\``python

    else:

        print ("You already guessed that letter!")

\`\``

20. Your final code should be like this:

\`\``python

words = \["Tofu", "Cheese", "Onion", "Bread", "Honey", "Oil", "Butter"]

import random

word = random.choice(words)

guesses = \[]

turns = 6

word = word.lower()

print("Guess the word!")

while turns > 0:

    missing = 0

    for char in word:

        if char in guesses:

            print(char)

        else:

            print ("-")

            missing +=1

    if missing  == 0:

        print ("You Win!")

        print("The word is: ", word)

        break

    guess = input("guess a letter: ")

    guess = guess.lower()

    if guess not in guesses:

        guesses.append(guess)

        if guess in word:

            print ("Good job, you have", + turns, "more guesses")

        if guess not in word:

            turns -= 1 

            if turns >= 1:

                print("Try Again!")

                print("You have", + turns, "more guesses")

            if turns == 0:

                print("You Loose!")

                break  

    else:

        print ("You already guessed that letter!")

\`\``

Here is a link with the code: <https://drive.google.com/file/d/1MUFfRxi8xKpEPpzEdZCb7EQrPAh9P7ZD/view?usp=sharing> 

Good job, you finished coding Hangman! Can you add any of these features?

Extensions:

Can you make users guess multiple words with spaces between them instead of single words?

Can you make a two player version?

Can you make an ai opponent? 

<!--EndFragment-->