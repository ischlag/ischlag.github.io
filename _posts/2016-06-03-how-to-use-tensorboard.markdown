---
layout: post
title:  "How to use Tensorboard"
date:   2016-06-03
description: "Learn how to visualize your neural networks using Tensorboard."
---
### TL;DR;
A brief and concise tutorial on how visualize different aspects such as the loss of your neural network using Tensorboard.

### Context
We are going to work with a fully-connected neural network using the MNIST dataset. The following code achieves an accuracy of ~0.909. This is not bad but we have no clue what is actually going on or how our model looks. We will now add the necessary commands to the following example in order to visualize the magic using Tensorboard.

```python
# load mnist data set
from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets('MNIST_data', one_hot=True)

# build graph in an interactive session
import tensorflow as tf
sess = tf.InteractiveSession()

# input images
# None -> batch size can be any size, 784 -> flattened mnist image
x = tf.placeholder(tf.float32, shape=[None, 784]) 

# target 10 output classes
y_ = tf.placeholder(tf.float32, shape=[None, 10])

# weights, initialize with zeroes, 784 input, 10 output
W = tf.Variable(tf.zeros([784,10]))

# bias
b = tf.Variable(tf.zeros([10]))

# variables need to be initialized before we can use them
sess.run(tf.initialize_all_variables())

# implement model
y = tf.nn.softmax(tf.matmul(x,W) + b)

# specify cost function
cross_entropy = tf.reduce_mean(-tf.reduce_sum(y_ * tf.log(y), reduction_indices=[1]))

# specify optimizer
train_step = tf.train.GradientDescentOptimizer(0.5).minimize(cross_entropy)

# perform 1000 train steps
for i in range(1000):
  batch = mnist.train.next_batch(50)
  train_step.run(feed_dict={x: batch[0], y_: batch[1]})

# compare prediction with truth
correct_prediction = tf.equal(tf.argmax(y,1), tf.argmax(y_,1))

# calculate accuracy
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))

# print accuracy
print(accuracy.eval(feed_dict={x: mnist.test.images, y_: mnist.test.labels}))
```

### Write a log file and run Tensorboard
Tensorflow summaries are essentially logs. We can now visualize our model/graph using tensorboard. For this we need to write our graph into a log directory. We need to add the following line at the end of our MNIST example.

```python
writer = tf.train.SummaryWriter("/tmp/tensorflow/", sess.graph)
```
This line will create a log folder and save the graph of this session. We can now start tensorboard.

```bash
tensorboard --logdir /tmp/tensorflow/ --port 6006
```
You will notice that tensorboard is not be able to find scalar values as we have not specifically logged any. You can, however, look at the tensorflow graph in the _Graph_ tab. The visualization of our not annotated graph will look messy. To clean up the visualization of our model in tensorboard we need to add the scope of our variables and a name for our placeholders. Lets do some changes.

```python
# load mnist data set
from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets('MNIST_data', one_hot=True)

# build graph in an interactive session
import tensorflow as tf
sess = tf.InteractiveSession()

# input images
with tf.name_scope('input'):
    # None -> batch size can be any size, 784 -> flattened mnist image
    x = tf.placeholder(tf.float32, shape=[None, 784], name="x-input") 
    # target 10 output classes
    y_ = tf.placeholder(tf.float32, shape=[None, 10], name="y-input")

# weights, initialize with zeroes, 784 input, 10 output
with tf.name_scope("weights"):
    W = tf.Variable(tf.zeros([784,10]))

# bias
with tf.name_scope("biases"):
    b = tf.Variable(tf.zeros([10]))

# implement model
with tf.name_scope("softmax"):
    y = tf.nn.softmax(tf.matmul(x,W) + b)

# specify cost function
with tf.name_scope('cross_entropy'):
    cross_entropy = tf.reduce_mean(-tf.reduce_sum(y_ * tf.log(y), reduction_indices=[1]))

# specify optimizer
with tf.name_scope('train'):
    train_step = tf.train.GradientDescentOptimizer(0.5).minimize(cross_entropy)
    
# variables need to be initialized before we can use them
sess.run(tf.initialize_all_variables())

# perform 1000 train steps
for i in range(1000):
  batch = mnist.train.next_batch(50)
  train_step.run(feed_dict={x: batch[0], y_: batch[1]})

with tf.name_scope('accuracy'):
    # compare prediction with truth
    with tf.name_scope('correct_prediction'):
        correct_prediction = tf.equal(tf.argmax(y,1), tf.argmax(y_,1))
    # calculate accuracy
    with tf.name_scope('accuracy'):
        accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))

# print accuracy
print(accuracy.eval(feed_dict={x: mnist.test.images, y_: mnist.test.labels}))

# summary
writer = tf.train.SummaryWriter("/tmp/tensorflow/", sess.graph)
```

I've had trouble reloading the graphs in tensorboard after rerunning my script in jupyter. To get a correct graph representation you should stop tensorboard and jupyter, delete your tensorflow logdir, restart jupyter, run the script, and restart tensorboard. After this our graph visualization should render correctly and be much cleaner.
![The graph visualization I got for the current example](/images/graph_example.png){: .center-image }



