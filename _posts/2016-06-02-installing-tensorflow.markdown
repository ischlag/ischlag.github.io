---
layout: post
title:  "How-to setup Tensorflow without Root"
date:   2016-06-01
description: "Learn how to setup Tensorflow on a remote linux machine without root access."
---
## TL;DR;
A brief and concise tutorial on installing Tensorflow and Jupyter on a remote linux machine which is hidden behind a university or company firewall.

## Context
Sometimes the machines we use to train our Machine Learning models are not in our cozy home and don't belong to us. In such a case it is also most likely that we don't have root privileges. But walking to the lab/office in order to monitor our training errors is not really an option is it?

This brief explanation will setup an ssh tunnel and install the newest tensorflow version using pip and show you how to work remotly on your lab machine. For more details on setting up tensorflow, as well as, more details go to the [official Tensorflow website.](https://www.tensorflow.org/versions/master/get_started/os_setup.html)

## Connect to the lab machine
Let's assume that our GPU equiped lab machine is running on an internal network of our university and is not accessible over the internet. However, we can access a public server from which we can then connect into our lab machine. 

Let's create an ssh config entry on our personal machine to make things easier: 

```bash
$ nano ~/.ssh/config
```

```bash
Host entry
	HostName public.host.universityX.edu
	Port 22
	User j117
```
Connect to the public server

```bash
$ ssh entry
```
And create another ssh configuration for our lab machine.

```bash
$ nano ~/.ssh/config
```

```bash
Host lab01
	HostName pc-01.lab.universityX.edu
	Port 22
	User j117
```
Connect to the lab machine

```bash
$ ssh lab01
```
Verify that this is the machine on which we want to install tensorflow.

```bash
$ uname -an
```
Use the following command to check what GPU is installed.

```bash
$ lspci -v | grep VGA
```
Btw. if you want to connect to the lab machine from now on use the following command to sve time

```bash
$ ssh -t entry ssh lab01
```

## Prerequisites
In order to use Tensorflow with GPU support the GPU needs to support NVidia Compute Capability >= 3.0. The easiest way to read somewhere online the specification of the GPU used. 

To run Tensorflow with GPU support the root user needs to install the Cuda Toolkit 7.5, which will be installed into ```/usr/local/cuda``` and cuDNN **v4**. Tensorflow doesn't support yet cudNN v5 (as of release 0.8.0).

Further requirements which need to be installed are python 2.7, pip, virtualenv, and swig. Though depending on the installation maybe further applications are needed. 

You need to add the following two lines to your ```~/.bash_profile```. Change the lines accordingly if the Cuda Toolkit has been installed in a different location. 

```bash
export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:/usr/local/cuda-7.5/lib64"
export CUDA_HOME=/usr/local/cuda-7.5/
```

## Install Tensorflow
We are going to install Tensorflow in a virtual python environment. Create a new virtual python environment in which we will install our python packages.

```bash
virtualenv --system-site-packages ~/tensorflow
source ~/tensorflow/bin/activate
```
Now install the following dependencies, as well as, the master release of Tensorflow for GPU, Linux 64Bit, and Python 2.7.

```bash
(tensorflow) $ pip install --upgrade python-numpy python-dev
(tensorflow) $ pip install --upgrade https://storage.googleapis.com/tensorflow/linux/gpu/tensorflow-0.8.0-cp27-none-linux_x86_64.whl
(tensorflow) $ pip install --upgrade jupyter
```
This will take a while. 

## Remote access 
Connect to the lab computer as before and run jupyter.

```bash
(tensorflow) $ jupyter notebook --no-browser --ip=* --port=8889
```
**Warning**: ip=* will allow anyone on the same network to access your python notebooks. You can read [here](http://jupyter-notebook.readthedocs.io/en/latest/public_server.html) how to secure your jupyter server. 

In order to access our notebooks we will create an SSH tunnel from our personal machine to the lab machine. Create a local SOCKS server to forward everything through an SSH tunnel over the public server.

```bash
$ ssh -C -D 1080 -N -t entry ssh lab01
```
We can no add 127.0.0.1:1080 as our SOCKS proxy in our browser. You should then be able to connect to the jupyter server using the hostname of your lab machine and the jupyter port 8889.

```bash
pc-01.lab.university.edu:8889
```

## Test Tensorflow
You should not only run the hello world example of Tensorflow but actually train a simple mnist model in order to make sure that your system is working correct and is using the GPU. Create a new notebook in jupyter and use the following code to train a simple model.

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

This should give you an accuracy of ~0.909. Make sure that you can see the console output of jupyter. It will show something similar to the following. 

```bash
Found device 0 with properties: 
name: GeForce GTX 960
major: 5 minor: 2 memoryClockRate (GHz) 1.253
pciBusID 0000:01:00.0
Total memory: 2.00GiB
Free memory: 1.77GiB
```
and 

```bash
Creating TensorFlow device (/gpu:0) -> (device: 0, name: GeForce GTX 960, pci bus id: 0000:01:00.0)
```
Tensorflow is working correctly if you see a similar log output and no errors. 

