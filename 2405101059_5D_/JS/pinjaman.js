
const loanForm = document.getElementById("loanForm");
const loanTableBody = document.getElementById("loanTableBody");
const emptyMessage = document.getElementById("emptyMessage");
const historySearch = document.getElementById("historySearch");

const borrowDate = document.getElementById("borrowDate");
const returnDate = document.getElementById("returnDate");

// Mengambil data pinjaman dari localStorage
let loanData = JSON.parse(localStorage.getItem("loanData")) || [];

// Mengatur tanggal minimum
const today = new Date();
const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

borrowDate.min = todayString;
borrowDate.value = todayString;

returnDate.min = todayString;

// Tanggal pengembalian minimal sehari setelah peminjaman
borrowDate.addEventListener("change", function() {
    returnDate.min = borrowDate.value;

    if (returnDate.value && returnDate.value < borrowDate.value) {
        returnDate.value = borrowDate.value;
    }
});

// Menyimpan data pinjaman
function saveLoanData() {
    localStorage.setItem("loanData", JSON.stringify(loanData));
}

// Menampilkan tanggal
function formatDate(date) {
    if (!date) return "-";

    const parts = date.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// Menampilkan status
function getStatusClass(status) {
    if (status === "Disetujui") return "approved";
    if (status === "Ditolak") return "rejected";
    return "pending";
}

// Menampilkan riwayat peminjaman
function displayLoans() {
    const keyword = historySearch.value.toLowerCase().trim();

    const filteredData = loanData.filter(function(loan) {
        return (
            loan.name.toLowerCase().includes(keyword) ||
            loan.nim.toLowerCase().includes(keyword) ||
            loan.book.toLowerCase().includes(keyword)
        );
    });

    loanTableBody.innerHTML = "";

    filteredData.forEach(function(loan, index) {
        const row = document.createElement("tr");

        const values = [
            index + 1,
            loan.name,
            loan.nim,
            loan.book,
            formatDate(loan.borrowDate),
            formatDate(loan.returnDate)
        ];

        values.forEach(function(value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const statusCell = document.createElement("td");
        const statusBadge = document.createElement("span");

        statusBadge.className =
            "status " + getStatusClass(loan.status);

        statusBadge.textContent = loan.status;

        statusCell.appendChild(statusBadge);
        row.appendChild(statusCell);

        loanTableBody.appendChild(row);
    });

    emptyMessage.style.display =
        filteredData.length === 0 ? "block" : "none";
}

// Mengirim formulir peminjaman
loanForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("memberName").value.trim();
    const nim = document.getElementById("memberNim").value.trim();
    const book = document.getElementById("bookTitle").value;
    const borrow = borrowDate.value;
    const returnDay = returnDate.value;

    if (returnDay < borrow) {
        alert("Tanggal pengembalian tidak boleh sebelum tanggal peminjaman.");
        return;
    }

    const newLoan = {
        id: Date.now(),
        name: name,
        nim: nim,
        book: book,
        borrowDate: borrow,
        returnDate: returnDay,
        status: "Menunggu"
    };

    loanData.push(newLoan);

    saveLoanData();
    displayLoans();

    alert("Pengajuan peminjaman berhasil disimpan!");

    loanForm.reset();

    borrowDate.value = todayString;
    returnDate.value = "";
    returnDate.min = todayString;
});

// Pencarian riwayat
historySearch.addEventListener("input", displayLoans);

// Tahun otomatis
document.getElementById("currentYear").textContent =
    new Date().getFullYear();

// Menampilkan data saat halaman dibuka
displayLoans();
