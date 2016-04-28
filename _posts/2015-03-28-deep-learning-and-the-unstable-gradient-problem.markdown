---
layout: post
title:  "Deep Learning and the Unstable Gradient Problem"
date:   2016-03-05
description: "A short explanation of the unstable (including the vanishing) gradient problem."
---
Deep Learning (DL) refers to the multi-layer approach of neural networks (NN). Intuitively, we expect NNs with many hidden layers to be more powerful than shallow ones with a single hidden layer. Such networks could build up different levels of abstractions just like the brain does for vision. However, training deep networks is surprisingly hard. If we pay close attention to the gradient of different layers during backpropagation we would discover how our different layers are learning in vastly different speeds, which is the size of the gradient and thus the step-size of our learning algorithm. __The fundamental reason why learning breaks down is connected to our use of the gradient-based learning technique.__ We know that it is theoretically possible that there is a specific NN architecture with an according weight setting which would satisfy whatever problem it tries to solve. Assuming that adding more layers is indeed a good thing, we can conclude that the deep NN is either overfitting or underfitting. The vanishing and exploding gradient problem captures the underfitting hypothesis. The overfitting hypothesis, on the other hand, doesn’t have a title but is due to having many more parameters and not being able to regularize well. Both of these scenarios are not bound to fully connected feed-forward architectures. They also apply to other types of NN which might be used for different kind of problems.

## The Vanishing Gradient Problem##
The fundamental problem of the vanishing or exploding gradient problem comes from the fact that shallow layers consist of the multiplication of the gradient of deeper layers. This leads to an unstable configuration which can, due to the random initialization, either swing towards exploding gradients or vanishing gradients and then, as a result, the different layers will learn at vastly different speeds.  

$$
\delta^{(l)} = \delta^{(l+1)} * (W^{(l)})^T \circ \sigma'(z^{(l)}) 
$$

If we have several layers in our NN, then our error backpropagating through the network will consist of more and more factors. These factors consist of the current weights of the network, as well as, the values of the derivative of our activation function. In the case of the sigmoid function, the value for $$\sigma ^\prime (z)$$ is going to be $$ \lt \frac{1}{4} $$. As I have explained in an earlier post on backpropagation, the errors of the shallow layers are multiplied with the errors of the deeper levels. If those layers diverge from 1.0 all the following layers will further decrease or increase those gradients towards undesired small values.

This stability problem is agnostic on the specific type of network architecture as long as it makes use of a similar layerwise gradient propagation. It is especially well known in relation to RNNs and their gradient flow in order to learn long-term dependencies. Trying to cope with this problem has lead to several techniques which can help to reduce the effects of the unstable gradient problem. 

## Unsupervised Pre-Training ##
Since 2006, several researchers have proposed different but similar unsupervised learning techniques in order to establish a better initial configuration of the weights of a deep NN prior to a supervised fine-tuning. At first, Hinton et. al. used stacked Restricted Boltzmann Machines (stacked RBMs) to do a greedy layer-wise unsupervised training of deep NNs. Further attempts use stacked denoising autoencoders (SDAE), which is, like RBMs, a similar unsupervised learning technique.

It is believed that greedy layer-wise unsupervised pre-training has a regularisation effect on the NN. It establishes an initialization point for the following fine-tuning procedure inside a region of parameters which are more plausible than a random initialization. It restricts the parameters to specific regions so that they capture the correct structure of the input distribution. Starting from pre-trained weights yields substantially better performance than a respective random initialization. The following image is from [this paper](http://www.stat.cmu.edu/~ryantibs/journalclub/deep.pdf)

![A visualisation of the effects of unsupervised pre-training.](/images/unsupervised_pre-training.png){: .center-image }

## Xavier Initialization ##
The initialization is a very delicate part of the training process. A random initialized NN will destroy the variance of the input data propagating through the layers. If one propagates gaussian distributed data through a deep NN with a tanh (hyperbolic tangent) or sigmoid activation function and with random initialization, one can observe how the mean stays around 0, as expected, while the variance will quickly go down from 1 to 0. This is very bad because it will lead to very small activations near zero. Hence, the gradients of the backward pass will be very small as well. The Xavier Initialization (or Glorot Initialization) [by Glorot et. al.](http://jmlr.org/proceedings/papers/v9/glorot10a/glorot10a.pdf) proposes a specific initialization method which kind of solves this problem. They recommend scaling the gradients by dividing it by the square root of the number of inputs for every single neuron. So if a neuron has many inputs, it will end up with lower weights which intuitively makes sense because the inputs that go into the weighted sum should have less of an interaction.



