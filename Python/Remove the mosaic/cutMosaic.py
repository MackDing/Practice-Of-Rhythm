import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage.filters import unsharp_mask

# 读取图片
image_path = 'Python/Remove the mosaic/WeixinImage_20240701103524.jpg'
image = cv2.imread(image_path)
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # OpenCV使用BGR格式

# 将图像放大，以便更好地处理马赛克
scale_factor = 10
height, width, _ = image.shape
image = cv2.resize(image, (width * scale_factor, height * scale_factor), interpolation=cv2.INTER_LINEAR)

# 对图像应用高斯模糊
blurred_image = cv2.GaussianBlur(image, (5, 5), 0)

# 应用反锐化掩模（Unsharp Mask）
sharp_image = unsharp_mask(blurred_image, radius=2, amount=2)
sharp_image = np.clip(sharp_image, 0, 1)
sharp_image = (255 * sharp_image).astype(np.uint8)

# 显示原始图像和处理后的图像
fig, axes = plt.subplots(1, 2, figsize=(12, 6), sharex=True, sharey=True)
ax = axes.ravel()

ax[0].imshow(image)
ax[0].set_title("Mosaic Image")

ax[1].imshow(sharp_image)
ax[1].set_title("Restored Image")

plt.show()