# Rapify

A Spotify-inspired web player for rap beats, built with **vanilla HTML, CSS and JavaScript** (no frameworks) as a project for the *Web Technologies* course, Faculty of Mathematics and Computer Science, University of Bucharest.

![Player](docs/player.png)

## Features

- **Audio player** with play/pause (button or <kbd>Space</kbd>), seekable timeline and per-track info panel
- **Real-time audio visualizer** built with the Web Audio API (`AnalyserNode`, FFT) and HTML5 Canvas
- **Playlists by mood** (Boom Bap, Dark, Chill) with a dropdown navigation menu
- **Ambient black-and-white city footage** per playlist, playing behind the visualizer
- **Login page** with regex-based username validation; the session and **favorites** are persisted in `localStorage`
- Responsive layout with CSS Grid and Flexbox

![Login](docs/login.png)

## Running locally

Serve the folder with any static server (the Web Audio visualizer needs `http://`, not `file://`):

```bash
python3 -m http.server 8000
# open http://localhost:8000/auth.html
```

## Structure

| File | Purpose |
| --- | --- |
| `auth.html`, `auth.css`, `auth.js` | Login page and validation |
| `index.html` | Home page with all tracks |
| `BoomBap.html`, `Dark.html`, `Chill.html` | Playlists |
| `audio/`, `video/` | Media files |
| `index.css` | Shared styles for the player pages |
| `app.js` | Player logic, visualizer, favorites |

## Music credits

All tracks by **Kevin MacLeod** ([incompetech.com](https://incompetech.com)), licensed under [Creative Commons: By Attribution 4.0](https://creativecommons.org/licenses/by/4.0/):
Griphop, Got Funk, Vicious, MTA, Lewis and Dekalb, Basic Implosion, Chillin Hard, Slow Jam, Galactic Rap.

## Video credits

From Wikimedia Commons, shown in grayscale:

| File | Source | Author | License |
| --- | --- | --- | --- |
| `video/brooklyn.webm` | [Bensonhurst 18th Avenue & 85th Street Brooklyn NY](https://commons.wikimedia.org/wiki/File:Bensonhurst_18th_Avenue_%26_85th_Street_Brooklyn_NY.webm) | GK tramrunner RU | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `video/subway.webm` | [NYC Subway train of R68 cars](https://commons.wikimedia.org/wiki/File:NYC_Subway_train_of_R68_cars.webm) | GK tramrunner RU | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `video/city-night.webm` | [City at night](https://commons.wikimedia.org/wiki/File:City_at_night.webm) | Editor (YouTube) | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
