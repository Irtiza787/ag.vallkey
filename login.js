document.addEventListener("DOMContentLoaded", () => {
    // Redirect if already logged in loosely via session token
    if (localStorage.getItem("agent_auth") === "true") {
        window.location.href = "index.html";
    }

    const captchaBox = document.getElementById("captchaBox");
    const validateCode = document.getElementById("validateCode");
    const loginForm = document.getElementById("loginForm");
    const errorMsg = document.getElementById("errorMsg");

    // Generate random 4 digit captcha logic per original site
    function generateCaptcha() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    let currentCaptcha = generateCaptcha();
    captchaBox.textContent = currentCaptcha;

    // Refresh captcha
    validateCode.addEventListener("focus", () => {
        if (!validateCode.value) {
            currentCaptcha = generateCaptcha();
            captchaBox.textContent = currentCaptcha;
        }
    });

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = document.getElementById("username").value.trim();
        const pass = document.getElementById("password").value;
        const vcode = validateCode.value.trim();

        if (vcode !== currentCaptcha) {
            errorMsg.textContent = "Invalid validation code.";
            currentCaptcha = generateCaptcha();
            captchaBox.textContent = currentCaptcha;
            validateCode.value = "";
            return;
        }

        // Validate user credentials exactly as specified by user
        if (user === "Mdshaker" && pass === "abcd1234") {
            // Log successful auth state
            localStorage.setItem("agent_auth", "true");
            localStorage.setItem("agent_user", user);
            window.location.href = "index.html";
        } else {
            errorMsg.textContent = "Invalid username or password.";
            currentCaptcha = generateCaptcha();
            captchaBox.textContent = currentCaptcha;
            validateCode.value = "";
            document.getElementById("password").value = "";
        }
    });
});
