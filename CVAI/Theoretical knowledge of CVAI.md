# Theoretical knowledge of CVAI

![1712813117250](image/CVAITheoryofKnowledge/1712813117250.png)

# explanation of nouns:

| nouns    | explanation                                    |
| -------- | ---------------------------------------------- |
| CVAI     | Computer Vision Artificial Intelligence        |
| NLP      | Natural language processing                    |
| LLM      | Large Lauguage Model                           |
| ML       | Machine Learning                               |
| DL       | Deepl Learning                                 |
| RL       | Reinforcement Learning                         |
| CNN      | Convolutional Neural Networks                  |
| **CONV** | Convolutional layer                            |
| **POOL** | Pooling layer                                  |
| AL       | Activation Layer                               |
| FC       | Fully Connected layer                          |
| CUDA     | Compute Unified Device Architecture（NVIDIA®） |
| CPU      | Central Processing Unit                        |
| GPU      | Graphics Processing Unit（NVIDIA®）            |
| APU      | Accelerated Processing Units（AMD®）           |
| TPU      | Tensor Processing Unit（Google®）              |
| NPU      | Neural network Processing Unit                 |
|          |                                                |

# AI field:

![1712813157576](image/CVAITheoryofKnowledge/1712813157576.png)

- **Machine Learning** : all disciplines that mine patterns in data through optimisation methods.(Supervised learning, unsupervised learning and reinforcement learning are three important topics in machine learning respectively.)
- **Deep Learning** : all machine learning algorithms that employ neural networks as a parameter structure for optimisation.
- **Reinforcement Learning** : machine learning algorithms that not only utilise existing data, but also acquire new data through exploration of the environment and use the new data to update and iterate existing models in a cyclical manner. Learning is about better exploration of the environment, and exploration is about acquiring data for better learning.
- **AI Triad** : Data + Computing Power + Algorithms
- **Machine Learning Highlights** : Data + Models + Algorithms
- **Main types of CV** : image classification, target localisation and recognition, semantic segmentation,etc.

  1. Image classification (including fine-grained feature classification): classify an image, is it an aeroplane? Car? Single dog? or what?
  2. Target localisation and recognition (e.g. neural networks such as yolo ssd): the location of the target object in the image (labelled by a box), the type of object in the box, and what it is.
  3. Semantic segmentation: e.g. in a CT photo, it is required to accurately cut out the stomach and lungs

- The most important algorithms for artificial intelligence are neural networks

# yolov5 structure:

![1712813224555](image/CVAITheoryofKnowledge/1712813224555.png)

- **Input:** Mosaic data enhancement, adaptive anchor frame calculation, adaptive image scaling
- **Backbone:** New CSP-Darknet53
- **Neck:** SPPF, New CSP-PAN
- **Head:** YOLOv5 Head
- **Prediction：** GIOU_Loss

# **CV-AI Resources:**

- [**Pytouch Docs**](https://pytorch.org/docs/stable/index.html "https://pytorch.org/docs/stable/index.html")
- [**OpenCV-Python(Video)**](https://www.bilibili.com/video/BV16K411W7x9?vd_source=0d0e1622a8f0252f0b3d7fbc911fe6e9 "https://www.bilibili.com/video/BV16K411W7x9?vd_source=0d0e1622a8f0252f0b3d7fbc911fe6e9")
- [d2l-ai/d2l-en](https://github.com/d2l-ai/d2l-en)
- [ultralytics/yolov5](https://github.com/ultralytics/yolov5)
