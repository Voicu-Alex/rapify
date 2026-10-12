document.addEventListener("DOMContentLoaded", () => {
    
    const loginForm = document.querySelector(".login-tag form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const musicBtn = document.querySelector(".music-trigger");
    const bgAudio = document.getElementById("bg-audio");

    
    if(musicBtn && bgAudio) {
        musicBtn.addEventListener("click", (e) => {
            e.preventDefault(); 
            if (bgAudio.paused) {
                bgAudio.volume = 0.5; 
                bgAudio.play();
                musicBtn.textContent = "Pause Music";
                musicBtn.style.background = "#fff"; 
            } else {
                bgAudio.pause();
                musicBtn.textContent = "Play Music";
                musicBtn.style.background = "var(--accent)";
            }
        });
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); 

        const userVal = usernameInput.value.trim();
        const passVal = passwordInput.value.trim();

        const userRegex = /^[a-zA-Z0-9_]{3,15}$/;

        [usernameInput, passwordInput].forEach(input => {
            input.style.borderColor = "rgba(255, 255, 255, 0.2)";
        });

        if (!userRegex.test(userVal)) {
            usernameInput.style.borderColor = "red";
            
            const errorMsg = document.createElement("div");
            errorMsg.innerText = "Nume invalid! Folosește 3-15 caractere (litere, cifre, _).";
            errorMsg.style.color = "red";
            errorMsg.style.fontSize = "0.8rem";
            errorMsg.style.marginTop = "5px";
            errorMsg.id = "temp-error";

            if(!document.getElementById("temp-error")) {
                usernameInput.after(errorMsg); // Manipulare DOM
            }

            setTimeout(() => {
                if(document.getElementById("temp-error")) {
                    document.getElementById("temp-error").remove();
                }
            }, 3000);

            return; 
        }

        localStorage.setItem("rapifyUser", userVal);
        localStorage.setItem("rapifyLoginTime", new Date().toISOString()); // Folosire clasa Date

        window.location.href = "index.html";
    });

    usernameInput.addEventListener("focus", (e) => {
        e.target.style.borderColor = "var(--accent)";
    });

    usernameInput.addEventListener("blur", (e) => {
        e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
    });
});