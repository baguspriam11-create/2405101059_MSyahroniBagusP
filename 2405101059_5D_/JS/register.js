```javascript
document.addEventListener("DOMContentLoaded", function () {

    const registerForm = document.getElementById("registerForm");

    const fullName = document.getElementById("fullName");
    const nim = document.getElementById("nim");
    const email = document.getElementById("email");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    const registerMessage = document.getElementById("registerMessage");

    // Tahun otomatis
    document.getElementById("currentYear").textContent =
        new Date().getFullYear();


    // Tampilkan atau sembunyikan kata sandi
    document.querySelectorAll(".password-toggle").forEach(function (button) {

        button.addEventListener("click", function () {

            const target = document.getElementById(
                button.dataset.target
            );

            const showPassword = target.type === "password";

            target.type = showPassword ? "text" : "password";

            button.innerHTML = showPassword
                ? '<i class="fa-regular fa-eye-slash"></i>'
                : '<i class="fa-regular fa-eye"></i>';

            button.setAttribute(
                "aria-label",
                showPassword
                    ? "Sembunyikan kata sandi"
                    : "Tampilkan kata sandi"
            );

        });

    });


    // Menampilkan pesan
    function showMessage(message, type) {

        registerMessage.textContent = message;

        registerMessage.className =
            "register-message show " + type;

    }


    // Proses pendaftaran demo
    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const nameValue = fullName.value.trim();
        const nimValue = nim.value.trim();
        const emailValue = email.value.trim().toLowerCase();
        const usernameValue = username.value.trim();
        const passwordValue = password.value;
        const confirmPasswordValue = confirmPassword.value;

        // Validasi nama
        if (nameValue.length < 3) {

            showMessage(
                "Nama lengkap minimal 3 karakter.",
                "error"
            );

            fullName.focus();
            return;

        }

        // Validasi NIM
        if (!nimValue) {

            showMessage(
                "NIM atau nomor anggota wajib diisi.",
                "error"
            );

            nim.focus();
            return;

        }

        // Validasi username
        if (!/^[A-Za-z0-9_]{4,30}$/.test(usernameValue)) {

            showMessage(
                "Nama pengguna harus 4–30 karakter dan hanya boleh berisi huruf, angka, atau garis bawah.",
                "error"
            );

            username.focus();
            return;

        }

        // Validasi panjang password
        if (passwordValue.length < 8) {

            showMessage(
                "Kata sandi harus minimal 8 karakter.",
                "error"
            );

            password.focus();
            return;

        }

        // Validasi konfirmasi password
        if (passwordValue !== confirmPasswordValue) {

            showMessage(
                "Konfirmasi kata sandi tidak cocok.",
                "error"
            );

            confirmPassword.focus();
            return;

        }

        // Periksa email secara sederhana
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {

            showMessage(
                "Masukkan alamat email yang valid.",
                "error"
            );

            email.focus();
            return;

        }


        // Ambil data anggota yang sudah tersimpan
        let members = [];

        try {

            members = JSON.parse(
                localStorage.getItem("perpustakaanMembers") || "[]"
            );

            if (!Array.isArray(members)) {
                members = [];
            }

        } catch (error) {

            showMessage(
                "Data anggota tidak dapat dibaca. Periksa penyimpanan browser.",
                "error"
            );

            return;

        }


        // Periksa username yang sudah terdaftar
        const usernameExists = members.some(function (member) {

            return member.username.toLowerCase() ===
                usernameValue.toLowerCase();

        });

        if (usernameExists) {

            showMessage(
                "Nama pengguna sudah digunakan. Silakan pilih nama lain.",
                "error"
            );

            username.focus();
            return;

        }


        // Periksa email yang sudah terdaftar
        const emailExists = members.some(function (member) {

            return member.email.toLowerCase() === emailValue;

        });

        if (emailExists) {

            showMessage(
                "Email sudah terdaftar. Silakan gunakan email lain.",
                "error"
            );

            email.focus();
            return;

        }


        // Simpan data anggota untuk simulasi tugas
        // Jangan gunakan penyimpanan password plaintext
        // untuk aplikasi yang benar-benar digunakan.
        const newMember = {
            name: nameValue,
            nim: nimValue,
            email: emailValue,
            username: usernameValue,
            createdAt: new Date().toISOString()
        };


        try {

            members.push(newMember);

            localStorage.setItem(
                "perpustakaanMembers",
                JSON.stringify(members)
            );

            // Simpan password demo secara terpisah hanya untuk
            // simulasi lokal. Ini tidak aman untuk penggunaan nyata.
            const demoAccounts = JSON.parse(
                localStorage.getItem("perpustakaanDemoAccounts") || "{}"
            );

            demoAccounts[usernameValue] = {
                password: passwordValue
            };

            localStorage.setItem(
                "perpustakaanDemoAccounts",
                JSON.stringify(demoAccounts)
            );

            showMessage(
                "Pendaftaran berhasil! Mengalihkan ke halaman login...",
                "success"
            );

            registerForm.querySelector(
                'button[type="submit"]'
            ).disabled = true;

            setTimeout(function () {

                window.location.href = "login.html";

            }, 1500);

        } catch (error) {

            showMessage(
                "Pendaftaran gagal disimpan. Periksa pengaturan penyimpanan browser.",
                "error"
            );

        }

    });

});
```