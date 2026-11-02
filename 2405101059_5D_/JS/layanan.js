
// Mengatur tahun otomatis pada footer
const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Efek animasi saat halaman digulir
const serviceCards = document.querySelectorAll(".service-card");

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

serviceCards.forEach(function(card) {
    observer.observe(card);
});
