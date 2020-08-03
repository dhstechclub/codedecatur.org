---
title: Fun with C++
author: Matias
language: cplusplus
difficulty: 1
description: Learn the basics of C++
date: August 3, 2020
draft: true
slug: ""
---
ZProgramming, and the learning of it, can seem daunting to people new to the field. Many start with Java, C#, python, or another "high-level" programming language. Languages like these sit high atop many layers, that transform your written code into something the computer understands, known as machine code. The benefit of having these layers is that a lot of the tricks and technicques needed to achieve seemingly simple things are hidden from the programmer, simplifying what the coder has to write significantly. However, by adding this layer of abstraction a lot of high level languages trade off the fine control a programmer would have over the code that the computer will eventually run. This means that, many times code written in a language such as Java will look simpler to the reader, but will suffer a lot from unnecessary performance overhead.

For example, let's take this code:

```java
ArrayList<Car> carList;

for (int i = 0; i < 9999; i++)
{
  Car theCar = new Car();
  carList.add(theCar);
}
```

If this code were run in Java, `theCar` would have to be constructed, then copied into `carList`, and then destructed (since the copy now exists). So what's wrong with that? First, we need to talk about the heap.