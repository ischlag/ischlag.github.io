---
layout: post
title:  "A Short Explanation of the Forward Pass in a Neural Network"
date:   2016-02-20
description: "This short article explains the mathematics of a forward pass in a neural network."
---
This short article accompanies the article on backpropagation. It will take you step by step through the mathematics of a forward pass. 

Feed-forward neural networks are the oldest type of neural network (NN) architecture used for regression and classification tasks. The NN we are going to build is made up of different layers. Every neuron from layer $$l$$ is connected with the output of every neuron from layer $$l-1$$. This is the key attribute of a fully connected NN and every neuron has its individual set of weights and biases. We call this a feed-forward NN since the output of a layer becomes the input of the next layer. There are also other architectures such as recurrent neural networks (RNN) or convolutional neural networks (CNN) possible but for now, we are going to stick with this classic design. To be able to distinguish the vectorized neurons $$ a $$ and weights $$W$$, we add the layer they belong to as superscript (e.g. $$ a^{(1)} $$) and the dimensionality as subscript (e.g. $$a_{1\times 3}$$ ).

We can now express every layer as a single matrix multiplication. For this, we add a new row of weights for every neuron in a layer. This gives us a weight matrix $$W_l$$ with the dimensions $$n \times i$$ where $$n$$ is the number of neurons and $$i$$ is the number of inputs from the $$l-1$$ layer. 

Let's now try to calculate the output of a simple neural network. The network is made up of two layers with three inputs, four neurons in its first layer, and two output neurons. 

$$ z^{(2)} $$ is an intermediate step which encompasses the input values, the weights, and the bias term. Notice how the matrix multiplication ($$*$$) affects the dimensionality of our $$z$$ variable.

$$ z^{(2)}_{1\times 4} = a^{(1)}_{1\times 3} * W^{(1)}_{3\times 4} + b^{(1)}_{1\times 4} $$

To obtain the activation of our first layer we need to use an activation function $$\sigma () $$. This is an element-wise operation and leaves the dimensionality as it is. 

$$
a^{(2)}_{1\times 4} = \sigma(z^{(2)}_{1\times 4})
$$

We have now successfully calculated the result of our first layer. Now, we will use the output $$a^{(2)}$$ as the input of our next layer. 

$$
z^{(3)}_{1\times 2} = a^{(2)}_{1\times 4} * W^{(2)}_{4\times 2} + b^{(2)}_{1\times 2} 
$$

$$
a^{(3)}_{1\times 2} = \sigma(z^{(3)}_{1\times 2})
$$

We have calculated the output of the third layer. Since this is our last layer we have finished our forward pass through the network and have computed the two final outputs $$a^{(3)}_{1\times 2}$$.

