from flask import Flask
from redis import Redis

app = Flask(__name__)
redis = Redis(host= "redis", port=6379, charset="utf-8", decode_responses=True)

@app.route("/")
def hello_world():
    redis.incr('hits')
    return 'You are the %s visitors!' % redis.get('hits')

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8888)