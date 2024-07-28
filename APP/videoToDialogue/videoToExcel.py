import os
import random
import hashlib
import deepspeech
import wave
import numpy as np
from pydub import AudioSegment
from moviepy.editor import VideoFileClip
import requests
import logging
from tqdm import tqdm
import pandas as pd
from concurrent.futures import ThreadPoolExecutor, as_completed
import urllib.parse

# 设置日志配置
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')

# 百度翻译API参数
app_id = '20210918000948984'
secret_key = 'cG6DmcxorZrgfCvoacgY'

# 提取视频中的音频


def extract_audio_from_video(video_path):
    audio_path = video_path.rsplit('.', 1)[0] + '.wav'
    if not os.path.exists(audio_path):
        logging.info(f"正在从视频中提取音频: {video_path}")
        video = VideoFileClip(video_path)
        video.audio.write_audiofile(audio_path)
        logging.info(f"音频已提取并保存到: {audio_path}")
    else:
        logging.info(f"音频文件已存在：{audio_path}")
    return audio_path

# 转换音频采样率


def convert_samplerate(audio_path, desired_sample_rate=16000):
    logging.info(f"确保音频 {audio_path} 具有 {desired_sample_rate}Hz 采样率。")
    converted_path = audio_path.rsplit(
        '.', 1)[0] + f'_{desired_sample_rate}Hz.wav'
    if not os.path.exists(converted_path):
        logging.info(f"正在转换音频采样率: {audio_path}")
        audio = AudioSegment.from_file(audio_path)
        if audio.frame_rate != desired_sample_rate:
            audio = audio.set_frame_rate(desired_sample_rate)
            audio.export(converted_path, format="wav")
        else:
            audio.export(converted_path, format="wav")
    else:
        logging.info(f"已存在具有 {desired_sample_rate}Hz 采样率的音频：{converted_path}")
    return converted_path

# 音频降噪处理


def denoise_audio(audio_path):
    logging.info(f"正在处理音频降噪：{audio_path}")
    audio = AudioSegment.from_file(audio_path)
    non_silent = AudioSegment.silent(duration=10)
    segments = silent_split_criteria(
        audio, silence_thresh=-50, min_silence_len=1000)
    for segment in segments:
        if segment.dBFS > -50:
            non_silent += segment + AudioSegment.silent(duration=10)
    denoised_path = audio_path.rsplit('.', 1)[0] + '_denoised.wav'
    non_silent.export(denoised_path, format="wav")
    logging.info(f"音频降噪完成：{denoised_path}")
    return denoised_path

# 利用静音片段进行分段


def silent_split_criteria(audio_segment, silence_thresh=-50, min_silence_len=1000):
    segments = []
    for i in range(0, len(audio_segment), min_silence_len):
        segment = audio_segment[i:i + min_silence_len]
        if segment.dBFS > silence_thresh:
            segments.append(segment)
    return segments

# 转录音频


def transcribe_chunk(model, data_chunk):
    return model.stt(data_chunk)


def transcribe(audio_file, model_file_path, scorer_file_path, num_workers=4):
    logging.info(f"加载模型: {model_file_path}")
    model = deepspeech.Model(model_file_path)
    model.enableExternalScorer(scorer_file_path)

    logging.info(f"打开音频文件: {audio_file}")
    with wave.open(audio_file, 'r') as wf:
        frames = wf.getnframes()
        buffer = wf.readframes(frames)
        data16 = np.frombuffer(buffer, dtype=np.int16)

    chunk_size = 65536  # Increase chunk size to allow more context per chunk
    transcription = []

    logging.info("开始转录音频")
    with ThreadPoolExecutor(max_workers=num_workers) as executor:
        futures = []
        for i in tqdm(range(0, len(data16), chunk_size), desc="Transcribing"):
            chunk = data16[i:i + chunk_size]
            futures.append(executor.submit(transcribe_chunk, model, chunk))

        logging.info("等待所有转录任务完成")
        with tqdm(total=len(futures), desc="Processing Chunks") as pbar:
            for future in as_completed(futures):
                result = future.result().strip()
                if len(result) > 1:  # 忽略长度过短的片段
                    transcription.append(result)
                logging.info(f"转录片段结果: {result}")
                pbar.update(1)

    logging.info("转录完成")
    return transcription


def recognize_speech_from_audio(audio_path, model_path, scorer_path):
    audio_path = convert_samplerate(audio_path)
    audio_path = denoise_audio(audio_path)
    return transcribe(audio_path, model_path, scorer_path)

# 生成百度翻译API的签名


def generate_sign(query, app_id, salt, secret_key):
    sign_str = f"{app_id}{query}{salt}{secret_key}"
    sign = hashlib.md5(sign_str.encode('utf-8')).hexdigest()
    return sign

# 翻译句子


def translate_sentence_baidu(sentence, app_id, secret_key):
    url = 'http://api.fanyi.baidu.com/api/trans/vip/translate'
    salt = str(random.randint(32768, 65536))
    sign = generate_sign(sentence, app_id, salt, secret_key)
    params = {
        'q': urllib.parse.quote(sentence),  # 确保句子被正确编码
        'from': 'en',
        'to': 'zh',
        'appid': app_id,
        'salt': salt,
        'sign': sign
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        result = response.json()
        if 'trans_result' in result:
            logging.info(f"翻译结果: {result['trans_result'][0]['dst']}")
            return result['trans_result'][0]['dst']
        else:
            logging.error(f"翻译失败: {result}")
            return "翻译失败"
    except requests.exceptions.RequestException as e:
        logging.error(f"翻译请求错误：{e}")
        return "翻译失败"
    except (KeyError, IndexError) as e:
        logging.error(f"翻译响应解析错误: {e}")
        return "翻译失败"
    except ValueError as e:
        logging.error(f"JSON解析错误：{e}")
        return "翻译失败"


def process_video_baidu(video_path, model_path, scorer_path):
    audio_path = extract_audio_from_video(video_path)
    csv_path = video_path.rsplit('.', 1)[0] + '.csv'

    if os.path.exists(csv_path):
        logging.info(f"CSV文件已存在：{csv_path}，请删除后重试。")
        return

    # 识别语音
    logging.info("开始识别语音")
    transcriptions = recognize_speech_from_audio(
        audio_path, model_path, scorer_path)

    # 清理转录结果，忽略非常短的片段
    sentences = [transcription for transcription in transcriptions if len(
        transcription.split()) > 1]

    # 完成转录后添加日志
    logging.info(f"语音识别完成，句子数量：{len(sentences)}")

    logging.info("开始翻译句子")
    translations = []
    for sentence in tqdm(sentences, desc="翻译中"):
        translated = translate_sentence_baidu(sentence, app_id, secret_key)
        translations.append(translated)

    logging.info("翻译完成")

    # 存储到CSV
    logging.info("开始保存到CSV文件")
    data = {
        "序号": list(range(1, len(sentences) + 1)),
        "英文句子": sentences,
        "中文翻译": translations
    }
    df = pd.DataFrame(data)
    df.to_csv(csv_path, index=False, encoding='utf-8-sig')
    logging.info(f"CSV文件 '{csv_path}' 已成功保存")


if __name__ == "__main__":
    video_path = r"APP/videoToDialogue/跟我150天，保证你不看字幕听懂英文剧，第9天.mp4"
    model_path = r"APP/videoToDialogue/deepspeech-0.9.3-models.pbmm"
    scorer_path = r"APP/videoToDialogue/deepspeech-0.9.3-models.scorer"
    process_video_baidu(video_path, model_path, scorer_path)
