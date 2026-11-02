
const searchInput = document.getElementById("bookSearch");
const bookCards = document.querySelectorAll(".book-card");
const emptyMessage = document.getElementById("emptyMessage");

let selectedCategory = "Semua";

// Fungsi pencarian dan filter buku
function filterBooks() {
    const keyword = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    bookCards.forEach(function(card) {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const author = card.querySelector(".book-info p").textContent.toLowerCase();
        const category = card.dataset.category;

        const matchKeyword =
            title.includes(keyword) || author.includes(keyword);

        const matchCategory =
            selectedCategory === "Semua" ||
            category === selectedCategory;

        if (matchKeyword && matchCategory) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    emptyMessage.style.display =
        visibleCount === 0 ? "block" : "none";
}

// Fungsi filter kategori
function filterCategory(category, button) {
    selectedCategory = category;

    document.querySelectorAll(".filter button").forEach(function(btn) {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    filterBooks();
}

// Pencarian langsung ketika mengetik
searchInput.addEventListener("input", filterBooks);

// Membaca kategori dari URL Beranda
const params = new URLSearchParams(window.location.search);
const categoryFromURL = params.get("kategori");

if (categoryFromURL) {
    const categoryMap = {
        teknologi: "Teknologi",
        pendidikan: "Pendidikan",
        novel: "Novel",
        bisnis: "Bisnis"
    };

    const selected = categoryMap[categoryFromURL.toLowerCase()];

    if (selected) {
        const buttons = document.querySelectorAll(".filter button");

        buttons.forEach(function(button) {
            if (button.textContent.trim() === selected) {
                filterCategory(selected, button);
            }
        });
    }
}

// Tahun otomatis
document.getElementById("currentYear").textContent =
    new Date().getFullYear();
