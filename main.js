let currentLang = localStorage.getItem("lang") || "ar";
let currentPage = "home";

function updateDirection() {
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
}

function loadHome() {
  currentPage = "home";
  updateDirection();
  const t = translations[currentLang];
  document.getElementById('pageTitle').innerText = t.title;
  document.getElementById('pageTitle').classList.remove('green');

  const icons = [
    "fa-users", "fa-calendar-alt", "fa-graduation-cap", "fa-pen",
    "fa-chart-bar", "fa-file-alt", "fa-calculator", "fa-file"
  ];

  let cards = '';
  for (let i = 0; i < t.cardTitles.length; i++) {
    cards += `<div class="card" onclick="loadPage('card${i}')">
                <i class='fas ${icons[i]}'></i>${t.cardTitles[i]}
              </div>`;
  }

  document.getElementById('mainContent').innerHTML = `
    <img class="logo" src="images/logo.png" alt="شعار PROGRES">
    <div class="grid">${cards}</div>
  `;

  updateFooterTabs();
}

function loadPage(page) {
  currentPage = page;
  updateDirection();
  const t = translations[currentLang];
  const header = document.getElementById('pageTitle');
  header.classList.add('green');

  if (page === 'cards') {
    header.innerText = t.tabs[1];
    const student = JSON.parse(localStorage.getItem('student')) || {};
    const frontImage = `images/cards/${student.registration_number}.jpg`; // أو .png
    const backImage = `images/card-back.png`; // صورة خلفية موحدة

    document.getElementById('mainContent').innerHTML = `
      <div class="card-flip-container" onclick="this.classList.toggle('flipped')">
        <div class="card-flip-inner">
          <div class="card-flip-front">
            <img src="${frontImage}" alt="بطاقة الطالب" 
                 onerror="this.src='images/not-found.png'">
          </div>
          <div class="card-flip-back">
            <img src="${backImage}" alt="الوجه الخلفي">
          </div>
        </div>
      </div>
      <p style="text-align:center; margin-top: 10px; color: #555;">انقر على البطاقة لتقليبها</p>
    `;
  } else if (page === 'profile') {
    header.innerText = t.tabs[3];
    const student = JSON.parse(localStorage.getItem('student')) || {};
    const langText = t.student.langLabel;
    const logoutText = t.student.logout;

    document.getElementById('mainContent').innerHTML = `
      <div style="max-width: 360px; margin: 30px auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.15);">
        <div style="background-color: #007e63; color: white; padding: 16px; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <div style="font-weight: bold; font-size: 18px;">${student.full_name || '-'}</div>
            <div style="font-size: 14px;">${student.department || ''} - ${student.year || ''}</div>
          </div>
          <img src="${student.photo_url || 'images/profile.png'}" alt="صورة الطالب" style="width: 48px; height: 48px; border-radius: 50%; border: 2px solid white;">
        </div>
        <div style="padding: 16px; text-align: ${currentLang === 'ar' ? 'right' : 'left'};">
          <div style="margin-bottom: 12px;">
            <i class="fas fa-map-marker-alt" style="margin-left: 8px; color: #007e63;"></i>
            <strong>${currentLang === 'ar' ? 'مكان الميلاد' : 'Lieu de naissance'}:</strong> ${student.place || '-'}
          </div>
          <div style="margin-bottom: 12px;">
            <i class="fas fa-calendar-alt" style="margin-left: 8px; color: #007e63;"></i>
            <strong>${currentLang === 'ar' ? 'تاريخ الميلاد' : 'Date de naissance'}:</strong> ${student.birthdate || '-'}
          </div>
          <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
            <strong>${langText}</strong>
            <span onclick="toggleLanguage()" style="padding: 4px 10px; border: 1px solid #007e63; border-radius: 6px; cursor:pointer;">${currentLang}</span>
          </div>
        </div>
        <button onclick="logout()" style="width: 100%; padding: 14px; background-color: #d9534f; color: white; border: none; font-weight: bold; cursor: pointer; font-size: 16px;">
          ${logoutText}
        </button>
      </div>
    `;
  } else {
    header.innerText = t.tabs[2];
    document.getElementById('mainContent').innerHTML = `<div style="margin-top: 100px; font-size: 1.2rem; color: #666;">${currentLang === 'ar' ? 'لا توجد أخبار حالياً' : 'Aucune actualité disponible pour le moment'}</div>`;
  }

  updateFooterTabs();
}

function setActiveTab(tab) {
  const tabs = ['home', 'cards', 'news', 'profile'];
  tabs.forEach(t => {
    const el = document.getElementById('tab-' + t);
    if (el) el.classList.remove('active');
  });
  const activeTab = document.getElementById('tab-' + tab);
  if (activeTab) activeTab.classList.add('active');
}

function toggleLanguage() {
  currentLang = currentLang === 'ar' ? 'fr' : 'ar';
  localStorage.setItem("lang", currentLang);
  loadCurrentPage();
}

function updateFooterTabs() {
  const tabs = translations[currentLang].tabs;
  document.querySelector('#tab-home span').innerText = tabs[0];
  document.querySelector('#tab-cards span').innerText = tabs[1];
  document.querySelector('#tab-news span').innerText = tabs[2];
  document.querySelector('#tab-profile span').innerText = tabs[3];
}

function loadCurrentPage() {
  if (currentPage === "home") loadHome();
  else loadPage(currentPage);
}

loadHome();

function logout() {
  localStorage.removeItem('student');
  window.location.href = 'login.html';
}
