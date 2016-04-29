---
layout: post
title:  "Important ILSVRC Achievements from 2012-2016"
date:   2016-04-05
description: "A brief summary about the winning techniques used at the ILSVRC challenges since 2012."
---
The ImageNet [ILSVRC challenge](http://www.image-net.org/challenges/LSVRC/) consists of 1.2 million images associated with 1’000 categories. While some categories were quite different, others were very similar.

![A sample of two very similar looking dog species.](/images/ilsvrc_example.png){: .center-image }

In 2012, [AlexNet](https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf) developed by Alex Krizhevsky et al came along. It significantly outperformed all the prior competitors and won the challenge by reducing the top-5 error to 15.3%. The second place top-5 error rate, which was not a CNN variation, was around 26.2%. 

![A visualisation of the AlexNet structure from the paper linked above.](/images/alexnet.png){: .center-image }

The network had a very similar architecture as [LeNet](http://yann.lecun.com/exdb/publis/pdf/lecun-98.pdf) by Yann LeCun et al but was deeper, with more filters per layer, and with stacked convolutional layers. AlexNet was trained simultaneously on two Nvidia Geforce GTX 580 GPUs which is the reason for why their network is split into two pipelines. Apart from those differences the network is mostly the same as the smaller LeNet aside from it being bigger in almost every way. This success in particular, among others, resulted in a huge increase in popularity of CNNs but also NNs in general.

Not surprisingly, the ILSVRC 2013 winner was also a CNN which became known as [ZFNet](https://www.cs.nyu.edu/~fergus/papers/zeilerECCV2014.pdf). It achieved a top-5 error rate of 14.8% which is now already half of the prior mentioned non-neural error rate. It was mostly an achievement by tweaking the hyper-parameters of AlexNet while maintaining the same structure with additional Deep Learning elements as discussed earlier in this essay.

The winner of the ILSVRC 2014 competition was [GoogLeNet](http://arxiv.org/abs/1409.4842v1) from Google. It achieved a top-5 error rate of 6.67%! This was very close to human level performance which the organisers of the challenge were now forced to evaluate. As it turns out, this was actually rather hard to do and required some human training in order to beat GoogLeNets accuracy. After a few days of training, the human expert ([Andrej Karpathy](http://karpathy.github.io/2014/09/02/what-i-learned-from-competing-against-a-convnet-on-imagenet/)) was able to achieve a top-5 error rate of 5.1%. The network used a CNN inspired by LeNet but implemented a novel element which is dubbed an inception module. This module is based on several very small convolutions in order to drastically reduce the number of parameters. Their architecture consisted of a 22 layer deep CNN but reduced the number of parameters from 60 million (AlexNet) to 4 million. 

However, the runner-up at the ILSVRC 2014 competition is dubbed VGGNet by the community and was developed by [Simonyan and Zisserman](http://arxiv.org/abs/1409.1556). VGGNet consists of 16 convolutional layers and is very appealing because of its very uniform architecture. It only performs $$3x3$$ convolutions and $$2x2$$ pooling all the way through. It is currently the most preferred choice in the community for extracting features from images. The weight configuration of the VGGNet is publicly available and has been used in many other applications and challenges as a baseline feature extractor. However, VGGNet consists of 140 million parameters, which can be a bit challenging to handle.

At last, at the ILSVRC 2015 in December, the so-called [Residual Neural Network (ResNet)](http://arxiv.org/abs/1502.01852) by Kaiming He et al introduced a novel architecture with “skip connections” and features heavy batch normalization. Such skip connections are also known as gated units or gated recurrent units and have a strong similarity to recent successful elements applied in RNNs. Thanks to this technique they were able to train a NN with 152 layers while still having lower complexity than VGGNet. It achieves a top-5 error rate of 3.57% which beats human-level performance on this dataset. The residual learning framework is a very intriguing but not yet well understood by the community.

As Juergen Schmidhuber has recently [pointed out](http://people.idsia.ch/~juergen/microsoft-wins-imagenet-through-feedforward-LSTM-without-gates.html), the residual learning framework bears a strong resemblance with advancements in RNN, namely Long Short-Term Memory cells. However, as of 23 Feb 2016, there has been an [unofficial new record](http://arxiv.org/abs/1602.07261) on the 2015 ILSVRC challenge. The first network is based on the GoogLeNet inception architecture and is dubbed Inception-v4 and a second network is called Inception-ResNet-v2 which is incorporating the key elements of ResNet. Both networks achieve very similar results. While the first inception variation achieves 3.8% top-5 error the latter achieves a slightly better 3.8% top-5 error rate. Furthermore, an ensemble of 3 three Inception-ResNet-v2 and one Inception-v4 network can achieve an astonishing 3.08% top-5 error rate. 


