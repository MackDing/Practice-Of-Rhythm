import os
import sys
import csv
import subprocess


def generate_subtitles(source_path):
    output_srt = source_path.rsplit('.', 1)[0] + '.srt'
    output_csv = source_path.rsplit('.', 1)[0] + '.csv'

    # 检查CSV文件是否已经存在
    if os.path.exists(output_csv):
        print("CSV文件已经生成，请删除后重试。")
        return

    # 调用命令行工具autosub生成字幕文件并翻译
    command = f"autosub '{source_path}' -S en -D zh-cn -o '{output_srt}'"
    subprocess.run(command, shell=True, check=True)

    # 读取生成的srt文件并写入csv文件
    with open(output_srt, 'r', encoding='utf-8') as srt_file, open(output_csv, 'w', newline='', encoding='utf-8') as csv_file:
        csv_writer = csv.writer(csv_file)
        csv_writer.writerow(["序号", "英文句子", "中文翻译"])

        lines = srt_file.read().split('\n\n')
        for i, section in enumerate(lines):
            if section.strip():  # 忽略空行
                try:
                    parts = section.split('\n')
                    if len(parts) < 3:
                        continue
                    text = ' '.join(parts[2:])  # 可能在换行处匹配文本
                    csv_writer.writerow(
                        [i + 1, text, parts[-1]])  # 最后一行为翻译后的中文
                except Exception as e:
                    print(f"处理第{i+1}段字幕时出错: {e}")

    print("CSV文件已生成:", output_csv)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("用法: python generate_subtitles.py <视频文件路径>")
        sys.exit(1)

    video_path = sys.argv[1]
    generate_subtitles(video_path)
