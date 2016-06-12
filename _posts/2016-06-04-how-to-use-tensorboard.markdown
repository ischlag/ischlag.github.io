---
layout: post
title:  "How to use Tensorboard"
date:   2016-06-04
description: "Learn how to visualize your neural networks using Tensorboard."
---
### TL;DR;
A brief and concise tutorial on how to visualize different aspects such as the loss of your neural network using tensorboard.

### Context
We are going to work with a fully-connected neural network using the MNIST dataset. I'm going to use the network I have introduced in an earlier [post]({% post_url 2016-06-03-simple-neural-network-in-tensorflow %}). It achieves on the test-set an accuracy of ~90%. This is not bad but we have no clue what is actually going on or how our model looks like. In this post we will add the necessary commands to visualize the graph and some training values using tensorboard. If you haven't installed tensorflow yet look at this [post]({% post_url 2016-06-02-installing-tensorflow %}). You also want to have a look at the [official tensorflow documentation](https://www.tensorflow.org/versions/r0.8/api_docs/index.html).	

### Write a Log File and Run Tensorboard
Tensorflow summaries are essentially logs. And in order to write logs we need a log writer (or what it is called in tensorflow) a SummaryWriter. So for starters, we'll add the following line before our train loop.

```python
writer = tf.train.SummaryWriter(logs_path, graph=tf.get_default_graph())
```
This will create a log folder and save the graph structure. We can now start tensorboard.

```bash
tensorboard --logdir=run1:/tmp/tensorflow/ --port 6006
```

### Make Your Tensorflow Graph Readable
![A messy graph since we have not annotated anything.](/images/graph_mess.png){: .center-image }

You will notice that tensorboard is not able to find scalar values as we have not specifically logged any. You can, however, look at the tensorflow graph in the _Graph_ tab but the visualization of our not annotated graph looks messy. To clean up the visualization of our model in tensorboard we need to add the scope of our variables and a name for our placeholders and variables. So we add _with_ statements and name parameters like in the following example. You can find the complete code at the end of this article.

```python
# input images
with tf.name_scope('input'):
    # None -> batch size can be any size, 784 -> flattened mnist image
    x = tf.placeholder(tf.float32, shape=[None, 784], name="x-input") 
    # target 10 output classes
    y_ = tf.placeholder(tf.float32, shape=[None, 10], name="y-input")

```
I've had trouble reloading the graphs in tensorboard (tensorflow release 0.8.0) after rerunning my script in jupyter. To get a correct graph representation you should stop tensorboard and jupyter, delete your tensorflow logdir, restart jupyter, run the script, and then restart tensorboard. After those steps the graph visualization should render correctly. We are not logging any scalar values yet but as you see below our graph is now much cleaner and easier to read.
![The graph visualization I got for the current example](/images/graph_example.png){: .center-image }

### Log Dynamic Values
So far all our changes are only modifying how our graph looks in tensorboard. In this second part, we are now going to add summaries to log specific variables like the training error of our model. To log specific scalar values we need to create operations which we can then execute in our session. Such an operation can be created with the scalar_summary() function. You can find other summary operators [here](https://www.tensorflow.org/versions/r0.8/api_docs/python/train.html#summary-operations).

```python
# create a summary for our cost and accuracy
tf.scalar_summary("cost", cross_entropy)
tf.scalar_summary("accuracy", accuracy)
```
Instead of executing every summary operation individually we can merge them all together into a single merged summary operation. 

```python
summary_op = tf.merge_all_summaries()
```
We can then execute this operation together with our train operation inside our train cycle and write the values into our log file using the SummaryWriter object we created earlier.

```python
# perform the operations we defined earlier on batch
_, summary = sess.run([train_op, summary_op], feed_dict={x: batch_x, y_: batch_y})
            
# write log
writer.add_summary(summary, epoch * batch_count + i)
```
You can now start tensorboard and see a cost and accuracy graph in the _Events_ tab. I you want to display several runs in your graph you need to run your script several times and save the log files into seperate folders. You can then start tensorboard reading from several folders.

```bash
tensorboard --logdir=run1:/tmp/mnist/1,run2:/tmp/mnist/2 --port=6006
```
![A graph showing the cost progres for two different runs.](/images/cost_graph.png){: .center-image }

Here you have to complete code of this example.

```python
import tensorflow as tf

# reset everything to rerun in jupyter
tf.reset_default_graph()

# config
batch_size = 100
learning_rate = 0.5
training_epochs = 5
logs_path = "/tmp/mnist/2"

# load mnist data set
from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets('MNIST_data', one_hot=True)

# input images
with tf.name_scope('input'):
    # None -> batch size can be any size, 784 -> flattened mnist image
    x = tf.placeholder(tf.float32, shape=[None, 784], name="x-input") 
    # target 10 output classes
    y_ = tf.placeholder(tf.float32, shape=[None, 10], name="y-input")

# model parameters will change during training so we use tf.Variable
with tf.name_scope("weights"):
    W = tf.Variable(tf.zeros([784, 10]))

# bias
with tf.name_scope("biases"):
    b = tf.Variable(tf.zeros([10]))

# implement model
with tf.name_scope("softmax"):
    # y is our prediction
    y = tf.nn.softmax(tf.matmul(x,W) + b)

# specify cost function
with tf.name_scope('cross_entropy'):
    # this is our cost
    cross_entropy = tf.reduce_mean(-tf.reduce_sum(y_ * tf.log(y), reduction_indices=[1]))

# specify optimizer
with tf.name_scope('train'):
    # optimizer is an "operation" which we can execute in a session
    train_op = tf.train.GradientDescentOptimizer(learning_rate).minimize(cross_entropy)

with tf.name_scope('Accuracy'):
    # Accuracy
    correct_prediction = tf.equal(tf.argmax(y,1), tf.argmax(y_,1))
    accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
    
# create a summary for our cost and accuracy
tf.scalar_summary("cost", cross_entropy)
tf.scalar_summary("accuracy", accuracy)

# merge all summaries into a single "operation" which we can execute in a session 
summary_op = tf.merge_all_summaries()

with tf.Session() as sess:
    # variables need to be initialized before we can use them
    sess.run(tf.initialize_all_variables())

    # create log writer object
    writer = tf.train.SummaryWriter(logs_path, graph=tf.get_default_graph())
        
    # perform training cycles
    for epoch in range(training_epochs):
        
        # number of batches in one epoch
        batch_count = int(mnist.train.num_examples/batch_size)
        
        for i in range(batch_count):
            batch_x, batch_y = mnist.train.next_batch(batch_size)
            
            # perform the operations we defined earlier on batch
            _, summary = sess.run([train_op, summary_op], feed_dict={x: batch_x, y_: batch_y})
            
            # write log
            writer.add_summary(summary, epoch * batch_count + i)
            
        if epoch % 5 == 0: 
            print "Epoch: ", epoch 
    print "Accuracy: ", accuracy.eval(feed_dict={x: mnist.test.images, y_: mnist.test.labels})
    print "done"
```


