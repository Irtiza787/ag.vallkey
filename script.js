// script.js - Agent Dashboard
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, onValue, get, update } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

// Firebase configuration (Admin প্যানেলের সাথে হুবহু মিল থাকতে হবে)
const firebaseConfig = {
    apiKey: "AIzaSyCgYX1nwmQeOisH7q9ab2AAgRY92AV_JBs",
    authDomain: "ag-vallkey.firebaseapp.com",
    databaseURL: "https://ag-vallkey-default-rtdb.firebaseio.com/",
    projectId: "ag-vallkey",
    storageBucket: "ag-vallkey.appspot.com",
    messagingSenderId: "130855818425",
    appId: "1:130855818425:web:f3b79bf42852bde07bf768",
    measurementId: "G-9K8EQ92HC1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById("downlineTableBody");

    // --- Real-time Data Sync from Firebase ---
    // অ্যাডমিন প্যানেলের 'users' পাথ থেকে ডেটা রিড করা হচ্ছে
    onValue(ref(db, 'users/'), (snapshot) => {
        if (!tbody) return;
        tbody.innerHTML = "";
        let srNo = 1;

        snapshot.forEach((childSnapshot) => {
            const row = childSnapshot.val();
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${srNo++}</td>
                <td>
                    <span class="account-badge">${row.role === 'player' ? 'CL' : 'AG'}</span>
                    <span class="account-name"><strong>${row.username}</strong></span>
                </td>
                <td></td>
                <td><a href="#" class="linkable"><span>0.00</span> <i class="fa-solid fa-pen" style="font-size: 10px;"></i></a></td>
                <td><a href="#" class="linkable">${parseFloat(row.points || 0).toFixed(2)}</a></td>
                <td><span class="val-box val-danger">0.00</span></td>
                <td>${parseFloat(row.points || 0).toFixed(2)}</td>
                <td>1,000.00</td>
                <td>0</td>
                <td><div class="status-active">${row.status || 'Active'}</div></td>
                <td>
                    <div class="action-btns">
                        <button class="action-icon" title="Transfer" onclick="openAgentTransfer('${row.username}')"><i class="fa-solid fa-money-bill-transfer"></i></button>
                        <button class="action-icon" title="History"><i class="fa-solid fa-list-ul"></i></button>
                        <button class="action-icon" title="Settings"><i class="fa-solid fa-gear"></i></button>
                        <button class="action-icon" title="Profile"><i class="fa-solid fa-user"></i></button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
        
        // ড্যাশবোর্ড সামারি আপডেট
        updateAgentSummary(snapshot);
    });

    // --- Navigation Logic ---
    const navItems = document.querySelectorAll(".nav-item");
    const viewPanels = document.querySelectorAll(".view-panel");

    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = item.getAttribute("data-target");
            if (!targetId) return;

            navItems.forEach(nav => nav.classList.remove("active"));
            viewPanels.forEach(panel => panel.classList.remove("active"));

            item.classList.add("active");
            document.getElementById(targetId).classList.add("active");
        });
    });

    // --- Modal Logic ---
    const modal = document.getElementById("addUserModal");
    const addBtn = document.getElementById("addUserBtn");
    const closeBtn = document.getElementById("closeModalBtn");

    if(addBtn) addBtn.onclick = () => modal.classList.add("active");
    if(closeBtn) closeBtn.onclick = () => modal.classList.remove("active");

    window.onclick = (e) => {
        if (e.target === modal) modal.classList.remove("active");
    };
});

// ড্যাশবোর্ড কার্ডের ভ্যালু আপডেট করার ফাংশন
function updateAgentSummary(snapshot) {
    let totalBal = 0;
    snapshot.forEach(child => {
        totalBal += parseFloat(child.val().points || 0);
    });
    // প্রিমিয়াম কার্ড আপডেট লজিক এখানে যুক্ত করা যাবে
}

// লগআউট লজিক
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("agent_auth");
        window.location.href = "login.html";
    });
}
