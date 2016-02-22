---
layout: post
title:  "A simple backprop explanation"
date:   2016-01-05
---
##Abstract##
The goal of this article is to provide a simple and easy to understand explanation of the backpropagation algorithm. It is used to train different types of artificial neural networks. In this article, we will focus on [multi-layer perceptron networks][1]. It is the basis on which more advanced deep learning techniques build upon. For this article, I assume you know how a simple multi-layer perceptron network works once it is trained.

##First Things First##
Before we jump to the backpropagation algorithm, we are going to explain the notion of _training_. Let me introduce my function $$ f $$.

$$ f(x) = m*x + c $$

You probably know this function. It is very simple. However, we are not yet able to use it to our advantage since we haven't defined $$ m $$ and $$ c $$ yet. $$m$$ and $$c$$ are our _weights_. They define the behaviour of our function and if we want our function to behave in a certain way, we have to change the weights until it does as we please. This is what we call _training_.

##The Cost Function##

Let's now try to change the weights of our function with respect to some data. Let's ignore $$c$$ for a while. We define $$c = 0$$ until later. For this example, we are going to work with the two data points $$A$$ and $$B$$ and we start of with $$ m = 1 $$. Since we can have multiple data points, we will put our data into vectors. Therefore, our data consists of the input vector $$x$$ (the clue) and our prediction vector $$y$$.

$$
x = \begin{pmatrix} A_x \\ B_x \end{pmatrix}
$$

$$ y = f(x) = \begin{pmatrix} f(A_x) \\ f(B_x) \end{pmatrix} $$

$$ \hat{y} = \begin{pmatrix} A_y \\ B_y \end{pmatrix} $$

The _cost_ of our function $$f$$ is now the difference between our prediction $$y$$ and our desired prediction $$\hat{y}$$. We denote this with the cost-function $$C(m)$$. A first and straight forward way to calculate the cost would be the absolute value of its difference.
The next equation shows the cost calculation for data point $$A$$ and the following equation is the cost over all data points.

$$C_{linear,A}(m) = \Vert f(A_x) - A_y \Vert  $$

$$C_{linear}(m) = \sum_{i} \Vert y^{(i)} - \hat{y}^{(i)} \Vert  $$

However, if we use the quadratic distance function or the sometimes known as the _squared error_ we see that $$C$$ is never negative and it continues to decrease in a steady way. The $$\frac{1}{2}$$ fraction which we put in front is just to make it simpler to take the derivative which we will do later.

$$C(m) = \frac{1}{2}\sum_{i} \Vert y^{(i)} - \hat{y}^{(i)} \Vert^2  $$

The following figure is a visualization of our current state. The left side shows our current function and the error values $$ Error_A $$ and $$ Error_B $$. The right side shows how the error changes with respect to $$m$$. You can play around with it by moving the slider for $$m$$. I have added both cost functions so you can see the difference.

<div>
<iframe scrolling="no" src="https://www.geogebra.org/material/iframe/id/2373641/width/578/height/250/border/888888/rc/false/ai/false/sdz/true/smb/false/stb/false/stbh/true/ld/false/sri/true/at/auto" width="578px" height="250px" style="border:0px;"> </iframe>
</div>

So far so good. As you now know, our goal is to find a set of values for our weights so that their error is as small as possible. One way to do this is to go through all possible values for $$x$$ and then choose the one with the lowest error value. But this approach is expensive. It requires too much processing power and is therefore not feasible. But we have now encountered an optimization problem. We might as well use a well-known algorithm to solve such optimization problems. The one we are going to look at is called _Gradient Descent_.

## Gradient Descent##

Gradient descent is a very simple but powerful algorithm to find the local minimum of a function. It is an iterative algorithm. With every step, it uses the sign of the first derivative (the slope) to evaluate if it should go left or right.

<div>
<iframe scrolling="no" src="https://www.geogebra.org/material/iframe/id/2374191/width/478/height/259/border/888888/rc/false/ai/false/sdz/true/smb/false/stb/false/stbh/true/ld/false/sri/true/at/auto" width="478px" height="259px" style="border:0px;"> </iframe>
</div>

The derivative notation for a function like $$ g(x) = x^2 $$ with respect to $$x$$ is as follows.

$$ \frac{\partial g(x)}{\partial x} = 2x $$

Let's now define the derivative of our cost function as $$\nabla C$$

$$ \nabla C = \frac{\partial C(m)}{\partial m} $$

To make sure that our iterative algorithm is always going downhill we are now using $$ \nabla C$$ to calculate a step $$\Delta m$$ which we take down the bowl of the cost function. $$\eta$$ is our step size. It has to be negative since we need to go towards the opposite direction of the gradient.

$$ \Delta m = - \eta \nabla C $$

Finally we add our $$\Delta m$$ - our weight adjustment - to our current weight configuration.

$$ m = m + \Delta m $$

We repeat this process until we have reached a maximum number of iterations or until the gradient has approached 0. This would mean that we have reached a minimum in our function. We probably have now a good configuration of our weight $$m$$. The network is now trained.

##Calculating The Derivative##

We left out a small step in the previous part. This is the derivative so far.

$$ \frac{\partial C(m)}{\partial m} = \frac{\partial \frac{1}{2}\sum_{i} \Vert y^{(i)} - \hat{y}^{(i)} \Vert^2}{\partial m} $$

As you can see, we are not really able to derive with respect to $$m$$. It is not part of our equation. We must apply the chain rule to find the first derivative. The following are both equivalent notations of the chain rule.

$$ f'(x) = ( g(h(x)) )' = g'(h(x)) h'(x) $$

$$ \frac{\partial y}{\partial x} = \frac{\partial y}{\partial u}\frac{\partial u}{\partial x} $$

To make things a little easier to follow we substitute $$\Vert y^{(i)} - \hat{y}^{(i)} \Vert$$ with $$s$$.

$$ \frac{\partial C(m)}{\partial m} = \frac{\partial \frac{1}{2}\sum_{i} s^2}{\partial m} $$

We can put the summation in front and apply the chain rule to our first fraction. We derive it with respect to $$s$$.

$$ \frac{\partial C(m)}{\partial m} =
\sum_{i} \frac{\partial \frac{1}{2} s^2}{\partial s} \frac{\partial s}{\partial m}$$

We can now resubstitute $$s$$ in the enumerator of our second fraction.

$$ \frac{\partial C(m)}{\partial m} =
\sum_{i} \frac{\partial \frac{1}{2} s^2}{\partial s}
\frac{\partial \Vert y^{(i)} - \hat{y}^{(i)} \Vert}{\partial m}
$$

Now we apply the chain rule again. We derive the second derivative with respect to $$y^{(i)}$$.

$$ \frac{\partial C(m)}{\partial m} =
\sum_{i} \frac{\partial \frac{1}{2} s^2}{\partial s}
\frac{\partial \Vert y^{(i)} - \hat{y}^{(i)} \Vert}{\partial y^{(i)}}
\frac{\partial f(x^{(i)})}{\partial m}
$$

And finally we substitute $$f(x)$$ with our linear function which gives us the $$m$$ we were looking for.

$$ \frac{\partial C(m)}{\partial m} =
\sum_{i} \frac{\partial \frac{1}{2} s^2}{\partial s}
\frac{\partial \Vert y^{(i)} - \hat{y}^{(i)} \Vert}{\partial y^{(i)}}
\frac{\partial m*x+c)}{\partial m}
$$

Now we can solve each fraction on its own.

$$ \frac{\partial C(m)}{\partial m} =
\sum_{i} s
1
x
$$

Which then becomes:

$$ \frac{\partial C(m)}{\partial m} =
\sum_{i} \Vert f(x^{(i)}) - \hat{y}^{(i)} \Vert * x
$$

Congratulations! You have successfully trained a linear function. Training a neural network is not much different. But first, let's have a look at the last piece of the puzzle.

##Multi-Variable Derivative##

Do you still remember our $$c$$ we had earlier? Well, let's now include $$c$$ as our second weight. Now we have a small problem. We can only find derivatives with respect to a single variable. If we want to find the derivative of two or more variables we need to find the total derivative. Let's look at an example where we have $$f(x,y) = 2x^2y^3$$. Calculus tells us the following about the total derivative of a two-variable function.

$$ df(x,y) = \frac{\partial f(x,y)}{\partial x} dx + \frac{\partial f(x,y)}{\partial y} dy $$

So we basically calculate the partial derivatives with respect to every variable on its own.

$$ \frac{\partial f(x,y)}{\partial x} dx = 4xy^3 $$

$$ \frac{\partial f(x,y)}{\partial y} dy = 6x^2y^2 $$

Now we add them together and we get our total derivative.

$$ df(x,y) = 4xy^3dx + 6x^2y^2dy $$

Since we now know that we can add up the partial derivatives we can now do something similar. Instead of only calculating $$\Delta m$$ with respect to $$m$$ we can now also calculate $$\Delta c$$ with respect to $$c$$.

$$ \Delta m = -\eta \frac{\partial C(m,c)}{\partial m} $$

$$ \Delta c = -\eta \frac{\partial C(m,c)}{\partial c} $$

With every iteration we now change $$m$$ and $$c$$ at the same time.

$$ m = m + \Delta m $$

$$ c = c + \Delta c $$

The same thing is done considering more variables. Now we know everything to apply the same thing to an untrained neural network.

##Neural Networks##

You already know all the basics to train a neural network. Forget the example we have been looking at so far. Let's now try to apply what we have learned to train a multi-layer perceptron neural network. We are going to calculate the cost for an arbitrary set of data. The cost is a feedforward pass through our random initialized neural network with a quadratic error at the end.

In this example, we are using 2 input neurons, 3 hidden neurons, and 2 output neurons. The activation function depicted as $$\sigma()$$ and the neuron we use is the classical model with a bias added at the end.

$$ a^{(l+1)}=\sigma(a^{(l)}W^{(l)} + b^{(l)})$$

Always keep track of the dimensions! I have added the dimensionality as the subscript. Let's stepwise calculate the cost. If you know how a feedforward neural network works this should be pretty clear to you.

$$ a^{(1)}_{1x2} = x = \begin{pmatrix} x_1 , x_2 \end{pmatrix} $$

$$ z^{(2)}_{1x3} = a^{(1)}_{1x2} * W^{(1)}_{2x3} + b^{(1)}_{1x3} $$

$$ a^{(2)}_{1x3} = \sigma(z^{(2)}_{1x3}) $$

$$ z^{(3)}_{1x2} = a^{(2)}_{1x3} * W^{(2)}_{3x2} + b^{(1)}_{1x2} $$

$$ a^{(3)}_{1x2} = \sigma(z^{(3)}_{1x2}) $$

$$ s_{1x2} = a^{(3)}_{1x2} - \hat{y} $$

$$ C(W,b) = \frac{1}{2}s^2_{1x2} $$

If we now resubstitute all those lines we get one big equation for $$C(W,b)$$. Our goal now is to find the derivative of that equation with respect to every weight $$W$$ and bias $$b$$. Let's look how this would turn out. As we did before, we are now using the chain rule over and over. We begin with the derivative for $$W^{(1)}$$ which is of course a matrix. So at the end, our derivative will also produce a matrix with the derivative of every weight as an element.

$$ \frac{\partial C(W,b)}{\partial W^{(1)}} = \frac{\partial \frac{1}{2}s^2_{1x2}}{\partial W^{(1)}}$$

Let's apply the chain rule and replace $$s_{1x2}$$ with the definition we had in our forward pass.

$$ \frac{\partial C(W,b)}{\partial W^{(1)}} =
\frac{\partial \frac{1}{2}s^2_{1x2}}{\partial s_{1x2}}
\frac{\partial s_{1x2}}{\partial W^{(1)}} =
\frac{\partial \frac{1}{2}s^2_{1x2}}{\partial s_{1x2}}
\frac{\partial a^{(3)}_{1x2} - \hat{y}}{\partial W^{(1)}}
$$

Let's apply the chain rule and replace $$a^{(3)}_{1x2}$$ with the definition we had in our forward pass.

$$ \frac{\partial C(W,b)}{\partial W^{(1)}} =
\frac{\partial \frac{1}{2}s^2_{1x2}}{\partial s_{1x2}}
\frac{\partial a^{(3)}_{1x2} - \hat{y}}{\partial a^{(3)}_{1x2}}
\frac{\partial \sigma(z^{(3)}_{1x2})}{\partial W^{(1)}}
$$

Let's apply the chain rule and replace $$\sigma(z^{(3)}_{1x2})$$ with the definition we had in our forward pass.

$$ \frac{\partial C(W,b)}{\partial W^{(1)}} =
\frac{\partial \frac{1}{2}s^2_{1x2}}{\partial s_{1x2}}
\frac{\partial a^{(3)}_{1x2} - \hat{y}}{\partial a^{(3)}_{1x2}}
\frac{\partial \sigma(z^{(3)}_{1x2})}{\partial z^{(3)}_{1x2}}
\frac{\partial a^{(2)}_{1x3} * W^{(2)}_{3x2} + b^{(1)}_{1x2}}{\partial W^{(1)}}
$$

Let's apply the chain rule and replace $$a^{(2)}_{1x3}$$ with the definition we had in our forward pass.

$$ \frac{\partial C(W,b)}{\partial W^{(1)}} =
\frac{\partial \frac{1}{2}s^2_{1x2}}{\partial s_{1x2}}
\frac{\partial a^{(3)}_{1x2} - \hat{y}}{\partial a^{(3)}_{1x2}}
\frac{\partial \sigma(z^{(3)}_{1x2})}{\partial z^{(3)}_{1x2}}
\frac{\partial a^{(2)}_{1x3} * W^{(2)}_{3x2} + b^{(1)}_{1x2}}{\partial a^{(2)}_{1x3}}
\frac{\partial \sigma(z^{(2)}_{1x3})}{\partial W^{(1)}}
$$

Let's apply the chain rule and replace $$\sigma(z^{(2)}_{1x3})$$ with the definition we had in our forward pass.

$$ \frac{\partial C(W,b)}{\partial W^{(1)}} = $$

$$
\frac{\partial \frac{1}{2}s^2_{1x2}}{\partial s_{1x2}}
\frac{\partial a^{(3)}_{1x2} - \hat{y}}{\partial a^{(3)}_{1x2}}
\frac{\partial \sigma(z^{(3)}_{1x2})}{\partial z^{(3)}_{1x2}}
\frac{\partial a^{(2)}_{1x3} * W^{(2)}_{3x2} + b^{(2)}_{1x2}}{\partial a^{(2)}_{1x3}}
\frac{\partial \sigma(z^{(2)}_{1x3})}{\partial z^{(2)}_{1x3}}
\frac{\partial a^{(1)}_{1x2} * W^{(1)}_{2x3} + b^{(1)}_{1x3}}{\partial W^{(1)}}
$$

Finally! We have reached a term where we can now derive $$W^{(1)}$$. Let's now simplify this a little bit.

$$
(s_{1x2}); (1); (\sigma'(z^{(3)}_{1x2})); (W^{(2)}_{3x2}); (\sigma'(z^{(2)}_{1x3})); (a^{(1)}_{1x2})
$$

Note that I have put $$;$$ inbetween the factors. The reason is that we are not always doing a normal multiplication and we need to be careful about dimensionality. Let's resubstitute the last variable we have with known numbers and put in the proper operators.

$$
\frac{\partial C(W,b)}{\partial W^{(1)}} =
(a^{(1)}_{1x2})' (((a^{(3)}_{1x2} - \hat{y})\circ\sigma'(z^{(3)}_{1x2})) (W^{(2)}_{3x2})^T \circ \sigma'(z^{(2)}_{1x3})) 
$$

The $$\circ $$ is the Hadamard Product and only means element-wise multiplication. You can think of it as only multiplying the error with its respective gradient. This is needed because we don't want to mix up the derivative of different weights when computing all weights of a single weight matrix at once. Now our equation only consists of things we know and we are able to calculate the derivative.

Let's now quickly have a look at $$\frac{\partial C(W,b)}{\partial W^{(2)}}$$. This is the derivative of our cost function with respect to the weights of our last layer. If you follow the steps we just did we can stop using the chain rule much sooner and end up with the equation we also had above.

$$ \frac{\partial C(W,b)}{\partial W^{(2)}} =
\frac{\partial \frac{1}{2}s^2_{1x2}}{\partial s_{1x2}}
\frac{\partial a^{(3)}_{1x2} - \hat{y}}{\partial a^{(3)}_{1x2}}
\frac{\partial \sigma(z^{(3)}_{1x2})}{\partial z^{(3)}_{1x2}}
\frac{\partial a^{(2)}_{1x3} * W^{(2)}_{3x2} + b^{(1)}_{1x2}}{\partial W^{(2)}}
$$

If we simplify this equation we get the following.

$$
\frac{C(W,b)}{\partial W^{(2)}} = (a^{(2)}_{1x3})' ((a^{(3)}_{1x2} - \hat{y}) \circ (\sigma'(z^{(3)}_{1x2})))
$$

As you can see, those are the same calculations we did before. We can compute the results much more efficient if we keep track of our progress. Therefore, we introduce a new variable $$\delta$$.

$$ \delta^{(3)}_{1x2} = (a^{(3)}_{1x2} - \hat{y}) \circ \sigma'(z^{(3)}_{1x2}) $$

Now we can simplify $$\frac{\partial C(W,b)}{\partial W^{(1)}}$$

$$
\frac{\partial C(W,b)}{\partial W^{(1)}} =
(a^{(1)}_{1x2})' ((W^{(2)}_{3x2})^T \circ \sigma'(z^{(2)}_{1x3})) 
$$

Now our derivative with respect to $$W^{(2)}_{3x1} $$ is simple.

$$ \frac{\partial C(W,b)}{\partial W^{(2)}_{3x2}} = (a^{(2)}_{1x3})' \delta^{(3)}_{1x2}  $$

We can also use $$ \delta^{(3)}_{1x2}$$ to calculate $$\delta^{(2)}_{1x3} $$. Since $$ \delta^{(3)}_{1x2}$$ is a part of $$\delta^{(2)}_{1x3} $$.

$$ \delta^{(2)}_{1x3} = \delta^{(3)}_{1x2} * (W^{(2)}_{3x2})^T \circ \sigma'(z^{(3)}_{1x2}) $$

We can actually generalize this for the last layer $$L$$ and every other layer.

$$ \delta^{(L)} = (a^{(L)} - \hat{y}) \circ \sigma'(z^{(L)}) $$

$$ \delta^{(l)} = \delta^{(l+1)} * (W^{(l)})^T \circ \sigma'(z^{(l)}) $$

And this is essentially why it is called backpropagation. We propagate the error $$\delta$$ from the ouput layer back through the network until we reach the first layer. This is a little hard to grasp but as you can see $$\delta$$ is nothing else then a part of our cost derivative which we can reuse when calculating other derivatives. We can now finish our training by summing up all the gradients over all the data $$k$$ in our batch.

$$ \Delta W^{(l)} = -\frac{\eta}{k}\sum^k_i \frac{\partial C(W,b)}{\partial W^{(l)}} $$

$$ \Delta b^{(l)} = -\frac{\eta}{k}\sum^k_i \frac{\partial C(W,b)}{\partial b^{(l)}} $$

Now we only need to add those to our current values for $$W^{(l)}$$ and $$b^{(l)}$$ and check if we should stop or continue with another batch.

If you are more comfortable with source code you can look up my implementation of this in Julia [here][2].

Some useful resources:

  - [Neural Networks and Deep Learning, Michael Nielsen][3]
  - [Machine Learning, Stanford University, Andrew Ng][5]
  - [Backpropagation Algorithm][4]

[1]: https://en.wikipedia.org/wiki/Multilayer_perceptron
[2]: https://github.com/ischlag/Julia-Machine-Learning/blob/master/Neural%20Network/BackpropNeuralNetwork.jl
[3]: http://neuralnetworksanddeeplearning.com/chap1.html
[4]: http://deeplearning.stanford.edu/wiki/index.php/Backpropagation_Algorithm
[5]: https://www.coursera.org/learn/machine-learning
