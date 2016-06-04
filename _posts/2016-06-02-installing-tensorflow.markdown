---
layout: post
title:  "How to Setup Tensorflow"
date:   2016-06-01
description: "Learn how to setup Tensorflow on a remote linux machine without root access."
---
### TL;DR;
A brief and concise tutorial on installing Tensorflow and Jupyter on a remote linux machine which is hidden behind a university or company firewall.

### Context
Sometimes the machines we use to train our Machine Learning models are not in our cozy home and don't belong to us. In such a case it is also most likely that we don't have root privileges. But walking to the lab/office in order to monitor our training errors is not really an option is it?

This brief explanation will setup an ssh tunnel and install the newest tensorflow version using pip and show you how to work remotly on your lab machine. For more details on setting up tensorflow, as well as, more details go to the [official Tensorflow website.](https://www.tensorflow.org/versions/master/get_started/os_setup.html)

### Connect to the Lab Machine
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
Btw. if you want to connect to the lab machine from now on use the following command to save time

```bash
$ ssh -t entry ssh lab01
```

### Prerequisites
In order to use Tensorflow with GPU support the GPU needs to support NVidia Compute Capability >= 3.0. The easiest way to read somewhere online the specification of the GPU used. 

To run Tensorflow with GPU support the root user needs to install the Cuda Toolkit 7.5 and cudNN **v4** which both should be installed into /usr/local/cuda. Tensorflow doesn't yet support cudNN v5 (as of release 0.8.0).

Further requirements which need to be installed are python 2.7, pip, virtualenv, and swig. Though depending on the installation maybe further applications are needed. 

You need to add the following two lines to your ~/.bash_profile. Change the lines accordingly if the Cuda Toolkit has been installed in a different location. 

```bash
export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:/usr/local/cuda-7.5/lib64"
export CUDA_HOME=/usr/local/cuda-7.5/
```

### Install Tensorflow
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

### Remote access 
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

### Test Tensorflow
You should not only run the hello world example of Tensorflow but actually train a simple mnist model in order to make sure that your system is working correct and is using the GPU. Create a new notebook in jupyter and use the following code to perform some operations on the GPU.

```python
import tensorflow as tf

x = tf.Variable(0, name='x')

with tf.Session() as sess:    
    sess.run(tf.initialize_all_variables())    
    for i in range(5):        
        x = x + 1
        print(sess.run(x))
```

This should print the numbers from 1 to 5. Make sure that you can see the console output of jupyter and that you see the GPU logs. It should look similar to the following. 

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

