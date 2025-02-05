from flask import Flask, render_template, request, jsonify, Response, stream_with_context
import requests
from io import BytesIO

app = Flask(__name__)

API_URL = "https://jiosaavn-api-privatecvc2.vercel.app/"

@app.route('/')
def home():
    songs = []
    
    return render_template('index.html', songs=[])

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    print(query)
    if not query:
        return render_template('index.html', songs=None)
    
    try:
        response = requests.get(f"{API_URL}/search/songs?query={query}")
        songs = response.json().get('data', [])
        songs = songs["results"]

    except Exception as e:
        print("Error fetching search results:", e)
        songs = []
    
    return render_template('index.html', songs=songs)

@app.route('/stream/')
def stream():
    url = request.args.get('url', '')
    if not url:
        return "No URL provided", 400

    headers = {
        'Range': request.headers.get('Range', '')
    }

    upstream_response = requests.get(url, headers=headers, stream=True)

    def generate():
        for chunk in upstream_response.iter_content(chunk_size=8192):
            if chunk:
                yield chunk

    response = Response(stream_with_context(generate()), status=upstream_response.status_code, content_type=upstream_response.headers.get('Content-Type'))
    response.headers['Content-Range'] = upstream_response.headers.get('Content-Range')
    response.headers['Accept-Ranges'] = 'bytes'
    response.headers['Content-Length'] = upstream_response.headers.get('Content-Length')
    return response

@app.route('/image/')
def image():
    url = request.args.get('url', '')
    if not url:
        return "No URL provided", 400

    upstream_response = requests.get(url, stream=True)

    def generate():
        for chunk in upstream_response.iter_content(chunk_size=8192):
            if chunk:
                yield chunk

    response = Response(stream_with_context(generate()), status=upstream_response.status_code, content_type=upstream_response.headers.get('Content-Type'))
    response.headers['Content-Length'] = upstream_response.headers.get('Content-Length')
    return response

@app.route('/download/')
def download():
    url = request.args.get('url', '')
    if not url:
        return "No URL provided", 400
    
    filename = request.args.get('filename', 'downloaded_song.mp3')
    response = requests.get(url, stream=True)
    
    return Response(
        response.iter_content(chunk_size=1024),
        headers={
            'Content-Disposition': f'attachment; filename={filename}.mp3',
            'Content-Type': 'audio/mpeg'
        }
    )

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
