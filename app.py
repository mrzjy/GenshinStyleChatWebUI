from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/paimon")
def paimon():
    return render_template("paimon.html")


@app.route("/hutao")
def hutao():
    return render_template("hutao.html")


@app.route("/zhongli")
def zhongli():
    return render_template("zhongli.html")


@app.route("/shogun")
def shogun():
    return render_template("shogun.html")


@app.route("/yae")
def yae():
    return render_template("yae.html")


@app.route("/static/<path:path>")
def send_static(path):
    return send_from_directory(os.path.join(app.root_path, "static"), path)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=12346)
