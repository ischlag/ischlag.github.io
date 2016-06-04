---
layout: post
title:  "A Simple Neural Network in Tensorflow"
date:   2016-06-03
description: "Learn how to build a neural network in tensorflow."
---
### TL;DR;
A brief and concise step by step explanation on how to train a simple neural network in tensorflow.

### Context
We are going to use the MNIST dataset to train a very simple neural network with no hidden layer. If you don't know how to install tensorflow check out this [post]({% post_url 2016-06-02-installing-tensorflow %}). Also have a look at the [official tutorials](https://www.tensorflow.org/versions/master/tutorials/index.html) for tensorflow.

### Code
First, we need to import tensorflow and add a few parameters which we will use later.

```python
import tensorflow as tf

# config
batch_size = 100
learning_rate = 0.01
training_epochs = 10
```
Load the MNIST data.

```python
from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets('MNIST_data', one_hot=True)
```
The network we are going to build will use the MNIST data to train its weights and biases. In tensorflow, we _feed_ this data into the model (tensorflow calls this a _graph_). We'll do this later but a placeholder is such a variable. We create now two placeholder for our flattened 28x28 big image data and our 10 labels.

```python
# None -> batch size can be any size, 784 -> flattened mnist image
x = tf.placeholder(tf.float32, shape=[None, 784]) 
# target 10 output classes
y_ = tf.placeholder(tf.float32, shape=[None, 10])
```
A variable in tensorflow is a value which can change. Usually, this corresponds to the parameters of the model we are going to train. In this case, the weights are according to the weight matrix of a neural network and the biases of each neurone. The shape of these variables corresponds to the size of our network.

```python
# model parameters will change during training so we use tf.Variable
W = tf.Variable(tf.zeros([784, 10]))
# bias
b = tf.Variable(tf.zeros([10]))
```
Now we have prepared all the ingredients for our model. We can now define our model which will calculate our prediction y. In this simple neuronal network, we have no hidden layer and perform a softmax for our 10 prediction classes.

```python
# y is our prediction
y = tf.nn.softmax(tf.matmul(x,W) + b)
```
An important part in order to train our network is the cost function. Here we use the cross-entropy error based on our prediction y and our target value y_.

```python
cross_entropy = tf.reduce_mean(-tf.reduce_sum(y_ * tf.log(y), reduction_indices=[1]))
```
Another value we want to calculate is the accuracy of our parameters. We don't need to use any tensorflow specific elements since this variable is not used during the training of the model. However, it does come with some handy functions which we shall use. 

```python
correct_prediction = tf.equal(tf.argmax(y,1), tf.argmax(y_,1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
```
To train our model we use a gradient descent method. Tensorflow comes with several already implemented techniques. As a result we get a operation. This operation is tied to our graph and once we start a session we can execute this optimizer operation.

```python
train_op = tf.train.GradientDescentOptimizer(learning_rate).minimize(cross_entropy) 
```
In tensorflow, a session executes our graph on our computing hardware such as CPUs and GPUs. After we have created a session we need to initialize all the tensorflow variables. We have to do this before we do anything else. To do that we perform the initialization operation on our session. We can execute operations with the run() function of our session. 

```python
with tf.Session() as sess:
  sess.run(tf.initialize_all_variables())
```
Next, we will create batches from our training data and iterate over them.

```python
  for epoch in range(training_epochs):
    # number of batches in one epoch
    batch_count = int(mnist.train.num_examples/batch_size)
    for i in range(batch_count):
      batch_x, batch_y = mnist.train.next_batch(batch_size)
```
We now execute our train operation on our session. In order to do this, we have to feed it the data we promised when we declared the placeholders at the beginning.

```python
      sess.run([train_op], feed_dict={x: batch_x, y_: batch_y})
```
Finally, we make sure to continuously print our progress and the final accuracy of the test images of MNIST.

```python
    if epoch % 2 == 0: 
      print "Epoch: ", epoch 
  print "Accuracy: ", accuracy.eval(feed_dict={x: mnist.test.images, y_: mnist.test.labels})
  print "done"
```
This simple model achieves an accuracy of ~0.89. 

Here is all the code from above in one piece:


```python
import tensorflow as tf

# reset everything to rerun in jupyter
tf.reset_default_graph()

# config
batch_size = 100
learning_rate = 0.01
training_epochs = 10

# load mnist data set
from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets('MNIST_data', one_hot=True)

# input images
# None -> batch size can be any size, 784 -> flattened mnist image
x = tf.placeholder(tf.float32, shape=[None, 784], name="x-input") 
# target 10 output classes
y_ = tf.placeholder(tf.float32, shape=[None, 10], name="y-input")

# model parameters will change during training so we use tf.Variable
W = tf.Variable(tf.zeros([784, 10]))

# bias
b = tf.Variable(tf.zeros([10]))

# implement model
# y is our prediction
y = tf.nn.softmax(tf.matmul(x,W) + b)

# specify cost function
# this is our cost
cross_entropy = tf.reduce_mean(-tf.reduce_sum(y_ * tf.log(y), reduction_indices=[1]))

# Accuracy
correct_prediction = tf.equal(tf.argmax(y,1), tf.argmax(y_,1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))

# specify optimizer
# optimizer is an "operation" which we can execute in a session
train_op = tf.train.GradientDescentOptimizer(learning_rate).minimize(cross_entropy)

with tf.Session() as sess:
  # variables need to be initialized before we can use them
  sess.run(tf.initialize_all_variables())

  # perform training cycles
  for epoch in range(training_epochs):
        
    # number of batches in one epoch
    batch_count = int(mnist.train.num_examples/batch_size)
        
    for i in range(batch_count):
      batch_x, batch_y = mnist.train.next_batch(batch_size)
            
      # perform the operations we defined earlier on batch
      sess.run([train_op], feed_dict={x: batch_x, y_: batch_y})
            
    if epoch % 2 == 0: 
      print "Epoch: ", epoch 
  print "Accuracy: ", accuracy.eval(feed_dict={x: mnist.test.images, y_: mnist.test.labels})
  print "done"
```
