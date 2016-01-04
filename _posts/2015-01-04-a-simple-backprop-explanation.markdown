---
layout: post
title:  "A simple backprop explanation"
date:   2015-12-27
---
##Abstract##
The goal of this article is to provide a **simple and easy to understand explanation** of the backpropagation algorithm. It is used to train different types of artificial neural networks. In this article, we will focus on [multi-layer perceptron networks][1]. It is the basis on which more advanced deep learning techniques build upon. For this article, I assume you know how a simple multi-layer perceptron works once it is trained.

##First things first##
Before we jump to the backpropagation algorithm, we are going to explain the notion of _training_. Let me introduce my function $$ f $$.

$$ f(x) = m*x + c $$

You probably know this function. It is very simple. However, we are not yet able to use it to our advantage since we haven't defined $$ m $$ and $$ c $$ yet. $$m$$ and $$c$$ are our _weights_. They define the behaviour of our function and if we want our function to behave in a certain way, we have to change the weights until it does as we please. This is what we call _training_.

##The Cost Function##

Let's now try to change the weights of our function with respect to some data. Lets ignore $$c$$ for a while. We define $$c = 0$$ until later. For this example we are going to work with the two data points $$A$$ and $$B$$ and we start of with $$ m = 1 $$. Since we can have multiple data points, we will put our data into vectors. Therefore, our data consists of the input vector $$x$$ and our prediction vector $$y$$.

$$
x = \begin{pmatrix} A_x \\ B_x \end{pmatrix}
$$

$$ y = f(x) = \begin{pmatrix} f(A_x) \\ f(B_x) \end{pmatrix} $$

$$ \hat{y} = \begin{pmatrix} A_y \\ B_y \end{pmatrix} $$

The _cost_ of our function $$f$$ is now the difference between our prediction $$y$$ and our desired prediction $$\hat{y}$$. We denote this with the cost-function $$C$$ which depends on $$m$$. Sometimes this is also labeled as $$J$$.

$$C_{linear,A}(m) = \Vert f(A_x) - A_y \Vert  $$

$$C_{linear}(m) = \sum_{i} \Vert y^{(i)} - \hat{y}^{(i)} \Vert  $$

The first equation shows the cost calculation for the data point $$A$$. The second equation is the sum over all data points. However, if we use the quadratic distance function or the sometimes known as the mean squared error we see that C is never negative and it continues to decrease in a steady way.

$$C_{quadratic}(m) = \sum_{i} \Vert y^{(i)} - \hat{y}^{(i)} \Vert^2  $$

The following figure is a visualization of our current state. The left side shows our current function and the error values $$ Error_A $$ and $$ Error_B $$. The right side shows how the error changes with respect to $$m$$. You can play around with it by moving the slider for $$m$$.

<iframe scrolling="no" src="https://www.geogebra.org/material/iframe/id/2373641/width/598/height/250/border/888888/rc/false/ai/false/sdz/true/smb/false/stb/false/stbh/true/ld/false/sri/true/at/auto" width="598px" height="250px" style="border:0px;"> </iframe>




[1]: https://en.wikipedia.org/wiki/Multilayer_perceptron
