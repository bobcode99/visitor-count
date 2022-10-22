FROM python:3.9.15-slim-bullseye

WORKDIR /app

ADD . /app

RUN pip install -r requirements.txt

CMD python main.py