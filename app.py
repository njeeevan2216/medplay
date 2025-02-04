from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

API_URL = "https://jiosaavn-api-privatecvc2.vercel.app/"

@app.route('/')
def home():
    try:
        response = requests.get(f"{API_URL}?id=1000")  # Example song ID
        songs = response.json().get('results', [])
        print(songs)
    except Exception as e:
        print("Error fetching songs:", e)
        songs = []
    
    return render_template('base.html', songs=[])

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    print(query)
    if not query:
        return render_template('base.html', songs=None)
    
    try:
        response = requests.get(f"{API_URL}/search/songs?query={query}")
        songs = response.json().get('data', [])
        songs = songs["results"]

    except Exception as e:
        print("Error fetching search results:", e)
        songs = []
    
    return render_template('base.html', songs=songs)

@app.route('/searchit', methods=['GET'])
def searchit():
    query = request.args.get('q', '')
    print(query)
    if not query:
        return render_template('base.html', songs=[])
    
    try:
        response = requests.get(f"{API_URL}/search?query={query}")
        songs = response.json().get('data', [])
        songs = songs["results"]

    except Exception as e:
        print("Error fetching search results:", e)
        songs = []
    
    return render_template('base.html', songs=songs)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
