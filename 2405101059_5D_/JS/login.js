
document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const togglePassword = document.getElementById("togglePassword");
    const demoButton = document.getElementById("demoButton");

    const loginMessage = document.getElementById("loginMessage");
    const forgotPassword = document.getElementById("forgotPassword");
    const currentYear = document.getElementById("currentYear");

    // Tahun otomatis
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Menampilkan pesan
    function showMessage(message, type) {
        loginMessage.textContent = message;
        loginMessage.className = "login-message show " + type;
    }

    // Tombol tampil/sembunyikan password
    if (togglePassword) {
        togglePassword.addEventListener("click", function () {

            const isPassword = passwordInput.type === "password";

            passwordInput.type = isPassword ? "text" : "password";

            togglePassword.innerHTML = isPassword
                ? '<i class="fa-regular fa-eye-slash"></i>'
                : '<i class="fa-regular fa-eye"></i>';

        });
    }

    // TOMBOL ISI AKUN DEMO
    if (demoButton) {
        demoButton.addEventListener("click", function () {

            usernameInput.value = "siswa";
            passwordInput.value = "1234";

            // Bersihkan pesan sebelumnya
            loginMessage.className = "login-message";
            loginMessage.textContent = "";

            // Beri tanda bahwa akun berhasil diisi
            showMessage(
                "Akun demo berhasil diisi. Silakan klik Masuk Sekarang.",
                "success"
            );

        });
    }

    // Lupa password
    if (forgotPassword) {
        forgotPassword.addEventListener("click", function (event) {
            event.preventDefault();

            showMessage(
                "Fitur pemulihan kata sandi belum tersedia.",
                "error"
            );
        });
    }

    // Proses login
    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (username === "" || password === "") {
            showMessage(
                "Nama pengguna dan kata sandi wajib diisi.",
                "error"
            );
            return;
        }

        // Login akun demo
        if (username === "siswa" && password === "1234") {

            showMessage(
                "Login berhasil! Mengalihkan ke Beranda...",
                "success"
            );

            sessionStorage.setItem("perpustakaanDemoLogin", "true");
            sessionStorage.setItem("perpustakaanUsername", username);

            setTimeout(function () {
                window.location.href = "../Beranda/Beranda.html";
            }, 1000);

        } else {

            showMessage(
                "Username atau password salah. Gunakan siswa dan 1234 untuk akun demo.",
                "error"
            );

        }

    });

});
