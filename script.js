// ==========================================================================
// 1. SCROLL ANIMATION SYSTEM
// ==========================================================================
const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ==========================================================================
// 2. AUTHENTICATION SYSTEM (LOGIN, DISPLAY USER, LOGOUT)
// ==========================================================================
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userNameBox = document.getElementById("userName");
const loginLink = document.getElementById("loginLink");
const savedUsername = localStorage.getItem("username");

// Handle Halaman Login
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "" || password === "") {
      alert("Please fill username and password!");
      return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    window.location.href = "index.html";
  });
}

// Handle Tampilan Navigasi & Sapaan User di Home
if (savedUsername) {

  if (userNameBox) {
    userNameBox.innerHTML = `
      Hello, ${savedUsername}
      <button id="logoutBtn" class="logout-btn">
        Logout
      </button>
    `;
  }

  if (loginLink) {
    loginLink.style.display = "none";
  }

}
// Handle Proses Logout
if (logoutBtn) {
  document.addEventListener("click", (e) => {
  if (e.target.id === "logoutBtn") {

    localStorage.removeItem("username");
    localStorage.removeItem("password");

    window.location.href = "login.html";
  }
});
}

// ==========================================================================
// 3. CARBON EMISSION ESTIMATOR FORM (FORMULA PER JAM)
// ==========================================================================
const aiType = document.getElementById("aiType");
const otherAi = document.getElementById("otherAi");
const calculateBtn = document.getElementById("calculateBtn");
const aiUsage = document.getElementById("aiUsage");
const calculateResult = document.getElementById("calculateResult");
const resultText = document.getElementById("resultText");

// Toggle Input Kustom Jika Memilih Opsi "Other"
if (aiType && otherAi) {
  aiType.addEventListener("change", () => {
    if (aiType.value === "Other") {
      otherAi.style.display = "block";
    } else {
      otherAi.style.display = "none";
    }
  });
}

// Proses Kalkulasi Kasar Berdasarkan Jam Penggunaan
if (calculateBtn) {
  calculateBtn.addEventListener("click", () => {
    let usageHours = parseInt(aiUsage.value);
    let result = 0;

    if (!usageHours || !aiType.value) {
      alert("Please select AI usage and AI type!");
      return;
    }

    switch (aiType.value) {
      case "ChatGPT":
        result = usageHours * 4;
        break;
      case "Gemini":
        result = usageHours * 3;
        break;
      case "Blackbox":
        result = usageHours * 5;
        break;
      case "Meta AI":
        result = usageHours * 2;
        break;
      default:
        result = usageHours * 3;
    }

    if (result > 100) result = 100;

    resultText.innerHTML = result + "%";
    calculateResult.classList.add("show");
  });
}

// ==========================================================================
// 4. DETAILED CARBON CALCULATOR (BERDASARKAN JENIS AKTIVITAS)
// ==========================================================================
const calculateCarbon = document.getElementById("calculateCarbon");
const calculateEmissionBtn = document.getElementById("calculateEmissionBtn");

// Kalkulator Detail dengan Output Analogi Gambar & Tier Deskripsi
if (calculateCarbon) {
  calculateCarbon.addEventListener("click", () => {
    const chat = Number(document.getElementById("chatCount").value);
    const summary = Number(document.getElementById("summaryCount").value);
    const longText = Number(document.getElementById("longTextCount").value);
    const image = Number(document.getElementById("imageCount").value);

    if (chat === 0 && summary === 0 && longText === 0 && image === 0) {
      alert("Masukkan aktivitas AI terlebih dahulu!");
      return;
    }

    const emission = (chat * 0.1) + (summary * 0.1) + (longText * 2.0) + (image * 4.5);

}
    document.getElementById("carbonResult").innerHTML = emission.toFixed(2) + " gram CO₂e";
    

    const imageBox = document.getElementById("carbonImage");
    const title = document.getElementById("carbonTitle");
    const desc = document.getElementById("carbonDescription");

    if (emission <= 2) {
      const lampMinutes = Math.round(emission * 15);
      imageBox.src = "LAMPULED.jpg";
      title.innerHTML = "🟢 Micro Usage";
      desc.innerHTML = `Jejak karbon digital totalmu sangat minim. Setara lampu LED menyala selama ${lampMinutes} menit.`;
    } else if (emission <= 5) {
      const charge = (emission / 5).toFixed(1);
      imageBox.src = "hp.jpg";
      title.innerHTML = "🟢 Low Usage";
      desc.innerHTML = `Penggunaanmu masih rendah. Setara ${charge} kali charge penuh HP.`;
    } else if (emission <= 15) {
      const hours = (emission / 4).toFixed(1);
      imageBox.src = "kmar2.jpg";
      title.innerHTML = "🟡 Moderate Usage";
      desc.innerHTML = `Setara lampu kamar menyala selama ${hours} jam.`;
    } else if (emission <= 40) {
      const hours = (emission / 4).toFixed(1);
      imageBox.src = "kmr3.jpg";
      title.innerHTML = "🟠 High Usage";
      desc.innerHTML = `Aktivitas AI harianmu setara lampu menyala ${hours} jam tanpa henti.`;
    } else {
      const meter = Math.round(emission * 20);
      imageBox.src = "mtor.jpeg";
      title.innerHTML = "🔴 Extreme Usage";
      desc.innerHTML = `Total aktivitasmu setara mengendarai motor sejauh ${meter} meter.`;
    }
  });
}

// Kalkulator Sederhana Alternatif (Single Activity Multiply)
if (calculateEmissionBtn) {
  calculateEmissionBtn.addEventListener("click", () => {
    const emission = parseFloat(document.getElementById("activityType").value);
    const count = parseInt(document.getElementById("activityCount").value);

    if (!emission || !count) {
      alert("Please fill all fields!");
      return;
    }

    const totalEmission = emission * count;
    document.getElementById("carbonResult").innerHTML = totalEmission.toFixed(2);
  });
}

// ==========================================================================
// 5. LIVE REALTIME TRACKER (STOPWATCH & EMISSION SIMULATOR)
// ==========================================================================
const timer = document.getElementById("timer");
const carbonValue = document.getElementById("carbonValue");
const startBtn = document.getElementById("startBtn");
const modeButtons = document.querySelectorAll(".carbon-tabs button");

let seconds = 0, minutes = 0, hours = 0;
let carbon = 0;
let running = false;
let interval;
let currentMode = "Text"; // Mode bawaan

// Switch Mode Konten Tab Tracker
modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((btn) => btn.classList.remove("active-mode"));
    button.classList.add("active-mode");

    // Efek Animasi Klik Tombol
    button.style.transform = "scale(1.1)";
    setTimeout(() => { button.style.transform = "scale(1)"; }, 200);

    // Reset Semua Tracker ke Status Awal saat Ganti Mode
    currentMode = button.innerText;
    clearInterval(interval);
    running = false;
    seconds = 0; minutes = 0; hours = 0; carbon = 0;
    
    if (timer) timer.innerHTML = "00:00:00";
    if (carbonValue) carbonValue.innerHTML = "0%";
    if (startBtn) startBtn.innerHTML = "START";
  });
});

// Update Waktu dan Simulasi Kalkulasi Karbon Realtime
function updateTimer() {
  seconds++;

  if (currentMode === "Text") {
    if (seconds % 30 === 0 && carbon < 100) carbon++;
  } else if (currentMode === "Image") {
    if (seconds % 3 === 0 && carbon < 100) carbon++;
  } else if (currentMode === "Video") {
    if (carbon < 100) carbon += 5;
  }

  if (carbon > 100) carbon = 100;

  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes >= 60) {
    minutes = 0;
    hours++;
  }

  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;

  if (timer) timer.innerHTML = `${h}:${m}:${s}`;
  if (carbonValue) carbonValue.innerHTML = carbon + "%";

  // Auto-stop jika indikator mencapai 100%
  if (carbon >= 100) {
    clearInterval(interval);
    running = false;
    if (startBtn) startBtn.innerHTML = "FULL";
  }
}

// Trigger Aksi Tombol Start / Stop / Full Reset
if (startBtn) {
  startBtn.addEventListener("click", () => {
    if (startBtn.innerHTML === "FULL") {
      seconds = 0; minutes = 0; hours = 0; carbon = 0;
      timer.innerHTML = "00:00:00";
      carbonValue.innerHTML = "0%";
      startBtn.innerHTML = "START";
      return;
    }

    if (!running) {
      interval = setInterval(updateTimer, 1000);
      running = true;
      startBtn.innerHTML = "STOP";
    } else {
      clearInterval(interval);
      running = false;
      startBtn.innerHTML = "START";
    }
  });
}

// ==========================================================================
// 6. SURVEY ACTIONS & MAIL INTEGRATION
// ==========================================================================
const surveyBtn = document.getElementById("surveyBtn");

if (surveyBtn) {
  surveyBtn.addEventListener("click", () => {
    const survey = document.getElementById("aiUsage").value;

    if (!survey.trim()) {
      alert("Please fill the survey first.");
      return;
    }

    const email = "track02team@gmail.com";
    const subject = encodeURIComponent("Track02 AI Usage Survey");
    const body = encodeURIComponent("User Survey:\n\n" + survey);

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });
}

// ==========================================================================
// 7. CHART.JS INITIALIZATION (EMISSION VISUALIZATION)
// ==========================================================================
const chartCanvas = document.getElementById("emissionChart");

if (chartCanvas) {
  new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: ["Membuat Gambar Baru", "Membuat Teks Panjang", "Merangkum Teks", "Tanya Jawab Singkat"],
      datasets: [{
        data: [4.5, 2.0, 0.1, 0.1],
        borderColor: "#8DFF5A",
        backgroundColor: "rgba(0,0,0,0)",
        borderWidth: 3
      }]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "Emisi Karbon (gram CO2e)",
          color: "#ffffff",
          font: { size: 20, weight: "bold" }
        }
      },
      scales: {
        x: {
          ticks: { color: "#ffffff" },
          grid: { color: "rgba(255,255,255,0.2)" }
        },
        y: {
          ticks: { color: "#ffffff" },
          grid: { color: "rgba(255,255,255,0.1)" }
        }
      }
    }
  });
}
document.addEventListener("click", function(e){

    if(e.target.closest("#logoutBtn")){

        localStorage.removeItem("username");
        localStorage.removeItem("password");

        location.href = "index.html";

    }

});
document.addEventListener("click", function(e){

  if(e.target.id === "logoutBtn"){

      localStorage.clear();

      window.location.href = "login.html";
  }

});
import { auth, db } from "./firebase.js";

import {
  collection,
  addDoc
}
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
