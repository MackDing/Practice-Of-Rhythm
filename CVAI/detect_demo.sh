# 5 Steps to Visual Algorithm Target Detection Demo

docker pull ultralytics/yolov5:latest

docker run --ipc=host -it -v /data:/data --gpus all ultralytics/yolov5:latest

docker run --ipc=host -it -v /mnt/d/data:/data ultralytics/yolov5:latest

pip install -r requirements.txt

// train

python train.py --img 640 --batch 8 --epochs 100 --data coco128.yaml --weights yolov5s.pt
## Epoch: 术语"epoch"在深度学习中指的是遍历完一次所有数据集的过程。从0开始。
## 
## GPU_mem: 显示了当前使用的GPU内存。
## 
## box_loss, obj_loss, cls_loss: 这三者分别代表方框损失，目标损失，类别损失。方框损失指的是物体边框识别的准确性，目标损失和类别损失表示模型对目标对象的识别准确性。这些损失值都是越小越好。
## 
## Instances: 指的是当前epoch中，训练样本的数量。
## 
## Size: 这里的大小指的是输入模型的图片尺寸。
## 
## Class, Images, Instances: 分别表示类别名，测试集的图片数量和实例数量。
## 
## P, R, mAP50, mAP50-95: 这些是目标检测任务常用的评价指标，分别是精确度（Precision），召回率（Recall），平均精确度（mAP）在IoU（交并比）为0.5以及0.5到0.95时的值，值越大越好。
// detect

python detect.py --weights runs/train/exp/weights/best.pt


// camera demo
python detect.py --source 0
python detect.py -i 0




'''
*   [yolov8](https://docs.ultralytics.com/)
*   [Anaconda Documentation](https://docs.anaconda.com/)
*   [Pytouch Docs](https://pytorch.org/docs/stable/index.html)
*   [Pytouch中文手册](https://pytorch.apachecn.org/1.7/02/)
*   [OpenCV-Python(Video)](https://www.bilibili.com/video/BV16K411W7x9?vd_source=0d0e1622a8f0252f0b3d7fbc911fe6e9)
*   [yolov5(Video)](https://github.com/zyds/yolov5-code)
'''