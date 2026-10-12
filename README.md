# Rapify

A Spotify-inspired web player for '80s–'90s hip-hop classics, built with **vanilla HTML, CSS and JavaScript** (no frameworks) as a project for the *Web Technologies* course, Faculty of Mathematics and Computer Science, University of Bucharest.

![Player](docs/player.png)

## Features

- **Audio player** with play/pause (button or <kbd>Space</kbd>), seekable timeline and per-track info panel
- **Real-time audio visualizer** built with the Web Audio API (`AnalyserNode`, FFT) and HTML5 Canvas
- **Music video sync**: the track's video plays alongside the audio and is re-synced when they drift apart
- **Per-artist playlists** (Big L, 2Pac, Ice Cube) with a dropdown navigation menu
- **Login page** with regex-based username validation; the session and **favorites** are persisted in `localStorage`
- Responsive layout with CSS Grid and Flexbox

![Login](docs/login.png)

## Running locally

The audio and video files are **not included** in this repository (copyright and file size).
To run the app, add your own files using the paths referenced in the HTML (`Muzica/*.mp3`, `Video/*.mp4`, `My Movie.mp4`), then serve the folder:

```bash
python3 -m http.server 8000
# open http://localhost:8000/auth.html
```

## Structure

| File | Purpose |
| --- | --- |
| `auth.html`, `auth.css`, `auth.js` | Login page and validation |
| `index.html` | Home page with all tracks |
| `BigL.html`, `2Pac.html`, `IceCube.html` | Artist playlists |
| `index.css` | Shared styles for the player pages |
| `app.js` | Player logic, visualizer, favorites |

*Educational project. All songs and music videos belong to their respective rights holders.*
