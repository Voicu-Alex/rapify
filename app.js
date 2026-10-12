document.addEventListener("DOMContentLoaded", () => {
    
    const audio = document.getElementById("audio-player");
    const source = document.getElementById("audio-source");
    const playBtn = document.getElementById("play-pause");
    const timeline = document.getElementById("timeline");
    
    // Info Panels (Text)
    const titleEl = document.getElementById("current-title");
    const artistEl = document.getElementById("current-artist");
    


    const storedUser = localStorage.getItem("rapifyUser");
    
    if (storedUser) {
        
        const navUl = document.querySelector(".top-nav ul");
        const userLi = document.createElement("li");
        
        
        userLi.innerText = `Salut, ${storedUser.toUpperCase()}!`;
        userLi.style.color = "var(--accent)";
        userLi.style.fontWeight = "bold";
        userLi.style.marginLeft = "15px";
        userLi.style.display = "flex";
        userLi.style.alignItems = "center";
        
        navUl.appendChild(userLi);
    }

    
    const canvas = document.getElementById("visualizer");
    const ctx = canvas.getContext("2d");
    let audioContext, analyser, sourceNode;
    let isVisualizerInit = false;

    function initVisualizer() {
        if (isVisualizerInit) return;

        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256; 

        sourceNode = audioContext.createMediaElementSource(audio);
        sourceNode.connect(analyser);
        analyser.connect(audioContext.destination);

        isVisualizerInit = true;
        renderFrame();
    }

    // bare statice cat timp nu canta nimic
    function drawIdle() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        const bars = 90;
        const barWidth = canvas.width / bars - 2;
        ctx.fillStyle = "rgba(24, 255, 136, 0.25)";
        for (let i = 0; i < bars; i++) {
            const h = 6 + Math.abs(Math.sin(i * 0.35)) * 30;
            ctx.fillRect(i * (barWidth + 2), canvas.height / 2 - h / 2, barWidth, h);
        }
    }
    drawIdle();
    window.addEventListener("resize", () => { if (!isVisualizerInit) drawIdle(); });

    function renderFrame() {
        requestAnimationFrame(renderFrame); 

        // Adaptăm canvasul la dimensiunea containerului
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        // Luăm datele audio în timp real
        analyser.getByteFrequencyData(dataArray);

        // Curățăm canvasul
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // folosim doar frecventele joase/medii, unde e energia la rap
        const bars = Math.floor(bufferLength * 0.7);
        const barWidth = canvas.width / bars - 2;
        const mid = canvas.height / 2;

        for (let i = 0; i < bars; i++) {
            const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
            const x = i * (barWidth + 2);

            ctx.fillStyle = `rgba(24, 255, 136, ${0.25 + (dataArray[i] / 255) * 0.75})`;
            ctx.fillRect(x, mid - barHeight / 2, barWidth, barHeight);
        }
    }


    let favorites = JSON.parse(localStorage.getItem("rapifyFavorites")) || [];

    const trackItems = document.querySelectorAll(".track-item");

    Array.from(trackItems).forEach((item) => {
        
        const currentSongTitle = item.getAttribute("data-title");

        const likeBtn = document.createElement("span");
        likeBtn.style.fontSize = "1.2rem";
        likeBtn.style.marginLeft = "auto"; 
        likeBtn.style.cursor = "pointer";
        likeBtn.style.transition = "transform 0.2s ease";

        if (favorites.includes(currentSongTitle)) {
            likeBtn.innerHTML = " ♥";
            likeBtn.style.color = "#ff1850";
        } else {
            likeBtn.innerHTML = " ♡";
            likeBtn.style.color = "var(--text-muted)";
        }

        item.appendChild(likeBtn);

        likeBtn.addEventListener("click", (e) => {
            e.stopPropagation();

            likeBtn.style.transform = "scale(1.3)";
            setTimeout(() => likeBtn.style.transform = "scale(1)", 200);

            if (favorites.includes(currentSongTitle)) {
                // UNLIKE: Filter returnează un array nou fără elementul respectiv
                favorites = favorites.filter(song => song !== currentSongTitle);
                likeBtn.innerHTML = " ♡";
                likeBtn.style.color = "var(--text-muted)";
            } else {
                // LIKE: Push adaugă în array
                favorites.push(currentSongTitle);
                likeBtn.innerHTML = " ♥";
                likeBtn.style.color = "#ff1850";
            }

            localStorage.setItem("rapifyFavorites", JSON.stringify(favorites));
        });

        item.addEventListener("click", (e) => selectTrack(e.currentTarget, true));
    });

    // incarca piesa in player + panoul de info (autoplay doar la click)
    function selectTrack(target, autoplay) {

        const src = target.getAttribute("data-src");
        const title = target.getAttribute("data-title");
        const artist = target.getAttribute("data-artist");

        source.src = src;
        audio.load();

        if (autoplay) {
            if (!isVisualizerInit) {
                initVisualizer();
            }
            if (audioContext && audioContext.state === 'suspended') {
                audioContext.resume();
            }
            audio.play();
            playBtn.textContent = "⏸";
            playBtn.classList.add("playing");
        }

        titleEl.innerText = title;
        artistEl.innerText = artist;

        document.getElementById("info-title").innerText = target.getAttribute("data-info-title");
        
        const infoArtistText = target.getAttribute("data-info-artist");
        const yearMatch = infoArtistText.match(/\d{4}/);
        let timeAgoText = "";
        
        if(yearMatch) {
            const releaseYear = parseInt(yearMatch[0]);
            const currentYear = new Date().getFullYear();
            const diff = currentYear - releaseYear;
            timeAgoText = ` (${diff} ani)`;
        }

        document.getElementById("info-artist").innerText = infoArtistText + timeAgoText;
        document.getElementById("info-desc-1").innerText = target.getAttribute("data-info-1");
        document.getElementById("info-desc-2").innerText = target.getAttribute("data-info-2");
        document.getElementById("info-desc-3").innerText = target.getAttribute("data-info-3");

        
        if (!autoplay) return;

        const titleHeading = document.getElementById("info-title");
        let blinkCount = 0;
        const blinkInterval = setInterval(() => {
            // Operator ternar pentru schimbare culoare
            titleHeading.style.color = (blinkCount % 2 === 0) ? "white" : "var(--accent)";
            blinkCount++;
            if(blinkCount > 5) {
                clearInterval(blinkInterval);
                titleHeading.style.color = "var(--accent)"; // Reset
            }
        }, 200);
    }

    // fiecare pagina porneste cu prima piesa din lista ei
    if (trackItems.length > 0) {
        selectTrack(trackItems[0], false);
    }

    

    function togglePlay() {
        
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }
        if (!isVisualizerInit) {
            initVisualizer();
        }

        if (audio.paused) {
            audio.play();
            playBtn.textContent = "⏸";
        } else {
            audio.pause();
            playBtn.textContent = "►";
        }
    }

    playBtn.addEventListener("click", togglePlay);

    
    document.addEventListener("keydown", (e) => {
        if (e.code === "Space" && !["INPUT", "BUTTON"].includes(e.target.tagName)) {
            e.preventDefault(); // Să nu facă scroll pagina
            togglePlay();
        }
    });

    // Update bară progres
    audio.addEventListener("timeupdate", () => {
        if (!isNaN(audio.duration)) {
            const progress = (audio.currentTime / audio.duration) * 100;
            timeline.value = progress;
        }
    });

    // Seek (când tragi de bară)
    timeline.addEventListener("input", () => {
        if (!isNaN(audio.duration)) {
            const newTime = (timeline.value / 100) * audio.duration;
            audio.currentTime = newTime;
        }
    });

    
    const logo = document.querySelector(".top-logo");
    
    
    logo.addEventListener("click", () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        
        
        logo.style.color = `rgb(${r}, ${g}, ${b})`;
        logo.style.textShadow = `0 0 15px rgb(${r}, ${g}, ${b})`;
    });
});