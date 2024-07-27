import os
import requests
import deepspeech
import wave
import numpy as np
import pandas as pd
from pydub import AudioSegment
from moviepy.editor import VideoFileClip
from hashlib import md5
from tqdm import tqdm

# 百度翻译API参数⭐
app_id = '20210918000948984'
secret_key = 'cG6DmcxorZrgfCvoacgY'


def extract_audio_from_video(video_path):
    audio_path = video_path.rsplit('.', 1)[0] + '.wav'
    if not os.path.exists(audio_path):
        print(f"正在从视频中提取音频: {video_path}")
        video = VideoFileClip(video_path)
        video.audio.write_audiofile(audio_path)
        print(f"音频已提取并保存到: {audio_path}")
    else:
        print(f"音频文件已存在：{audio_path}")
    return audio_path


def convert_samplerate(audio_path, desired_sample_rate=16000):
    audio = AudioSegment.from_file(audio_path)
    audio = audio.set_frame_rate(desired_sample_rate)
    audio_path = "converted.wav"
    audio.export(audio_path, format="wav")
    return audio_path


def transcribe(audio_file, model_file_path, scorer_file_path):
    model = deepspeech.Model(model_file_path)
    model.enableExternalScorer(scorer_file_path)
    w = wave.open(audio_file, 'r')
    frames = w.getnframes()
    buffer = w.readframes(frames)
    data16 = np.frombuffer(buffer, dtype=np.int16)
    result = model.stt(data16)
    return result


def recognize_speech_from_audio(audio_path, model_path, scorer_path):
    audio_path = convert_samplerate(audio_path)
    return transcribe(audio_path, model_path, scorer_path)


def translate_sentence(sentence, app_id, secret_key):
    url = 'http://api.fanyi.baidu.com/api/trans/vip/translate'
    salt = str(random.randint(32768, 65536))
    sign = md5((app_id + sentence + salt +
               secret_key).encode('utf-8')).hexdigest()
    params = {
        'q': sentence,
        'from': 'en',
        'to': 'zh',
        'appid': app_id,
        'salt': salt,
        'sign': sign
    }
    response = requests.get(url, params=params)
    result = response.json()
    return result['trans_result'][0]['dst']


def process_video(video_path, model_path, scorer_path):
    # 文件名
    audio_path = extract_audio_from_video(video_path)
    csv_path = video_path.rsplit('.', 1)[0] + '.csv'

    if os.path.exists(csv_path):
        print(f"CSV文件已存在：{csv_path}，请删除后重试。")
        return

    # 识别语音
    sentences = recognize_speech_from_audio(
        audio_path, model_path, scorer_path).split("\n")
    translations = [translate_sentence(
        sentence, app_id, secret_key) for sentence in tqdm(sentences, desc="翻译中")]

    # 存储到CSV
    data = {
        "序号": list(range(1, len(sentences) + 1)),
        "英文句子": sentences,
        "中文翻译": translations
    }
    df = pd.DataFrame(data)
    df.to_csv(csv_path, index=False, encoding='utf-8-sig')
    print(f"CSV文件 '{csv_path}' 已成功保存")


if __name__ == "__main__":
    video_path = r"APP/videoToDialogue/哈利波特1：神秘的魔法石BD国英双语中英双字.mkv"
    model_path = r"APP/videoToDialogue/deepspeech-0.9.3-models.pbmm"
    scorer_path = r"APP/videoToDialogue/deepspeech-0.9.3-models.scorer"
    process_video(video_path, model_path, scorer_path)
