FROM python:3.9.0-alpine

RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --upgrade pip
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple mkdocs-material==9.4.1 mkdocs-glightbox

WORKDIR /app

COPY docs /app/build/docs
COPY overrides /app/build/overrides
COPY mkdocs.yml /app/mkdocs.yml

RUN mkdocs build

EXPOSE 8000

CMD ["mkdocs", "serve", "-a", "0.0.0.0:8000"]
