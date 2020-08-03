---
title: Why you should learn C++
author: Matias
language: cplusplus
difficulty: 3
description: aka fun with the heap
date: August 3, 2020
draft: true
slug: ""
---
ZProgramming, and the learning of it, can seem daunting to people new to the field. Many start with Java, C#, python, or another "high-level" programming language. Languages like these sit high atop many layers, that transform your written code into something the computer understands, known as machine code. The benefit of having these layers is that a lot of the tricks and technicques needed to achieve seemingly simple things are hidden from the programmer, simplifying what the coder has to write significantly. However, by adding this layer of abstraction a lot of high level languages trade off the fine control a programmer would have over the code that the computer will eventually run. This means that, many times code written in a language such as Java will look simpler to the reader, but will suffer a lot from unnecessary performance overhead.

For example, let's take this code:

```java
ArrayList<Car> carList;

for (int carNum = 0; carNum < 9999; carNum++)
{
  Car theCar = new Car(carNum);
  carList.add(theCar);
}
```

If this code were run in Java, `theCar` would have to be constructed, then copied into `carList`, and then destructed (since the copy now exists). So what's wrong with that? First, we need to talk about the heap.

Any running program has a few pieces of equally fast memory (RAM) assigned to it. For now, let's only look at the heap, since that's where most objects are dumped into. The heap is a dynamically-sized block of memory. This means that, as more objects are constructed and dumped into the heap, it will have to grow to accomodate for this new data. This is good, as programs that don't need a lot of memory can have a small heap and programs that do need a lot can grow the heap to their needs. However, there is one huge problem with resizing the heap for every new object: speed. Heap resizing is slow. Very slow.

In the example code above, the heap is initially grown to store an `ArrayList` of `Car`s. Then, each time that loop runs (9999 times!), the heap is grown to store `theCar`, then grown again to store the copy of `theCar` that is created inside of `carList`. That's 19999 heap allocations! This code will be very slow.

NOTE: This is assuming a straightforward interpretation of the code by the compiler. It is possible that the code could be automatically optimized by Java to avoid the double allocation in the for loop. It's just not guaranteed, especially for more complex code.

Now, let's see how we can do this in C++.

```cpp
std::vector<Car> carList;
carList.reserve(9999); // heap allocation!

for (int carNum = 0; carNum < 9999; carNum++)
{
  carList.emplace_back(carNum); // create new Car(carNum) in the reserved space
}
```

Let's break down the code. First, `carList` is created, and we reserve space for 9999 `Car`s. This is our first and last heap allocation. Then, the loop "emplaces" new `Car`s into the list. This is not a heap allocation, because we are directly inserting the new `Car` into the already-allocated space.