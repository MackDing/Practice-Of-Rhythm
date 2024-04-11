from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from collections import Counter
import string
import os
import docx
import pdfplumber


def get_script_path():
    return os.path.dirname(os.path.realpath(__file__))


def load_text(fname):
    text = ""
    _, ext = os.path.splitext(fname)
    if ext == ".txt":
        with open(fname, 'r', encoding='utf-8') as f:
            text = f.read()
    elif ext == ".pdf":
        with pdfplumber.open(fname) as pdf:
            for page in pdf.pages:
                single_page_text = page.extract_text()
                if single_page_text:
                    text += '\n' + single_page_text
    elif ext == ".docx":
        doc = docx.Document(fname)
        for paragraph in doc.paragraphs:
            text += '\n' + paragraph.text
    else:
        print(f"Unsupported file format: {ext}")
    return text


def word_count(text):
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))
    words = word_tokenize(text)
    words = [word for word in words if word not in stopwords.words('english')]
    # filter out any tokens not containing letters
    words = [word for word in words if word.isalpha()]
    word_counts = Counter(words)
    return word_counts


def main(input_files, output_file):
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    word_counts_total = Counter()
    for file in input_files:
        text = load_text(file)
        word_counts = word_count(text)
        word_counts_total += word_counts

    sorted_words = word_counts_total.most_common()

    with open(output_file, 'w', encoding='utf-8') as f:
        for word, count in sorted_words:
            f.write(f'{word}\n')


if __name__ == "__main__":
    main([r"D:\QIMA\Github\practice-of-Rhythm\Books\2020-Scrum-Guide-US.pdf"],
         "sorted_words.txt")

