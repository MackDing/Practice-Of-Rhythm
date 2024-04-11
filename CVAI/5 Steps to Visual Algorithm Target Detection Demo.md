# 5 Steps to Visual Algorithm Target Detection Demo

![1712812960343](image/5StepstoVisualAlgorithmTargetDetectionDemo/1712812960343.png)

```shell
# env docker(Python+PyTorch+CUDA+YoLov5)
Step1:
docker pull ultralytics/yolov5:latest

Step2:
docker run --ipc=host -it -v /Users/ding/Documents/data:/data ultralytics/yolov5:latest

Step3:
pip install -r requirements.txt

Step4:
# train
python train.py --img 640 --batch 4 --epochs 5 --data coco128.yaml --weights yolov5s.pt

Step5:
# detect
python detect.py --weights runs/train/exp/weights/best.pt --source /usr/src/app/data/images/

```
