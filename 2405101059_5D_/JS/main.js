// =========================================
// PERPUSTAKAAN KITA - MAIN JAVASCRIPT
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    // ELEMENTS
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const searchTags = document.querySelectorAll(".search-tag");
    const bookCards = document.querySelectorAll(".book-card");
    const emptyMessage = document.getElementById("emptyMessage");

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    const bookModal = document.getElementById("bookModal");
    const modalClose = document.getElementById("modalClose");
    const modalOk = document.getElementById("modalOk");
    const modalBookTitle = document.getElementById("modalBookTitle");

    let activeCategory = "semua";


    // =========================================
    // 1. SEARCH AND CATEGORY FILTER
    // =========================================

    function filterBooks() {

        const keyword = searchInput.value
            .trim()
            .toLowerCase();

        let visibleCount = 0;

        bookCards.forEach(function (card) {

            const title = card.dataset.title.toLowerCase();
            const author = card.dataset.author.toLowerCase();
            const category = card.dataset.category.toLowerCase();

            const matchesKeyword =
                title.includes(keyword) ||
                author.includes(keyword) ||
                category.includes(keyword);

            const matchesCategory =
                activeCategory === "semua" ||
                category === activeCategory;

            const isVisible =
                matchesKeyword && matchesCategory;

            card.classList.toggle("hidden", !isVisible);

            if (isVisible) {
                visibleCount++;
            }

        });

        // Show a message if no books match
        emptyMessage.style.display =
            visibleCount === 0 ? "block" : "none";

    }


    // Search button
    searchButton.addEventListener("click", function () {
        filterBooks();
    });


    // Search while typing
    searchInput.addEventListener("input", function () {
        filterBooks();
    });


    // Search when pressing Enter
    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            filterBooks();
        }

    });


    // =========================================
    // 2. CATEGORY FILTER
    // =========================================

    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            // Update active category
            categoryButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            // Save selected category
            activeCategory = button.dataset.category;

            // Apply filter
            filterBooks();

        });

    });


    // =========================================
    // 3. POPULAR SEARCH TAGS
    // =========================================

    searchTags.forEach(function (tag) {

        tag.addEventListener("click", function () {

            const keyword = tag.dataset.search;

            searchInput.value = keyword;

            // Reset category to show matching books
            activeCategory = "semua";

            categoryButtons.forEach(function (button) {

                button.classList.toggle(
                    "active",
                    button.dataset.category === "semua"
                );

            });

            filterBooks();

            document.getElementById("koleksi")
                .scrollIntoView({ behavior: "smooth" });

        });

    });


    // =========================================
    // 4. MOBILE NAVIGATION
    // =========================================

    menuToggle.addEventListener("click", function () {

        const isOpen = navMenu.classList.toggle("open");

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    // Close mobile menu after clicking a link
    document.querySelectorAll(".nav-menu a").forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("open");

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });


    // =========================================
    // 5. BOOK DETAIL MODAL
    // =========================================

    const detailButtons = document.querySelectorAll(".detail-btn");

    function openModal(bookTitle) {

        modalBookTitle.textContent = bookTitle;

        bookModal.classList.add("show");

        bookModal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        modalClose.focus();

    }


    function closeModal() {

        bookModal.classList.remove("show");

        bookModal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

    }


    detailButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const bookTitle = button.dataset.book;

            openModal(bookTitle);

        });

    });


    modalClose.addEventListener("click", closeModal);

    modalOk.addEventListener("click", closeModal);


    // Close modal when clicking outside the content
    bookModal.addEventListener("click", function (event) {

        if (event.target === bookModal) {
            closeModal();
        }

    });


    // Close modal with Escape
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeModal();
        }

    });


    // =========================================
    // 6. DYNAMIC COPYRIGHT YEAR
    // =========================================

    document.getElementById("currentYear").textContent =
        new Date().getFullYear();


    // =========================================
    // 7. INITIALIZE
    // =========================================

    filterBooks();

});