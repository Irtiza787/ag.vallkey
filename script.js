// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
// You can also add other Firebase product imports here if needed in the future

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgYX1nwmQeOisH7q9ab2AAgRY92AV_JBs",
    authDomain: "ag-vallkey.firebaseapp.com",
    projectId: "ag-vallkey",
    storageBucket: "ag-vallkey.firebasestorage.app",
    messagingSenderId: "130855818425",
    appId: "1:130855818425:web:f3b79bf42852bde07bf768",
    measurementId: "G-9K8EQ92HC1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log("Firebase Initialized Successfully:", app.name);

// Sample Data from screenshot
const downlineData = [
    { srNo: 1, account: "arif0", badge: "CL", balance: "0.00", exposure: "0.00", avail: "0.00", limit: "1,000.00" },
    { srNo: 2, account: "ayon000", badge: "CL", balance: "0.85", exposure: "0.00", avail: "0.85", limit: "1,000.00" },
    { srNo: 3, account: "hakimm000", badge: "CL", balance: "0.00", exposure: "0.00", avail: "0.00", limit: "1,000.00" },
    { srNo: 4, account: "hasan009", badge: "CL", balance: "0.22", exposure: "0.00", avail: "0.22", limit: "1,000.00" },
    { srNo: 5, account: "ismailb000", badge: "CL", balance: "0.00", exposure: "0.00", avail: "0.00", limit: "1,000.00" },
    { srNo: 6, account: "j000", badge: "CL", balance: "0.00", exposure: "0.00", avail: "0.00", limit: "1,000.00" },
    { srNo: 7, account: "joy00000", badge: "CL", balance: "0.03", exposure: "0.00", avail: "0.03", limit: "1,000.00" },
    { srNo: 8, account: "khalek0012", badge: "CL", balance: "0.01", exposure: "0.00", avail: "0.01", limit: "1,000.00" },
];

function renderTableData() {
    const tbody = document.getElementById("downlineTableBody");
    tbody.innerHTML = "";

    downlineData.forEach((row, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${row.srNo}</td>
            <td>
                <span class="account-badge">${row.badge}</span>
                <span class="account-name">${row.account}</span>
            </td>
            <td></td>
            <td><a href="#" class="linkable"><span>0.00</span> <i class="fa-solid fa-pen" style="font-size: 10px;"></i></a></td>
            <td><a href="#" class="linkable">${row.balance}</a></td>
            <td><span class="val-box val-danger">${row.exposure}</span></td>
            <td>${row.avail}</td>
            <td>${row.limit}</td>
            <td>0</td>
            <td><div class="status-active">Active</div></td>
            <td>
                <div class="action-btns">
                    <button class="action-icon" title="Betting Profit Loss"><i class="fa-solid fa-arrow-down-up-across-line"></i></button>
                    <button class="action-icon" title="Betting History"><i class="fa-solid fa-list-ul"></i></button>
                    <button class="action-icon" title="Settings"><i class="fa-solid fa-gear"></i></button>
                    <button class="action-icon" title="Profile"><i class="fa-solid fa-user"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Modal Toggle Logic
const modal = document.getElementById("addUserModal");
const addBtn = document.getElementById("addUserBtn");
const closeBtn = document.getElementById("closeModalBtn");

addBtn.addEventListener("click", () => {
    modal.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});

// Navigation logic (Single Page App routing mimic)
const navItems = document.querySelectorAll(".nav-item");
const viewPanels = document.querySelectorAll(".view-panel");

navItems.forEach(item => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = item.getAttribute("data-target");
        if (!targetId) return;

        // Remove active class from all nav items and views
        navItems.forEach(nav => nav.classList.remove("active"));
        viewPanels.forEach(panel => panel.classList.remove("active"));

        // Add active class to clicked nav and target view
        item.classList.add("active");
        document.getElementById(targetId).classList.add("active");
    });
});

// Logout Logic
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("agent_auth"); // Clear session
        window.location.href = "login.html";
    });
}

// Auto Render Data
renderTableData();
