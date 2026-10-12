// Database of Indian Festivals
const festivalsData = [
    {
        id: 1,
        name: "Diwali",
        region: "National",
        month: "October / November",
        image: "images/diwali.jpg",
        description: "The grand Festival of Lights celebrating the victory of light over darkness and good over evil. Homes are decorated with diyas, rangolis, and bursting fireworks.",
        significance: "Marks Lord Rama's return to Ayodhya after 14 years in exile and the worship of Goddess Lakshmi for wealth and prosperity.",
        rituals: "Lighting oil lamps (diyas), preparing sweets like kaju katli and ladoos, exchanging gifts, and performing Lakshmi Puja.",
        food: "Gujia, Ladoo, Kaju Katli, Chakli, Puran Poli."
    },
    {
        id: 2,
        name: "Holi",
        region: "North",
        month: "March",
        image: "images/holi.jpg",
        description: "The vibrant Festival of Colors where people smear each other with colored powders (gulal), spray colored water, and celebrate the arrival of spring.",
        significance: "Commemorates the eternal divine love of Radha Krishna and the triumph of devotion over the demoness Holika.",
        rituals: "Holika Dahan bonfire on the eve of the festival, followed by playing with colours, water balloons, and dancing to dhol beats.",
        food: "Gujia, Thandai, Malpua, Dahi Vada."
    },
    {
        id: 3,
        name: "Durga Puja / Navratri",
        region: "East",
        month: "September / October",
        image: "images/durga-puja.jpg",
        description: "A grand ten-day celebration honoring Goddess Durga, featuring magnificent artistic pandals, rhythmic dhunuchi dance, and devotional chants.",
        significance: "Celebrates the victory of Goddess Durga over the buffalo demon Mahishasura, symbolizing feminine divine power (Shakti).",
        rituals: "Pandal hopping, offering Pushpanjali, performing Sindoor Khela on Dashami, and immersion of idols in holy rivers.",
        food: "Khichuri, Mishri Doi, Rasgulla, Luchi, Alur Dom."
    },
    {
        id: 4,
        name: "Pongal / Makar Sankranti",
        region: "South",
        month: "January",
        image: "images/pongal.jpg",
        description: "A vibrant harvest festival thanking nature, the Sun God, and farm animals for a bountiful agricultural yield.",
        significance: "Marks the transition of the sun into the zodiac sign Makara (Uttarayana), signaling longer days.",
        rituals: "Boiling fresh rice with milk and jaggery in earthen pots outdoors, worshipping cattle (Mattu Pongal), and flying kites.",
        food: "Sweet Pongal, Ven Pongal, Murukku, Til Ladoo, Undhiyu."
    },
    {
        id: 5,
        name: "Ganesh Chaturthi",
        region: "West",
        month: "August / September",
        image: "images/ganesh.jpg",
        description: "A magnificent 10-day festival celebrating the birth of Lord Ganesha, the elephant-headed deity of wisdom and new beginnings.",
        significance: "Invoking Lord Ganesha's blessings to remove obstacles before undertaking new ventures.",
        rituals: "Installing clay idols of Ganesha in homes and grand pandals, daily aartis, offering modaks, and grand visarjan processions.",
        food: "Modak, Puran Poli, Coconut Rice, Karanji."
    },
    {
        id: 6,
        name: "Eid-ul-Fitr",
        region: "National",
        month: "Islamic Calendar",
        image: "images/eid.jpg",
        description: "A joyous festival marking the conclusion of the holy month of Ramadan, characterized by communal prayers, charity, and feasts.",
        significance: "Expressing gratitude to Allah for giving strength and endurance during the month of fasting.",
        rituals: "Wearing new clothes, offering special Eid prayers in congregation at mosques, giving Eidi to children, and charity (Zakat al-Fitr).",
        food: "Sheer Khurma, Biryani, Kebabs, Phirni."
    }
];

// Render Festival Cards
function renderFestivals(filter = 'all', searchQuery = '') {
    const grid = document.getElementById('festival-grid');
    grid.innerHTML = '';

    let filtered = festivalsData;
    if (filter !== 'all') {
        filtered = filtered.filter(f => f.region.toLowerCase() === filter.toLowerCase());
    }

    if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(f => 
            f.name.toLowerCase().includes(q) || 
            f.region.toLowerCase().includes(q) || 
            f.description.toLowerCase().includes(q) ||
            f.significance.toLowerCase().includes(q)
        );
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fa-solid fa-triangle-exclamation text-4xl text-amber-500 mb-3"></i>
                <p class="text-stone-600 text-lg">No festivals found matching your search.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(festival => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-3xl overflow-hidden shadow-xl border border-stone-200 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group';
        card.innerHTML = `
            <div class="relative h-64 overflow-hidden">
                <img src="${festival.image}" alt="${festival.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <span class="absolute top-4 right-4 bg-amber-500 text-stone-950 font-semibold text-xs px-3 py-1 rounded-full shadow-md">${festival.region}</span>
                <span class="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full"><i class="fa-regular fa-calendar mr-1.5 text-amber-400"></i>${festival.month}</span>
            </div>
            <div class="p-6 flex flex-col flex-grow justify-between">
                <div>
                    <h3 class="font-['Cinzel'] text-2xl font-bold text-stone-900 mb-2">${festival.name}</h3>
                    <p class="text-stone-600 text-sm line-clamp-3 mb-4">${festival.description}</p>
                </div>
                <button onclick="openFestivalModal(${festival.id})" class="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-amber-500 hover:text-white text-stone-800 font-semibold transition-all text-sm flex items-center justify-center">
                    Read More & Traditions <i class="fa-solid fa-arrow-right ml-2 text-xs"></i>
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Region Filter Click Handler
function filterFestivals(region) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-amber-500', 'text-stone-950', 'shadow-md');
        btn.classList.add('bg-stone-200', 'text-stone-700');
    });
    event.target.classList.remove('bg-stone-200', 'text-stone-700');
    event.target.classList.add('bg-amber-500', 'text-stone-950', 'shadow-md');

    renderFestivals(region, document.getElementById('global-search').value);
}

// Quick Search Handler
function handleQuickSearch() {
    const val = document.getElementById('global-search').value;
    renderFestivals('all', val);
    document.getElementById('festivals').scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('global-search').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleQuickSearch();
});

// Modal Popups
function openFestivalModal(id) {
    const festival = festivalsData.find(f => f.id === id);
    if (!festival) return;

    const modal = document.getElementById('festival-modal');
    const content = document.getElementById('modal-content');

    content.innerHTML = `
        <button onclick="closeFestivalModal()" class="absolute top-5 right-5 w-10 h-10 rounded-full bg-stone-100 hover:bg-red-500 hover:text-white text-stone-700 flex items-center justify-center transition-all">
            <i class="fa-solid fa-xmark text-lg"></i>
        </button>
        <div class="relative h-64 rounded-2xl overflow-hidden mb-6 shadow-md">
            <img src="${festival.image}" alt="${festival.name}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent flex items-end p-6">
                <div>
                    <span class="bg-amber-500 text-stone-950 font-semibold text-xs px-3 py-1 rounded-full mb-2 inline-block">${festival.region} Region</span>
                    <h2 class="font-['Cinzel'] text-3xl font-bold text-white">${festival.name}</h2>
                </div>
            </div>
        </div>
        <div class="space-y-4 text-stone-700">
            <div>
                <h4 class="font-semibold text-amber-600 uppercase text-xs tracking-wider mb-1">Overview</h4>
                <p class="text-sm leading-relaxed">${festival.description}</p>
            </div>
            <div>
                <h4 class="font-semibold text-amber-600 uppercase text-xs tracking-wider mb-1">Cultural Significance</h4>
                <p class="text-sm leading-relaxed">${festival.significance}</p>
            </div>
            <div>
                <h4 class="font-semibold text-amber-600 uppercase text-xs tracking-wider mb-1">Traditional Rituals</h4>
                <p class="text-sm leading-relaxed">${festival.rituals}</p>
            </div>
            <div>
                <h4 class="font-semibold text-amber-600 uppercase text-xs tracking-wider mb-1">Traditional Delicacies</h4>
                <p class="text-sm font-medium text-stone-900 bg-amber-50 p-3 rounded-xl border border-amber-200"><i class="fa-solid fa-utensils mr-2 text-amber-600"></i>${festival.food}</p>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    setTimeout(() => content.classList.add('modal-active'), 10);
}

function closeFestivalModal() {
    const modal = document.getElementById('festival-modal');
    const content = document.getElementById('modal-content');
    content.classList.remove('modal-active');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

document.getElementById('festival-modal').addEventListener('click', (e) => {
    if (e.target.id === 'festival-modal') closeFestivalModal();
});

// Live Countdown Timer (Diwali 2026)
function updateCountdown() {
    // Setting Diwali date for 2026 (November 8, 2026)
    const targetDate = new Date('November 8, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff < 0) {
        document.getElementById('countdown-timer').innerHTML = "<h3 class='text-2xl font-bold col-span-4'>Happy Diwali! Festival is Live!</h3>";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Interactive Quiz Data & Logic
const quizQuestions = [
    {
        question: "Which festival marks the return of Lord Rama to Ayodhya after 14 years of exile?",
        options: ["Holi", "Diwali", "Dussehra", "Navratri"],
        answer: 1
    },
    {
        question: "In which state is the famous Hornbill Festival celebrated?",
        options: ["Nagaland", "Kerala", "Punjab", "Rajasthan"],
        answer: 0
    },
    {
        question: "What is the primary sweet dish prepared during Eid-ul-Fitr?",
        options: ["Jalebi", "Gulab Jamun", "Sheer Khurma", "Rasgulla"],
        answer: 2
    },
    {
        question: "Which classical dance form originated in the state of Kerala?",
        options: ["Bharatanatyam", "Kathakali", "Kuchipudi", "Odissi"],
        answer: 1
    }
];

let currentQuizIndex = 0;
let score = 0;

function renderQuiz() {
    const container = document.getElementById('quiz-container');
    if (currentQuizIndex >= quizQuestions.length) {
        container.innerHTML = `
            <div class="text-center py-8">
                <div class="w-16 h-16 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-3xl mx-auto mb-4">
                    <i class="fa-solid fa-trophy"></i>
                </div>
                <h3 class="font-['Cinzel'] text-2xl font-bold mb-2">Quiz Completed!</h3>
                <p class="text-stone-600 mb-6">You scored <span class="font-bold text-orange-600">${score}</span> out of <span class="font-bold">${quizQuestions.length}</span>.</p>
                <button onclick="restartQuiz()" class="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 text-white font-semibold shadow-md hover:opacity-95 transition-all">Play Again</button>
            </div>
        `;
        return;
    }

    const q = quizQuestions[currentQuizIndex];
    container.innerHTML = `
        <div class="flex justify-between items-center mb-6 text-xs text-stone-500 font-semibold uppercase">
            <span>Question ${currentQuizIndex + 1} of ${quizQuestions.length}</span>
            <span>Score: ${score}</span>
        </div>
        <h3 class="font-['Cinzel'] text-xl sm:text-2xl font-bold text-stone-900 mb-6">${q.question}</h3>
        <div class="space-y-3 mb-6" id="quiz-options">
            ${q.options.map((opt, idx) => `
                <button onclick="checkAnswer(${idx})" class="w-full text-left p-4 rounded-2xl border border-stone-200 hover:border-amber-500 hover:bg-amber-50/50 font-medium text-stone-800 transition-all flex items-center justify-between group">
                    <span>${opt}</span>
                    <span class="w-6 h-6 rounded-full border border-stone-300 flex items-center justify-center text-xs text-stone-400 group-hover:border-amber-500 group-hover:text-amber-600">
                        <i class="fa-solid fa-chevron-right"></i>
                    </span>
                </button>
            `).join('')}
        </div>
    `;
}

function checkAnswer(selectedIdx) {
    const q = quizQuestions[currentQuizIndex];
    const buttons = document.querySelectorAll('#quiz-options button');

    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.answer) {
            btn.classList.add('bg-green-100', 'border-green-500', 'text-green-800');
        } else if (idx === selectedIdx) {
            btn.classList.add('bg-red-100', 'border-red-500', 'text-red-800');
        }
    });

    if (selectedIdx === q.answer) {
        score++;
    }

    setTimeout(() => {
        currentQuizIndex++;
        renderQuiz();
    }, 1500);
}

function restartQuiz() {
    currentQuizIndex = 0;
    score = 0;
    renderQuiz();
}

// Interactive Greeting Card Maker Logic
function updateCardPreview() {
    const festival = document.getElementById('card-festival').value;
    const recipient = document.getElementById('card-recipient').value || 'Dear Family & Friends';
    const message = document.getElementById('card-message').value || 'Wishing you happiness and prosperity!';
    const sender = document.getElementById('card-sender').value || 'Our Family';

    document.getElementById('preview-tag').innerText = `${festival} Greeting`;
    document.getElementById('preview-recipient').innerText = `${recipient},`;
    document.getElementById('preview-msg').innerText = message;
    document.getElementById('preview-sender').innerText = sender;

    const iconMap = {
        'Diwali': 'fa-fireworks',
        'Holi': 'fa-palette',
        'Navratri': 'fa-om',
        'Pongal / Sankranti': 'fa-sun',
        'Eid': 'fa-moon'
    };
    document.getElementById('card-preview-icon').className = `fa-solid ${iconMap[festival] || 'fa-fireworks'}`;
}

function copyCardMessage() {
    const festival = document.getElementById('card-festival').value;
    const recipient = document.getElementById('card-recipient').value || 'Dear Family & Friends';
    const message = document.getElementById('card-message').value;
    const sender = document.getElementById('card-sender').value || 'Our Family';

    const fullText = `✨ Happy ${festival} ✨\n\n${recipient},\n${message}\n\nWarmest Wishes,\n${sender}`;

    navigator.clipboard.writeText(fullText).then(() => {
        alert('Greeting card message copied to clipboard!');
    });
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// Initial Render on Page Load
window.addEventListener('DOMContentLoaded', () => {
    renderFestivals('all');
    renderQuiz();
    updateCardPreview();
});