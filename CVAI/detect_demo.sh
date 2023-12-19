# 5 Steps to Visual Algorithm Target Detection Demo

docker pull ultralytics/yolov5:latest

docker run --ipc=host -it -v /data:/data --gpus all ultralytics/yolov5:latest

pip install -r requirements.txt

// train

python train.py --img 640 --batch 8 --epochs 5 --data coco128.yaml --weights yolov5s.pt

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