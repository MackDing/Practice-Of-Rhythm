# 需求：将英文视频中人物的台词转换成txt格式的单词的词汇表？（输入端：需要考虑同时适用于单个或者多个视频文件。输出端：词汇表中，每行展示一个单词，按照词频从高到低进行排序）。用Python实现
from moviepy.editor import VideoFileClip
import speech_recognition as sr
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string
from collections import Counter
import os

# file_path = r"C:\Users\Mack Ding\Downloads\UdemyJJ.mp4"
# print(os.path.exists(file_path))

# 提取音频


def video_to_audio(video_file):
    video = VideoFileClip(video_file)
    audio_file = f"{video_file.split('.')[0]}.wav"
    video.audio.write_audiofile(audio_file)
    return audio_file

# 音频转文字


def audio_to_text(audio_file):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_file) as source:
        audio_data = recognizer.record(source)
        text = recognizer.recognize_google(audio_data)
    return text

# 文字处理并创建单词列表


def create_word_list(text):
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))  # 删除标点符号
    words = word_tokenize(text)  # 分词
    words = [word for word in words if word not in stopwords.words(
        'english')]  # 去除停用词
    word_counts = Counter(words)  # 计数
    word_list = [item[0] for item in word_counts.most_common()]  # 排序并创建单词列表
    return word_list

# 保存为txt


def output_to_txt(word_list, output_file):
    with open(output_file, 'w') as f:
        for word in word_list:
            f.write(word + '\n')

# 定义主程序


def main(videos, output_file):
    text = ""
    for video_file in videos:
        audio_file = video_to_audio(video_file)
        text += audio_to_text(audio_file)
    word_list = create_word_list(text)
    output_to_txt(word_list, output_file)


if __name__ == "__main__":
 #   videos = ['my_video1.mp4', 'my_video2.mp4', 'my_video3.mp4']  # 输入你的视频文件路径
    videos = [r'C:\Users\Mack Ding\Downloads\UdemyJJ.mp4']  # 输入你的视频文件路径
    output_file = "./Glossary.txt"  # 输出的txt文件路径
    main(videos, output_file)
