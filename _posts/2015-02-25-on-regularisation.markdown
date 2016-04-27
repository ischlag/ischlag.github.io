---
layout: post
title:  "On Regularisation in Neural Networks"
date:   2016-03-05
description: "What is a regularizer in a neural network?"
---
Overfitting is a serious problem in Neural Networks (NN) and large networks make it even more difficult to deal with it. Large NNs are able to find more complex models in our data so we are naturally inclined to use large networks. However, if our network is larger than the model it tries to fit it will tend to overfit and thus fail to generalise to new situations. If our network is too simple, it will not be able to achieve the high accuracy we want. In Machine Learning, there are many techniques explicitly designed to reduce the validation error. These strategies are collectively known as regularization techniques. They usually consist of some kind of modification to an existing Learning Algorithm (LA) in order to improve its ability to generalise. It is important to understand how an LA works and as it turns out, developing better regularisation techniques has been and still is one of the major research efforts in this field. 

A regularizer can be a term which we add to our cost function $$J$$ so that it limits the capacity of our NN to model the true underlying function $$\tilde{J}$$. It achieves this by adding a penalty to the parameters of the NN. This penalty increases the value of our cost function if the parameters are too big, hence they will be kept as small as possible while the LA is training the network. The regularization term $$R$$ is always introduced together with the regularization parameter $$\lambda $$. It is another hyper-parameter which we can use to adjust our cost function according to the dataset.

$$
\tilde{J}(W,b) = J(W,b) + \lambda R(W)
$$

Usually, researchers tend to only regularise the weights of a cost function and not the biases. This has to do with the nature of the biases and seems first counter-intuitive. It becomes clear once we look at a linear problem. 

$$
y = aX + b
$$

In this example, we can reduce the problem of overfitting. It is caused by $$a$$ being too specific. $$b$$, on the other hand, only offsets a good solution and its scale is far less important. If $$b$$ increase in size it will not lead to overfitting so it makes no sense to actually penalise it.

## L2 Norm ##
The  L2 Norm is perhaps the most common regularization term. It forces the LA to find small values for the weights of the NN. For every weight of the network, we add its squared magnitude. This regularization term can be used for any cost function. In the following equation, we describe the original, unregularized cost function as $$J_0$$.

$$
J(W,b) = J_0 + \frac{\lambda}{2n}\Sigma W^2
$$

This forces larger weights to decay more than smaller ones, thus resulting in an overall simpler model. The L2 Norm usually forces all weights to collaborate because it usually never reduces any weight to zero. 

## L1 Norm##
The L1 norm is also very common and quite similar to the L2 norm. However, its effect is somewhat different. 

$$
J(W,b) = J_0 + \frac{\lambda}{n}\Sigma \vert W\vert
$$

It has the property which leads the weight matrix to become sparse. It will force the LA to identify the most important neurons in its network and to reduce the unnecessary inputs to zero. In the end, the weight matrix will be sparse with some large weights and some weights being exactly zero.

## Artificial Data ##
Not all regularisation methods are based on a regularization term. A simple way to achieve better generalisation is to simply provide more training data. Sometimes this might be difficult to achieve in a real scenario. A simple solution to this problem might include artificial/synthetic/augmented data. With artificial data, we usually mean either to build some kind of algorithm which can produce new data (e.g. generating text) or to modify existing data in some way (e.g. mirroring of images, perturbation of vocal tract length). Generating artificial data is a very data specific approach but can be very effective especially for problems where the amount of data is rather limited.
