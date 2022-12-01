import webbrowser

from flask import Flask
app = Flask(__name__)

@app.route("/conne")
def hello():
    webbrowser.open_new('http://127.0.0.1:8000/')

if __name__ == "__main__":
    webbrowser.open_new('http://127.0.0.1:8000/')
    app.run(port=8000)
