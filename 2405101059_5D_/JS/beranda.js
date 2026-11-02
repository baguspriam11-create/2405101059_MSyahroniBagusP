```javascript
document.addEventListener("DOMContentLoaded", function () {

    // Tahun otomatis
    document.getElementById("currentYear").textContent =
        new Date().getFullYear();


    // Menu navigasi untuk HP
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    // Tutup menu setelah memilih navigasi
    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("open");

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });


    // Informasi nama pengguna dari simulasi login
    const username = sessionStorage.getItem(
        "perpustakaanUsername"
    );

    const userNameElement = document.getElementById("userName");

    if (username) {
        userNameElement.textContent = "Halo, " + username;
    }


    // Tombol keluar
    document.getElementById("logoutButton").addEventListener(
        "click",
        function () {

            const confirmLogout = confirm(
                "Apakah kamu yakin ingin keluar?"
            );

            if (!confirmLogout) {
                return;
            }

            sessionStorage.removeItem("perpustakaanDemoLogin");
            sessionStorage.removeItem("perpustakaanUsername");

            window.location.href = "login.html";

        }
    );


    // Pencarian buku
    const searchInput = document.getElementById("bookSearch");
    const searchButton = document.getElementById("searchButton");

    const bookCards = document.querySelectorAll(".book-card");
    const emptyMessage = document.getElementById("emptyMessage");

    function searchBooks() {

        const keyword = searchInput.value
            .trim()
            .toLowerCase();

        let visibleCount = 0;

        bookCards.forEach(function (book) {

            const title = book.dataset.title || "";
            const author = book.dataset.author || "";

            const matches =
                title.includes(keyword) ||
                author.includes(keyword);

            book.style.display = matches ? "" : "none";

            if (matches) {
                visibleCount++;
            }

        });

        emptyMessage.style.display =
            visibleCount === 0 ? "block" : "none";

    }


    searchButton.addEventListener("click", searchBooks);

    searchInput.addEventListener("input", searchBooks);

    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            searchBooks();
        }

    });

});
```