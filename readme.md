# Medplay

Medplay is an ad-free modern music player built with Flask and JavaScript. It allows users to search for songs, play them, and download them with metadata.

## Features

- Search for songs using the JioSaavn API
- Play and pause songs
- Display song details including album art, song name, and artist name
- Download songs with metadata
- Responsive design

## Technologies Used

- **HTML/CSS**: For structuring and styling the web application.
- **JavaScript**: For adding interactivity and functionality.
- **Font Awesome**: For using icons in the application.
- **Django**: For serving static files and templates.

## Project Structure

```
medplay/
├── static/
│   ├── css/
│   │   ├── searchBarStyle.css
│   │   ├── cards.css
│   │   └── playerContainer.css
│   ├── img/
│   │   ├── M.png
│   │   └── plc.png
│   └── js/
│       ├── main.js
│       └── searchBarAnimation.js
├── templates/
│   └── index.html
├── app.mpy
├── requirements.txt
├── vercel.json
└── readme.md
```



## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/njeeevan2216/medplay.git
    cd medplay
    ```

2. Create a virtual environment and activate it:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the dependencies:
    ```sh
    pip install -r requirements.txt
    ```

## Running the Application

1. Start the Flask application:
    ```sh
    python app.py
    ```

2. Open your web browser and navigate to `http://localhost:5000`.

## Deployment

This project is configured to be deployed on Vercel. The configuration is specified in the [vercel.json](http://_vscodecontentref_/9) file.

## Usage

- Enter a song name in the search bar and press Enter or click the search icon.
- Click on the play button to play a song.
- Click on the download button to download a song with metadata.

## License

This project is licensed under the MIT License.
