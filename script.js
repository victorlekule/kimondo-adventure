

// 1. Inject Google Fonts (Montserrat & Playfair Display)
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// 2. Inject Font Awesome if not already present (for icons)
if (!document.querySelector('link[href*="font-awesome"]')) {
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(faLink);
}

// 3. Tailwind Configuration
window.tailwind.config = {
    theme: {
        extend: {
            colors: {
                forest: '#2E7D32',
                golden: '#F5A623',
                choco: '#6D3A1F',
                turquoise: '#00BCD4',
                warm: '#5D4037',
                'brand-dark': '#0B0C0E',
                'brand-blue': '#0D8ABC',
                'brand-yellow': '#FCEE21'
            },
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
            }
        }
    }
};

// 4. Translation Dictionary & Language Config
const translations = {
    en: {
        location: "Dar es Salaam, Tanzania",
        tagline: "Tech & Branding Authority",
        navHome: "Home",
        navAbout: "About Us",
        navWhy: "Why Us",
        navZanzibar: "Zanzibar Tours",
        navSafari: "Tanzania Safaris",
        navShop: "Gift Shop",
        navGallery: "Gallery",
        navBlog: "Blog",
        navContact: "Contact",
        navBooking: "Booking"
    },
    fr: {
        location: "Dar es Salaam, Tanzanie",
        tagline: "Autorité Tech & Branding",
        navHome: "Accueil",
        navAbout: "À Propos",
        navWhy: "Pourquoi Nous",
        navZanzibar: "Excursions Zanzibar",
        navSafari: "Safaris Tanzanie",
        navShop: "Boutique",
        navGallery: "Galerie",
        navBlog: "Blog",
        navContact: "Contact",
        navBooking: "Réservation"
    },
    de: {
        location: "Dar es Salaam, Tansania",
        tagline: "Tech & Branding Autorität",
        navHome: "Startseite",
        navAbout: "Über Uns",
        navWhy: "Warum Wir",
        navZanzibar: "Sansibar Touren",
        navSafari: "Tansania Safaris",
        navShop: "Geschenkeladen",
        navGallery: "Galerie",
        navBlog: "Blog",
        navContact: "Kontakt",
        navBooking: "Buchung"
    },
    zh: {
        location: "坦桑尼亚达累斯萨拉姆",
        tagline: "科技与品牌权威",
        navHome: "首页",
        navAbout: "关于我们",
        navWhy: "为什么选择我们",
        navZanzibar: "桑给巴尔之旅",
        navSafari: "坦桑尼亚野生动物园",
        navShop: "礼品店",
        navGallery: "画廊",
        navBlog: "博客",
        navContact: "联系",
        navBooking: "预订"
    },
    ar: {
        location: "دار السلام، تنزانيا",
        tagline: "سلطة التكنولوجيا والعلامات التجارية",
        navHome: "الرئيسية",
        navAbout: "معلومات عنا",
        navWhy: "لماذا نحن",
        navZanzibar: "جولات زنجبار",
        navSafari: "رحلات السفاري تنزانيا",
        navShop: "متجر الهدايا",
        navGallery: "معرض الصور",
        navBlog: "مدونة",
        navContact: "اتصل",
        navBooking: "حجز"
    }
};

const languageConfig = {
    en: { name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
    fr: { name: 'Français', flag: 'https://flagcdn.com/w40/fr.png' },
    de: { name: 'Deutsch', flag: 'https://flagcdn.com/w40/de.png' },
    zh: { name: '中文', flag: 'https://flagcdn.com/w40/cn.png' },
    ar: { name: 'العربية', flag: 'https://flagcdn.com/w40/sa.png' }
};

// 5. Navigation Links Definition (adjust URLs as needed)
const navLinks = [
    { name: 'Home', url: 'index.html', i18n: 'navHome' },
    { name: 'About Us', url: 'about us.html', i18n: 'navAbout' },
    { name: 'Why Us', url: 'why choose.html', i18n: 'navWhy' },
    { name: 'Zanzibar Tours', url: 'zanzibar.html', i18n: 'navZanzibar' },
    { name: 'Tanzania Safaris', url: 'tanzania.html', i18n: 'navSafari' },
    { name: 'Gift Shop', url: 'gift shop.html', i18n: 'navShop' },
    { name: 'Gallery', url: 'gallery.html', i18n: 'navGallery' },
    { name: 'Blog', url: 'blog.html', i18n: 'navBlog' },
    { name: 'Contact', url: 'contact.html', i18n: 'navContact' }
];

const bookingLink = { name: 'Booking', url: 'booking.html', i18n: 'navBooking' };

// 6. Build Header HTML (to be injected on DOMContentLoaded)
// 6. Build Header HTML (to be injected on DOMContentLoaded)
function buildHeaderHTML(currentLang = 'en') {
    const t = translations[currentLang];

    // Desktop navigation links
    const desktopLinksHTML = navLinks.map(link => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const isActive = decodeURIComponent(currentPage) === decodeURIComponent(link.url);
        
        // FIX: Re-added whitespace-nowrap. Shrunk base text size and padding so it fits on 13"/14" Macs.
        // It will only scale up to text-base and px-3 on massive 2xl screens (1536px+)
        const baseClasses = "transition-colors duration-300 text-[13px] xl:text-sm 2xl:text-base tracking-wide whitespace-nowrap px-1.5 xl:px-2 2xl:px-3";
        
        const stateClasses = isActive
            ? "text-forest font-bold underline underline-offset-4 decoration-2"
            : "text-warm font-medium hover:text-forest";
        return `<a href="${link.url}" class="${baseClasses} ${stateClasses}" data-i18n="${link.i18n}">${t[link.i18n]}</a>`;
    }).join('');

    // Mobile navigation links
    const mobileLinksHTML = navLinks.map(link => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const isActive = decodeURIComponent(currentPage) === decodeURIComponent(link.url);
        const baseClasses = "block px-6 py-3 transition-colors duration-300 border-b border-gray-100 whitespace-nowrap";
        const stateClasses = isActive
            ? "text-forest font-bold underline underline-offset-4 decoration-2"
            : "text-warm font-medium hover:bg-forest hover:text-white";
        return `<a href="${link.url}" class="${baseClasses} ${stateClasses}" data-i18n="${link.i18n}">${t[link.i18n]}</a>`;
    }).join('');

    // Language options for dropdown
    const langOptionsHTML = Object.entries(languageConfig).map(([code, lang]) => `
        <div class="lang-option flex items-center gap-3 px-5 py-3 hover:bg-forest/5 cursor-pointer text-warm font-medium text-sm border-b border-gray-100 last:border-0" data-lang="${code}">
            <img src="${lang.flag}" class="w-6 h-4 object-cover rounded-sm shadow-sm"> ${lang.name}
        </div>
    `).join('');

    return `
    <header class="bg-white shadow-md fixed w-full top-0 z-[9999]">
        
        <div class="bg-gradient-to-r from-warm to-choco text-white py-2 md:py-3">
            <div class="w-full px-2 lg:px-4 flex flex-row items-center justify-between flex-nowrap">
                <div class="hidden xl:flex items-center text-xs font-medium tracking-wider text-golden/80 uppercase ">
                    <i class="fas fa-globe mr-1"></i> <span data-i18n="tagline">Find your peace, one destination at a time</span>
                </div>
                
                <div class="flex flex-row items-center gap-3 md:gap-6 text-[13px] font-medium whitespace-nowrap overflow-x-auto hide-scrollbar">
                    <a href="https://maps.google.com/?q=Dar+es+Salaam" target="_blank" class="flex items-center gap-2 hover:text-golden transition-colors group">
                        <i class="fa-solid fa-location-dot text-golden text-base group-hover:scale-110 transition-transform"></i>
                        <span class="hidden sm:inline" data-i18n="location">${t.location}</span>
                        <span class="sm:hidden">Dar es Salaam</span>
                    </a>
                    <a href="https://wa.me/255123456789" target="_blank" class="flex items-center gap-2 hover:text-golden transition-colors group">
                        <i class="fa-brands fa-whatsapp text-green-400 text-[18px] group-hover:scale-110 transition-transform"></i>
                        <span class="hidden sm:inline">+255 123 456 789</span>
                    </a>
                    <a href="mailto:hello@kimondoadventures.com" class="hidden md:flex items-center gap-2 hover:text-golden transition-colors group">
                        <i class="fa-solid fa-envelope text-golden text-base group-hover:scale-110 transition-transform"></i>
                        <span>hello@kimondoadventures.com</span>
                    </a>
                </div>
                
                <div class="relative flex-shrink-0 ml-2">
                    <button id="lang-btn" class="bg-white/10 hover:bg-white/20 rounded px-3 md:px-4 py-1.5 md:py-2 flex items-center gap-2 border border-white/30 transition-all shadow-sm focus:outline-none whitespace-nowrap">
                        <img id="current-flag-img" src="${languageConfig[currentLang].flag}" alt="${languageConfig[currentLang].name}" class="w-5 h-3.5 md:h-4 object-cover rounded-sm shadow-sm">
                        <span id="current-lang-text" class="font-semibold text-xs md:text-sm tracking-wide">${languageConfig[currentLang].name}</span>
                        <i class="fa-solid fa-caret-down text-white text-[10px] md:text-xs ml-1 transition-transform duration-200" id="lang-arrow"></i>
                    </button>
                    <div id="lang-menu" class="hidden absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-2xl border border-gray-100 overflow-hidden z-50">
                        ${langOptionsHTML}
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full px-2 lg:px-4 flex items-center justify-between py-2 md:py-3">
            
            <div class="flex-shrink-0">
                <a href="index.html" class="text-2xl md:text-2xl lg:text-3xl font-serif font-bold text-forest flex items-center gap-2 whitespace-nowrap">
                    Kimondo <span class="text-golden italic">Adventures</span>
                </a>
            </div>

            <nav class="hidden xl:flex items-center justify-center flex-1 min-w-0 gap-0.5 2xl:gap-4 px-2">
                ${desktopLinksHTML}
            </nav>

            <div class="flex-shrink-0 flex items-center gap-2">
                <a href="${bookingLink.url}" class="hidden xl:inline-block bg-golden hover:bg-yellow-500 text-white px-5 xl:px-6 py-2 xl:py-3 rounded-md font-semibold tracking-wider shadow-md transition-all duration-300 transform hover:-translate-y-0.5 text-sm xl:text-base whitespace-nowrap" data-i18n="${bookingLink.i18n}">
                    ${t[bookingLink.i18n]}
                </a>
                <button id="mobile-menu-btn" class="xl:hidden text-forest hover:text-golden focus:outline-none p-2">
                    <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path id="menu-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
            </div>
        </div>

        <div id="mobile-menu" class="hidden xl:hidden bg-white border-r border-b border-t border-gray-100 shadow-xl absolute font-sans top-full left-0 w-full sm:w-max rounded-br-2xl overflow-hidden">
            <div class="flex flex-col py-2">
                ${mobileLinksHTML}
                <div class="px-4 py-4">
                    <a href="${bookingLink.url}" class="block text-center bg-golden hover:bg-yellow-500 text-white px-6 py-3 rounded-md font-semibold tracking-wider shadow-sm transition-colors duration-300 whitespace-nowrap" data-i18n="${bookingLink.i18n}">
                        ${t[bookingLink.i18n]}
                    </a>
                </div>
            </div>
        </div>
    </header>
    `;
}

// 7. Initialization on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById('kimondo-header');
    if (!headerContainer) return;

    let currentLang = localStorage.getItem('site_lang') || 'en';
    if (!translations[currentLang]) currentLang = 'en';

    headerContainer.innerHTML = buildHeaderHTML(currentLang);

    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (menuIcon) {
                if (mobileMenu.classList.contains('hidden')) {
                    menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
                } else {
                    menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
                }
            }
        });
    }

    // Language switcher
    const langBtn = document.getElementById('lang-btn');
    const langMenu = document.getElementById('lang-menu');
    const langArrow = document.getElementById('lang-arrow');

    if (langBtn && langMenu) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langMenu.classList.toggle('hidden');
            if (langArrow) langArrow.classList.toggle('rotate-180');
        });

        document.addEventListener('click', () => {
            langMenu.classList.add('hidden');
            if (langArrow) langArrow.classList.remove('rotate-180');
        });

        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.addEventListener('click', (e) => {
                const lang = e.currentTarget.getAttribute('data-lang');
                if (lang && translations[lang]) {
                    localStorage.setItem('site_lang', lang);
                    headerContainer.innerHTML = buildHeaderHTML(lang);
                    setTimeout(() => {
                        const newLangBtn = document.getElementById('lang-btn');
                        const newLangMenu = document.getElementById('lang-menu');
                        const newLangArrow = document.getElementById('lang-arrow');
                        if (newLangBtn && newLangMenu) {
                            newLangBtn.addEventListener('click', (e) => {
                                e.stopPropagation();
                                newLangMenu.classList.toggle('hidden');
                                if (newLangArrow) newLangArrow.classList.toggle('rotate-180');
                            });
                        }
                        const newMobileBtn = document.getElementById('mobile-menu-btn');
                        const newMobileMenu = document.getElementById('mobile-menu');
                        const newMenuIcon = document.getElementById('menu-icon');
                        if (newMobileBtn && newMobileMenu) {
                            newMobileBtn.addEventListener('click', () => {
                                newMobileMenu.classList.toggle('hidden');
                                if (newMenuIcon) {
                                    newMenuIcon.setAttribute('d', newMobileMenu.classList.contains('hidden') 
                                        ? 'M4 6h16M4 12h16M4 18h16' 
                                        : 'M6 18L18 6M6 6l12 12');
                                }
                            });
                        }
                        document.querySelectorAll('.lang-option').forEach(opt2 => {
                            opt2.addEventListener('click', (e2) => {
                                const lang2 = e2.currentTarget.getAttribute('data-lang');
                                if (lang2 && translations[lang2]) {
                                    localStorage.setItem('site_lang', lang2);
                                    headerContainer.innerHTML = buildHeaderHTML(lang2);
                                }
                            });
                        });
                    }, 50);
                }
            });
        });
    }

    // Hide scrollbar utility
    const style = document.createElement('style');
    style.textContent = `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);
});

// ============================================
// SCROLL REVEAL ANIMATION - Used on All Pages
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(reveal => revealObserver.observe(reveal));
});


  
// --- GALLERY DATA ---
const galleryData = [
    {
        id: "water-sports",
        title: "🌊 Water Sports & Ocean Experiences",
        desc: "Experience the thrill and beauty of Zanzibar's ocean through our most popular activities.",
        images: [
            "IMG/1 (1).jpg",
            "IMG/1 (2).jpg",
            "IMG/1 (3).jpg",
            "IMG/1 (4).jpg",
            "IMG/1 (5).jpg"
        ]
    },
    {
        id: "tours-culture",
        title: "🏝 Tours & Cultural Experiences",
        desc: "Discover the culture, history, and iconic locations that make Zanzibar unique.",
        images: [
            "IMG/1 (6).jpg",
            "IMG/1 (7).jpg",
            "IMG/1 (8).jpg",
            "IMG/1 (9).jpg"
        ]
    },
    {
        id: "nature-adventure",
        title: "🌿 Nature & Adventure",
        desc: "Reconnect with nature through lush forests, hidden caves, and natural beauty.",
        images: [
            "IMG/1 (10).jpg",
            "IMG/1 (5).jpg",
            "IMG/1 (1).jpg"
        ]
    },
    {
        id: "luxury-special",
        title: "✨ Luxury & Special Moments",
        desc: "Celebrate life's special moments in the most unforgettable way.",
        images: [
            "IMG/1 (11).jpg",
            "IMG/1 (3).jpg",
            "IMG/1 (8).jpg",
            "IMG/1 (9).jpg"
        ]
    },
    {
        id: "safari",
        title: "🐘 Safari Experiences",
        desc: "Witness the wild beauty of Tanzania through powerful safari encounters.",
        images: [
            "IMG/1 (12).jpg",
            "IMG/1 (13).jpg",
            "IMG/1 (7).jpg"
        ]
    },
    {
        id: "gift-shop",
        title: "🛍️ Kimondo Gift Shop",
        desc: "Whether it's a gift for someone special or a keepsake for yourself, every item supports local artisans and communities.",
        images: [
            "IMG/1 (4).jpg",
            "IMG/1 (1).jpg",
            "IMG/1 (7).jpg"
        ]
    }
];

// --- DOM ELEMENTS ---
const filterContainer = document.getElementById('filter-container');
const galleryGrid = document.getElementById('gallery-grid');
const catTitle = document.getElementById('cat-title');
const catDesc = document.getElementById('cat-desc');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const loadMoreBtnContainer = document.getElementById('load-more-container');

// Lightbox state variables
let currentLightboxImages = [];
let currentImageIndex = 0;
let allImagesFlattened = [];
let currentlyDisplayedCount = 0;

// --- INITIALIZATION ---
function initGallery() {
    // Pre-calculate the flattened 'all' array
    galleryData.forEach(cat => allImagesFlattened = allImagesFlattened.concat(cat.images));
    
    renderFilterBtn('all', 'All Experiences', true);
    galleryData.forEach(cat => renderFilterBtn(cat.id, cat.title.split(' ')[0] + ' ' + cat.title.split(' ')[1])); 
    renderImages('all');
}

// --- FILTER BUTTONS ---
function renderFilterBtn(id, label, isActive = false) {
    const btn = document.createElement('button');
    btn.className = `filter-btn whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${isActive ? 'bg-forest text-white border-forest shadow-md' : 'bg-white text-warm/70 border-warm/20 hover:border-forest hover:text-forest'}`;
    btn.innerText = label;
    btn.onclick = () => {
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('bg-forest', 'text-white', 'border-forest', 'shadow-md');
            b.classList.add('bg-white', 'text-warm/70', 'border-warm/20');
        });
        btn.classList.remove('bg-white', 'text-warm/70', 'border-warm/20');
        btn.classList.add('bg-forest', 'text-white', 'border-forest', 'shadow-md');
        renderImages(id);
    };
    filterContainer.appendChild(btn);
}

// --- RENDER IMAGES ---
function renderImages(categoryId) {
    galleryGrid.innerHTML = ''; 
    galleryGrid.classList.remove('fade-in'); 
    loadMoreBtnContainer.classList.add('hidden'); // Hide button initially
    
    let imagesToRender = [];

    if (categoryId === 'all') {
        catTitle.innerText = "All Experiences";
        catDesc.innerText = "Discover the beauty, thrill, and culture of Zanzibar and Tanzania.";
        imagesToRender = allImagesFlattened;
        
        // Determine initial count based on screen size
        const screenWidth = window.innerWidth;
        let limit = 15; // Large screens
        
        if (screenWidth < 640) {
            limit = 6; // Mobile
        } else if (screenWidth < 1024) {
            limit = 8; // Tablet
        }
        
        currentlyDisplayedCount = Math.min(limit, imagesToRender.length);
        
        // If there are more images than the initial limit, show the "Load More" button
        if (imagesToRender.length > currentlyDisplayedCount) {
            loadMoreBtnContainer.classList.remove('hidden');
        }
        
    } else {
        // If it's a specific category, just show them all
        const category = galleryData.find(c => c.id === categoryId);
        catTitle.innerText = category.title;
        catDesc.innerText = category.desc;
        imagesToRender = category.images;
        currentlyDisplayedCount = imagesToRender.length; 
    }

    currentLightboxImages = imagesToRender;
    appendImageBlocks(imagesToRender.slice(0, currentlyDisplayedCount));
}

// Helper to append image HTML
function appendImageBlocks(imagesArray) {
    imagesArray.forEach((imgSrc) => {
        // Ensure index matches global array for Lightbox navigation
        const globalIndex = currentLightboxImages.indexOf(imgSrc); 
        
        const imgBlock = `
            <div class="relative overflow-hidden group cursor-pointer bg-warm/5 aspect-square rounded-2xl" onclick="openLightbox(${globalIndex})">
                <img src="${imgSrc}" loading="lazy" alt="Gallery Image" class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white border border-white/50 transform scale-50 group-hover:scale-100 transition-transform duration-300">
                        <i class="fa-solid fa-expand"></i>
                    </div>
                </div>
            </div>
        `;
        galleryGrid.insertAdjacentHTML('beforeend', imgBlock);
    });

    setTimeout(() => galleryGrid.classList.add('fade-in'), 10);
}

// --- LOAD MORE FUNCTION ---
function loadMoreImages() {
    // Append the rest of the array
    const remainingImages = currentLightboxImages.slice(currentlyDisplayedCount);
    appendImageBlocks(remainingImages);
    
    // Hide the button once all are shown
    loadMoreBtnContainer.classList.add('hidden');
    currentlyDisplayedCount = currentLightboxImages.length;
}

// --- ENHANCED LIGHTBOX LOGIC ---
function openLightbox(index) {
    currentImageIndex = index;
    lightboxImg.src = currentLightboxImages[currentImageIndex];
    
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    
    setTimeout(() => {
        lightbox.classList.remove('opacity-0');
        lightboxImg.classList.remove('scale-95');
        lightboxImg.classList.add('scale-100');
    }, 10);
    
    document.body.style.overflow = 'hidden'; 
}

function closeLightbox(event) {
    if (event) event.stopPropagation();
    lightbox.classList.add('opacity-0');
    lightboxImg.classList.remove('scale-100');
    lightboxImg.classList.add('scale-95');
    
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
    }, 300);
    
    document.body.style.overflow = 'auto'; 
}

function navigateLightbox(direction, event) {
    event.stopPropagation();
    currentImageIndex = currentImageIndex + direction;
    
    if (currentImageIndex >= currentLightboxImages.length) {
        currentImageIndex = 0; 
    } else if (currentImageIndex < 0) {
        currentImageIndex = currentLightboxImages.length - 1; 
    }
    
    lightboxImg.classList.add('opacity-0');
    setTimeout(() => {
        lightboxImg.src = currentLightboxImages[currentImageIndex];
        lightboxImg.classList.remove('opacity-0');
    }, 150);
}

// Keyboard navigation for Lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('hidden')) {
        if (e.key === 'Escape') closeLightbox(null);
        if (e.key === 'ArrowRight') navigateLightbox(1, e);
        if (e.key === 'ArrowLeft') navigateLightbox(-1, e);
    }
});


// --- GALLERY PAGE INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    initGallery();
});





/* ============================================
   CONTACT PAGE - JavaScript
   Functions: Reveal animations for form
   ============================================ */

function initContactPage() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(reveal => observer.observe(reveal));
}

/* ============================================
   GIFT SHOP PAGE - JavaScript
   Functions: Collections, cart management, notifications
   ============================================ */

// --- GIFT SHOP COLLECTIONS DATA ---
const collections = [
    {
        title: "Handmade Crafts",
        desc: "Beautifully crafted baskets, pottery, and home décor made by local artisans.",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&w=600&q=80",
        price: "$25 - $85",
        tag: "Décor"
    },
    {
        title: "Zanzibar Spices",
        desc: "Authentic cloves, nutmeg, and vanilla sourced from the island of Zanzibar.",
        image: "https://images.unsplash.com/photo-1596647903254-8e5ba138e6df?ixlib=rb-4.0.3&w=600&q=80",
        price: "$12 - $45",
        tag: "Spices"
    },
    {
        title: "Natural Wellness",
        desc: "Natural wellness products including sea moss, crafted to support a healthy lifestyle.",
        image: "https://images.unsplash.com/photo-1579722820308-d74e571813a8?ixlib=rb-4.0.3&w=600&q=80",
        price: "$18 - $55",
        tag: "Wellness"
    },
    {
        title: "Beachwear & Accessories",
        desc: "Stylish sarongs, hats, bags, and jewelry designed for both tourists and locals.",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&w=600&q=80",
        price: "$15 - $60",
        tag: "Fashion"
    },
    {
        title: "Souvenirs",
        desc: "From magnets and keychains to traditional carvings, perfect memento of your experience.",
        image: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?ixlib=rb-4.0.3&w=600&q=80",
        price: "$5 - $35",
        tag: "Keepsakes"
    },
    {
        title: "Art & Décor",
        desc: "Local paintings, carvings, and decorative items that tell a story of Zanzibar's culture.",
        image: "https://images.unsplash.com/photo-1565593293613-ba2e12e0a1b9?ixlib=rb-4.0.3&w=600&q=80",
        price: "$30 - $150",
        tag: "Art"
    }
];

// --- GIFT SHOP FUNCTIONS ---
let cartCount = 0;

function initGiftShop() {
    const grid = document.getElementById('collections-grid');
    if(!grid) return;
    
    grid.innerHTML = collections.map(col => `
        <div class="product-card bg-white rounded-2xl overflow-hidden shadow-md border border-warm/5 flex flex-col h-full">
            <div class="h-56 overflow-hidden">
                <img src="${col.image}" alt="${col.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
            </div>
            <div class="p-5 flex flex-col flex-grow">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-xs font-bold uppercase tracking-wider text-golden">${col.tag}</span>
                    <span class="text-sm font-semibold text-forest">${col.price}</span>
                </div>
                <h3 class="text-xl font-serif font-bold text-forest mb-2">${col.title}</h3>
                <p class="text-warm/70 text-sm mb-4 flex-grow">${col.desc}</p>
                <button onclick="addToCart('${col.title}', '${col.price}')" class="mt-2 w-full bg-forest hover:bg-forest/80 text-white py-2 rounded-full transition flex items-center justify-center gap-2 text-sm font-semibold">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
    
    // Reveal animations
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(r => observer.observe(r));
}

function addToCart(itemName, price) {
    cartCount++;
    const cartCountSpan = document.getElementById('cart-count');
    if(cartCountSpan) cartCountSpan.innerText = cartCount;
    showToast(`✨ ${itemName} added to cart! (${price})`);
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    if(!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'bg-dark text-white px-5 py-2 rounded-full shadow-lg text-sm toast';
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}







//tanza safari database//
    (function(){
        "use strict";

        // ---------- COMPLETE SAFARI DATABASE (fully detailed) ----------
        const safariPackages = [
            // ========== GAME SAFARIS ==========
            { id: 1, name: "3-Day Taste of Tanzania Safari — Midrange", category: "game", duration: "3 days", price: "$1,500", location: "Lake Manyara · Ngorongoro · Tarangire", shortDesc: "Three iconic parks in three unforgettable days. Zanzibar ↔ Zanzibar.", image: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Lake Manyara · Ngorongoro Crater · Tarangire. With our experienced driver-guides, this is a trip of a lifetime.",
              itinerary: ["Day 1: Zanzibar to Lake Manyara NP, full-day game drive, overnight Lake Manyara Serena Lodge", "Day 2: Ngorongoro Crater floor (5hr game drive), overnight Tarangire Sopa Lodge", "Day 3: Tarangire half-day game drive, flight back to Zanzibar"],
              included: ["Return domestic flights ZNZ-ARK", "4x4 Land Cruiser (3 days)", "Airport transfers", "Lake Manyara Serena Luxury Lodge (1nt F/B)", "Tarangire Sopa Lodge (1nt F/B)", "All park fees", "Picnic lunches"],
              notIncluded: ["International flights", "Visa (USD $100 US / $50 other)", "Tips", "Optional activities", "Personal expenses"] },
              
            { id: 2, name: "3-Day Tanzania Luxury Safari", category: "game", duration: "3 days", price: "$1,600", location: "Kilimanjaro Airport · Manyara · Tarangire · Ngorongoro", shortDesc: "Luxury lodges and the best of northern Tanzania.", image: "https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Lake Manyara · Tarangire · Ngorongoro Crater. Stay in premium lodges.",
              itinerary: ["Day 1: Arrival Kilimanjaro Airport, transfer Grand Melia Hotel Arusha (B&B)", "Day 2: Lake Manyara game drive, overnight Lake Manyara Serena Lodge (F/B)", "Day 3: Tarangire full day, overnight Sopa Lodge (F/B)", "Day 4: Ngorongoro Crater 5-6hr tour, return Arusha Grand Melia (B&B)", "Day 5: Departure transfer"],
              included: ["4x4 Land Cruiser", "Airport transfers", "Grand Melia Hotel Arusha (2nts B&B)", "Lake Manyara Serena Lodge (F/B)", "Tarangire Sopa Lodge (F/B)", "All park fees", "Picnic lunches"],
              notIncluded: ["International flights", "Visa", "Tips", "Optional activities"] },
              
            { id: 3, name: "4-Day Tanzania Luxury Safari", category: "game", duration: "4 days", price: "On request", location: "Serengeti · Ngorongoro Crater", shortDesc: "Serengeti and Ngorongoro in style. Optional flight upgrade.", image: "https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Serengeti · Ngorongoro Crater. Stay at BushTops and Pioneer camps. Optional flight Arusha→Serengeti (+$150).",
              itinerary: ["Day 1: Arrival Kilimanjaro Airport, Gran Melia Hotel", "Day 2: Arusha to Serengeti, game drive, Serengeti BushTops Luxury Camp (F/B)", "Day 3: Central Serengeti full day, Serengeti Pioneer Luxury Camp", "Day 4: Serengeti to Ngorongoro, The Highland at Ngorongoro", "Day 5: Crater tour, return Arusha, departure (optional Zanzibar flight +$175)"],
              included: ["4x4 Land Cruiser", "Airport transfers", "All listed accommodation (F/B)", "Professional guide", "All park fees"],
              notIncluded: ["International flights", "Visa", "Tips", "Optional flight upgrades"] },
              
            { id: 4, name: "4-Day Tanzania Safari — Shared Tour", category: "game", duration: "4 days", price: "$680", location: "Zanzibar ↔ Zanzibar · Tarangire · Serengeti · Ngorongoro", shortDesc: "Affordable camping safari with flights from Zanzibar.", image: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Tarangire · Serengeti · Ngorongoro Crater. Camping accommodation.",
              itinerary: ["Day 1: Zanzibar to Arusha flight, Tarangire game drive, Fig Tree Campsite", "Day 2: Mto wa Mbu to Serengeti, game drive, Seronera Campsite (F/B)", "Day 3: Central Serengeti full day, Seronera Campsite", "Day 4: Ngorongoro Crater 5hr tour, flight back to Zanzibar"],
              included: ["Return domestic flights ZNZ-ARK", "4x4 Land Cruiser", "Airport transfers", "Camping accommodation (F/B)", "All park fees", "Picnic lunches"],
              notIncluded: ["International flights", "Visa", "Tips", "Optional activities"] },
              
            { id: 5, name: "3-Day Serengeti & Ngorongoro — Private Tour", category: "game", duration: "3 days", price: "$2,160", location: "Kilimanjaro Airport · Serengeti · Ngorongoro", shortDesc: "Private tour focusing on Serengeti and the crater.", image: "https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Serengeti · Ngorongoro Crater. Private 4x4 and guide.",
              itinerary: ["Day 0: Arrival Kilimanjaro Airport, Moivaro Lodge Arusha (B&B)", "Day 1: Arusha to Serengeti, game drive, Serengeti Wild Camp (F/B)", "Day 2: Serengeti to Ngorongoro, game drive en route, Ngorongoro Rhino Lodge (F/B)", "Day 3: Ngorongoro Crater 5-6hr tour, return Arusha Ambassador Hotel (B&B)", "Day 4: Departure transfer"],
              included: ["4x4 Land Cruiser", "All park fees", "Moivaro Lodge (arrival night)", "Serengeti Wild Camp (F/B)", "Ngorongoro Rhino Lodge (F/B)", "Ambassador Hotel (B&B)", "Airport transfers"],
              notIncluded: ["International flights", "Visa", "Tips"] },
              
            { id: 6, name: "8-Day Serengeti Migration Safari — Private", category: "game", duration: "8 days", price: "$2,750", location: "July–August Special · Tarangire · Serengeti North · Ngorongoro", shortDesc: "Best time for wildebeest migration & Mara River crossings.", image: "https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Tarangire · Central & Northern Serengeti · Ngorongoro. Witness the great migration and river crossings.",
              itinerary: ["Day 1: Arrival Kilimanjaro, Rivertrees Country Inn", "Day 2: Tarangire, Marera Valley Lodge", "Day 3: Serengeti, Serengeti Wild Camp", "Day 4: Central Serengeti, Serengeti Mara River Camp", "Day 5: Northern Serengeti, Africa Safari Serengeti North", "Day 6: Serengeti to Ngorongoro, Ngorongoro Wild Camp", "Day 7: Ngorongoro Crater, return Rivertrees", "Day 8: Departure"],
              included: ["4x4 Land Cruiser (5 safari days)", "All park fees", "Accommodation as listed (F/B)", "Airport transfers", "Game drives"],
              notIncluded: ["International flights", "Visa", "Balloon Safari ($546)", "Tips"] },
              
            { id: 7, name: "5-Day Budget Safari — Shared Tour", category: "game", duration: "5 days", price: "On request", location: "Manyara · Tarangire · Serengeti · Ngorongoro", shortDesc: "Shared camping safari covering the northern circuit.", image: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Tarangire, Lake Manyara, Serengeti, Ngorongoro. Camping accommodation.",
              itinerary: ["Day 1: Arusha to Tarangire, Kizumba Campsite", "Day 2: Lake Manyara, Kizumba Campsite", "Day 3: Lake Manyara to Serengeti, Serengeti Wild Camp", "Day 4: Serengeti to Ngorongoro, Ngorongoro Ang'ata Camp or Rhino Lodge", "Day 5: Ngorongoro Crater, return Arusha (Venice/Ambassador Hotel)"],
              included: ["4x4 Land Cruiser", "All park fees", "Camping/lodge (as listed)", "Professional guide", "Picnic lunches", "Round-trip airport transfers"],
              notIncluded: ["International flights", "Visa", "Tips"] },
              
            { id: 8, name: "7-Day Flying Parks Luxury Safari", category: "game", duration: "7 days", price: "$5,600", location: "Zanzibar ↔ Zanzibar · Fly between parks", shortDesc: "Zero road fatigue. Maximum wildlife. Fly between Serengeti, Ngorongoro, Tarangire, Manyara.", image: "https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Fly-in luxury safari covering Serengeti, Ngorongoro, Tarangire, Manyara.",
              itinerary: ["Day 1: Fly Zanzibar to Serengeti, game drive, Serengeti Explore Luxury Lodge", "Day 2: Serengeti full day, Acacia Wildlife Lodge", "Day 3: Northern Serengeti, Four Seasons", "Day 4: Serengeti to Ngorongoro, Serena Lodge", "Day 5: Ngorongoro to Tarangire, Sopa Lodge", "Day 6: Tarangire, Lake Manyara Serena Lodge", "Day 7: Lake Manyara game drive, fly to Zanzibar"],
              included: ["All domestic flights", "4x4 Land Cruiser", "Luxury lodges (F/B)", "All park fees", "Professional guide", "Airport transfers"],
              notIncluded: ["International flights", "Visa", "Tips"] },
              
            { id: 9, name: "9-Day Photographic Wilderness Safari — Shared", category: "game", duration: "9 days", price: "On request", location: "Serengeti Central · Ndutu · Ngorongoro", shortDesc: "Dedicated photographic 4x4. Local chef at picnic sites.", image: "https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Photographic safari with sunrise/sunset game drives. Designed for photographers.",
              itinerary: ["Day 1: JRO to Arusha Venice Hotel (B&B)", "Days 2-5: Serengeti Central, Serengeti Rest House/Nyani Camp (F/B)", "Day 6: Ndutu Southern Serengeti, Ndutu Heritage Camp", "Day 7: Ndutu full day, Ndutu Heritage Camp", "Day 8: Ngorongoro Crater, return Arusha Venice Hotel (B&B)", "Day 9: Transfer to JRO"],
              included: ["Photographic 4x4 jeep (7 days)", "All park fees", "Arusha Venice Hotel (2nts B&B)", "Serengeti Nyani Camp (4nts F/B)", "Ndutu Heritage Camp (2nts F/B)", "Professional driver-guide", "JRO transfers"],
              notIncluded: ["International flights", "Visa", "Balloon Safari", "Tips"] },
              
            { id: 10, name: "10-Day Southern Tanzania Safari", category: "game", duration: "10 days", price: "On request", location: "Nyerere (Selous) · Udzungwa · Ruaha · Mikumi", shortDesc: "Boat safari, walking safari, waterfall hiking. The untouched south.", image: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Southern circuit: Selous, Udzungwa, Ruaha, Mikumi. Game drives, boat safari, walking safari.",
              itinerary: ["Day 1: Dar to Nyerere (Selous), boat safari", "Days 2-3: Selous game drives", "Day 4: Selous to Mikumi", "Day 5: Mikumi to Udzungwa hike, return Mikumi", "Day 6: Mikumi to Ruaha", "Days 7-8: Ruaha game drives", "Day 9: Ruaha to Mikumi", "Day 10: Mikumi to Dar es Salaam"],
              included: ["All transport", "Accommodation (F/B)", "Boat safari", "Walking safari", "Professional guide", "Game drives"],
              notIncluded: ["International flights", "Visa", "Tips", "Optional Maasai tour"] },
            
            // ========== SPECIAL & COMBINATION ==========
            { id: 20, name: "2-Day Hot Air Balloon Safari (Fly-in)", category: "special", duration: "2 days", price: "$2,600", location: "Zanzibar → Serengeti → Zanzibar", shortDesc: "Sunrise balloon flight over Serengeti + champagne breakfast.", image: "https://images.pexels.com/photos/1634440/pexels-photo-1634440.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Fly from Zanzibar for a balloon safari and luxury overnight. Best time: dry season June-October.",
              itinerary: ["Day 1: Early flight Zanzibar to Serengeti, afternoon game drive, luxury tented camp", "Day 2: 04:45 pickup, 1hr balloon flight, champagne bush breakfast, final game drive, return flight to Zanzibar"],
              included: ["Return domestic flights ZNZ-Serengeti", "Hot air balloon flight (1hr)", "Champagne bush breakfast", "Private game drives", "Luxury tented camp (F/B)", "All transfers"],
              notIncluded: ["International flights", "Visa", "Tips"] },
              
            { id: 21, name: "7-Day Honeymoon Budget Safari — Private", category: "special", duration: "7 days", price: "$3,400", location: "Tarangire · Serengeti · Ngorongoro · Manyara", shortDesc: "Budget camping meets luxury finale. Made for two.", image: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Private honeymoon safari with mix of camping and luxury lodge (Four Seasons).",
              itinerary: ["Day 0: Arrival Arusha, Ambassador Hotel", "Day 1: Tarangire, Panorama Campsite", "Day 2: Serengeti, Seronera Campsite", "Day 3: Ndutu Serengeti, camping", "Day 4: Central Serengeti, Four Seasons Luxury Lodge", "Day 5: Leisure / optional balloon, Four Seasons", "Day 6: Ngorongoro Crater, Simba Campsite", "Day 7: Lake Manyara, departure"],
              included: ["4x4 Land Cruiser", "All park fees", "Accommodation as listed", "Professional guide", "Picnic lunches", "Airport transfers"],
              notIncluded: ["International flights", "Visa", "Tips", "Balloon safari"] },
              
            { id: 22, name: "15-Day Best of Tanzania: Safari + Zanzibar", category: "special", duration: "15 days", price: "$4,850", location: "Tarangire · Manyara · Serengeti · Ngorongoro · Hadzabe · Kilimanjaro · Zanzibar", shortDesc: "Wildlife, culture, mountain, and beach — all in one epic journey.", image: "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Complete Tanzania experience including Hadzabe bushmen and Zanzibar beach.",
              itinerary: ["Days 1-9: Northern safari (Tarangire, Manyara, Serengeti, Ngorongoro) + Hadzabe Bushmen experience", "Day 10: Kilimanjaro day hike (Marangu)", "Days 11-15: Zanzibar (Stone Town, Nakupenda Beach, Jozani Forest, Menai Bay, North Coast leisure)"],
              included: ["All transport and transfers", "Accommodation as listed", "Meals as per plan", "Professional guides", "All park fees", "Domestic flight to Zanzibar"],
              notIncluded: ["International flights", "Visa", "Tips", "Optional activities"] },
              
            { id: 23, name: "8-Day Kenya & Tanzania Safari — Private", category: "special", duration: "8 days", price: "On request", location: "Amboseli (Kenya) · Tarangire · Ngorongoro · Serengeti", shortDesc: "Combine Kenya's Amboseli with Tanzania's northern circuit.", image: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Amboseli (Kilimanjaro views) then Tarangire, Ngorongoro, Serengeti.",
              itinerary: ["Day 1: Nairobi to Amboseli, Sentrim Amboseli Lodge", "Day 2: Amboseli full day", "Day 3: Amboseli to Arusha, Africa Safari Arusha", "Day 4: Tarangire, Africa Safari Lake Manyara", "Day 5: Ngorongoro Crater, Ngorongoro Safari Lodge", "Day 6: Serengeti, Kati Kati Tented Lodge", "Day 7: Serengeti full day, Mara Kati Kati", "Day 8: Serengeti to Arusha / extensions"],
              included: ["4x4 Land Cruiser", "7 nights accommodation (F/B)", "All park fees", "Professional driver-guide", "Airport transfers", "Drinking water"],
              notIncluded: ["International flights", "Tips", "Visa", "Personal items"] },
              
            { id: 24, name: "12-Day Kenya, Tanzania & Zanzibar Beach Holiday", category: "special", duration: "12 days", price: "$5,500", location: "Masai Mara · Serengeti · Ngorongoro · Zanzibar", shortDesc: "Big Five safari plus Zanzibar beach relaxation.", image: "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Masai Mara, Serengeti, Ngorongoro, then Zanzibar with Safari Blue and diving.",
              itinerary: ["Day 1: Arrival Nairobi, After 40 Hotel", "Day 2: Nairobi to Masai Mara, Ashnil Mara Camp", "Day 3: Masai Mara full day", "Day 4: Masai Mara to Serengeti, Serengeti Wild Camp", "Day 5: Serengeti full day", "Day 6: Serengeti to Ngorongoro, Ngorongoro Safari Lodge", "Day 7: Ngorongoro Crater, fly to Zanzibar, Zanzibar Spice Hotel", "Day 8: Stone Town & Prison Island", "Day 9: Safari Blue", "Day 10: Scuba Diving (2 dives)", "Day 11: Mnemba Island dolphins & snorkelling", "Day 12: Departure"],
              included: ["All transport and transfers", "11 nights accommodation", "Meals as specified", "Professional guides", "Park fees", "Safari Blue", "Scuba diving (2 dives)", "Dolphin & snorkelling trip"],
              notIncluded: ["International flights", "Tips", "Visa", "Personal items"] },
            
            // ========== KILIMANJARO ROUTES ==========
            { id: 30, name: "Marangu Route - 5 Days", category: "kilimanjaro", duration: "5 days", price: "$1,500", location: "Kilimanjaro · 'Coca-Cola' route", shortDesc: "Hut accommodation. Oldest and most popular path. Extra acclimatisation day available.", image: "https://images.pexels.com/photos/1266831/pexels-photo-1266831.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Marangu Route: only route with huts. 5-day climb. Huts: Mandara (2,720m), Horombo (3,720m), Kibo (4,720m).",
              itinerary: ["Day 1: Marangu Gate (1,820m) → Mandara Hut (2,720m) 8km/4-5hrs", "Day 2: Mandara Hut → Horombo Hut (3,720m) 12.5km/4-6hrs", "Day 3: Horombo Hut → Kibo Hut (4,720m) 9.5km/5-6hrs", "Day 4: Kibo Hut → Uhuru Peak (5,895m) → Horombo Hut (start midnight, 21.5km total)", "Day 5: Horombo Hut → Marangu Gate 18km/6hrs"],
              included: ["Park fees", "Rescue fees", "Conservation fee", "Camping/hut fees", "Professional guides, porters, cook", "3 meals daily on mountain", "Purified water", "Mountain tents, mess tent, sleeping mats", "Pulse oximeter, emergency oxygen", "2 nights hotel (before/after)", "Airport transfers"],
              notIncluded: ["International flights", "Visa", "Personal gear", "Sleeping bag", "Laundry", "Tips for crew", "Travel insurance"] },
              
            { id: 31, name: "Machame Route - 6 Days", category: "kilimanjaro", duration: "6 days", price: "$2,100", location: "Kilimanjaro · 'Whiskey' route", shortDesc: "Most scenic route. Tent camping. Higher success rate. For physically fit trekkers.", image: "https://images.pexels.com/photos/1266831/pexels-photo-1266831.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Machame Route: 6 days, scenic, camping. Descent via Mweka.",
              itinerary: ["Day 1: Machame Gate (1,830m) → Machame Camp (3,050m) 11km/5-6hrs", "Day 2: Machame Camp → Shira Camp (3,850m) 5km/4-5hrs", "Day 3: Shira Camp → Lava Tower (4,650m) → Barranco Camp (4,000m) 10km/5-6hrs", "Day 4: Barranco Camp → Barafu Camp (4,700m) 9km/6-8hrs", "Day 5: Barafu → Uhuru Peak (5,895m) → Mweka Camp (3,090m) summit midnight-2am", "Day 6: Mweka Camp → Mweka Gate (1,680m) 10km/3-4hrs"],
              included: ["All park & rescue fees", "Camping equipment", "Professional guides, porters, cook", "3 meals daily", "Purified water", "Pulse oximeter, oxygen", "2 nights hotel", "Airport transfers"],
              notIncluded: ["International flights", "Visa", "Personal gear", "Tips"] },
              
            { id: 32, name: "Lemosho Route - 7 Days", category: "kilimanjaro", duration: "7 days", price: "$2,100", location: "Kilimanjaro · Best acclimatisation", shortDesc: "Gold standard. Highest success rates. Western approach.", image: "https://images.pexels.com/photos/1266831/pexels-photo-1266831.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Lemosho Route: 7 days, best acclimatisation.",
              itinerary: ["Day 0: Arrival, hotel briefing", "Day 1: Lemosho Gate (2,100m) → Big Tree Camp (2,650m) 7km", "Day 2: Big Tree → Shira 2 Camp (3,850m) 17km", "Day 3: Shira 2 → Lava Tower → Barranco Camp (3,900m) 10km", "Day 4: Barranco → Karanga Camp (3,995m) 5.5km", "Day 5: Karanga → Barafu Camp (4,672m) 4km", "Day 6: Barafu → Uhuru Peak → Mweka Camp (3,100m) 17km", "Day 7: Mweka Camp → Mweka Gate 10km"],
              included: ["Park fees", "Camping", "Guides/porters", "Meals", "Oxygen", "2 nights hotel", "Transfers"],
              notIncluded: ["Flights", "Visa", "Gear", "Tips"] },
              
            { id: 33, name: "Shira Route - 6 Days", category: "kilimanjaro", duration: "6 days", price: "$1,800", location: "Kilimanjaro · Remote western approach", shortDesc: "Fewer crowds. Spectacular Shira Plateau views. For experienced hikers.", image: "https://images.pexels.com/photos/1266831/pexels-photo-1266831.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Shira Route: 6 days, starts at higher altitude.",
              itinerary: ["Day 1: Shira Gate (1,830m) → Shira 2 Camp (3,850m) 8km/4-5hrs", "Day 2: Shira 2 → Lava Tower → Barranco Camp 10km/5-6hrs", "Day 3: Barranco → Karanga Camp 5km/3-4hrs", "Day 4: Karanga → Barafu Camp 4km/3-4hrs", "Day 5: Barafu → Uhuru Peak → Mweka Camp", "Day 6: Mweka Camp → Mweka Gate"],
              included: ["Park fees", "Camping", "Guides/porters", "Meals", "Oxygen", "Hotel nights", "Transfers"],
              notIncluded: ["Flights", "Visa", "Gear"] },
              
            { id: 34, name: "Umbwe Route - 6 Days", category: "kilimanjaro", duration: "6 days", price: "$1,800", location: "Kilimanjaro · Steepest and most direct", shortDesc: "Most challenging. For strong hikers confident in rapid altitude acclimatisation.", image: "https://images.pexels.com/photos/1266831/pexels-photo-1266831.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Umbwe Route: steep, direct, low traffic. IMAX film route.",
              itinerary: ["Day 1: Umbwe Gate (1,800m) → Umbwe Cave Camp (2,850m) 10km/5-7hrs", "Day 2: Umbwe Cave → Barranco Camp (3,915m) 7km/6hrs", "Day 3: Barranco → Karanga Camp 5km/4-5hrs", "Day 4: Karanga → Barafu Camp 4km/4-5hrs", "Day 5: Barafu → Uhuru Peak → Mweka Camp", "Day 6: Mweka Camp → Mweka Gate"],
              included: ["Park fees", "Camping", "Guides/porters", "Meals", "Oxygen", "Hotel", "Transfers"],
              notIncluded: ["Flights", "Visa"] },
              
            { id: 35, name: "Rongai Route - 6 Days", category: "kilimanjaro", duration: "6 days", price: "$1,800", location: "Kilimanjaro · Northern approach", shortDesc: "Least crowded. Best wildlife sightings on the mountain. Remote feel.", image: "https://images.pexels.com/photos/1266831/pexels-photo-1266831.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Rongai Route: 6 days, northern side, descent via Marangu.",
              itinerary: ["Day 1: Rongai Gate → Simba Camp 6km/3-4hrs", "Day 2: First Cave → Kikelewa Camp 9km/6-7hrs", "Day 3: Kikelewa → Mawenzi Tarn Camp 6km/4hrs", "Day 4: Mawenzi Tarn → Kibo Camp 4km/3hrs", "Day 5: Kibo → Uhuru Peak → Horombo Hut", "Day 6: Horombo Hut → Marangu Gate 20km/5-7hrs"],
              included: ["Park fees", "Camping", "Guides/porters", "Meals", "Oxygen", "Hotel", "Transfers"],
              notIncluded: ["Flights"] },
              
            { id: 36, name: "Umbwe Western Breach - 6 Days", category: "kilimanjaro", duration: "6 days", price: "$1,800", location: "Kilimanjaro · Crater sleep", shortDesc: "Sleep inside Kilimanjaro's inner crater. One of only a few hundred people who do this each year.", image: "https://images.pexels.com/photos/1266831/pexels-photo-1266831.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "Umbwe via Western Breach. Overnight in crater.",
              itinerary: ["Day 1: Umbwe Gate → Umbwe Cave Camp", "Day 2: Umbwe Cave → Barranco Camp", "Day 3: Barranco → Lava Tower → Arrow Glacier Camp", "Day 4: Arrow Glacier → Crater Floor (5,700m)", "Day 5: Crater → Uhuru Peak → Mweka Camp", "Day 6: Mweka Camp → Mweka Gate"],
              included: ["Park fees", "Camping", "Special permits", "Guides/porters", "Meals", "Hotel", "Transfers"],
              notIncluded: ["Flights"] },
              
            { id: 37, name: "Northern Circuit - 10 Days", category: "kilimanjaro", duration: "10 days", price: "$3,000", location: "Kilimanjaro · Full Northern Circuit", shortDesc: "Ultimate Kilimanjaro experience. Highest success rates on the mountain.", image: "https://images.pexels.com/photos/1266831/pexels-photo-1266831.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "10-day Northern Circuit, best acclimatisation, traverses entire northern slopes.",
              itinerary: ["Day 1: Arrival Springlands Hotel", "Day 2: Londorossi Gate → Mkubwa Camp", "Day 3: Mkubwa → Shira 1", "Day 4: Shira 1 → Moir Camp", "Day 5: Moir → Buffalo/Pofu Camp", "Day 6: Pofu → Kikelewa/Third Caves", "Day 7: Third Caves → Mawenzi Tarn", "Day 8: Mawenzi Tarn → Outward Bound Camp", "Day 9: Outward Bound → Uhuru Peak → Millennium Camp", "Day 10: Millennium → Mweka Gate"],
              included: ["All park fees", "Camping", "Guides/porters", "Meals", "Oxygen", "2 nights hotel", "Transfers"],
              notIncluded: ["Flights", "Visa"] },
              
            { id: 38, name: "Mount Meru Trek - 3 Days", category: "kilimanjaro", duration: "3 days", price: "$900", location: "Mount Meru · 4,566m", shortDesc: "Perfect acclimatisation before Kilimanjaro, or a standalone adventure.", image: "https://images.pexels.com/photos/1266831/pexels-photo-1266831.jpeg?auto=compress&cs=tinysrgb&w=600",
              fullDesc: "3-day Mount Meru trek. Tanzania's second highest peak.",
              itinerary: ["Day 1: Momella Gate to Mariakamba Hut (2,516m) 10km/4hrs", "Day 2: Mariakamba to Saddle Hut (3,566m) 4km/3-4hrs, sunset walk Little Meru", "Day 3: Summit Socialist Peak (4,566m) 2am start, descend to Momella Gate 14km/6-8hrs, transfer Arusha"],
              included: ["All park & rescue fees", "Mountain equipment", "Professional guides, porters, cook", "3 meals daily", "2 nights hotel (before/after)", "Airport transfers", "Sleeping mattress", "Water"],
              notIncluded: ["Visa ($50)", "Personal expenses", "Tips ($15/day guide, $10/day porter)"] }
        ];

        // Render grid
        function renderSafaris(filterCategory = 'all') {
            const grid = document.getElementById('safariGrid');
            const filtered = filterCategory === 'all' ? safariPackages : safariPackages.filter(p => p.category === filterCategory);
            
            let html = '';
            filtered.forEach(pkg => {
                html += `
                    <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden card-hover flex flex-col">
                        <div class="relative h-48 overflow-hidden">
                            <img src="${pkg.image}" alt="${pkg.name}" class="w-full h-full object-cover">
                            <span class="absolute top-3 left-3 bg-forest/90 text-white text-xs px-3 py-1 rounded-full">${pkg.duration}</span>
                        </div>
                        <div class="p-5 flex-1 flex flex-col">
                            <h3 class="text-xl font-bold serif text-forest leading-tight mb-1">${pkg.name}</h3>
                            <p class="text-golden font-bold text-lg mb-1">${pkg.price} <span class="text-xs text-gray-400 font-normal">/ person</span></p>
                            <p class="text-gray-500 text-sm mb-2"><i class="fas fa-map-marker-alt mr-1 text-golden"></i>${pkg.location}</p>
                            <p class="text-gray-600 text-sm mb-4 line-clamp-2">${pkg.shortDesc}</p>
                            <div class="mt-auto flex gap-2">
                                <button onclick="openModal(${pkg.id})" class="flex-1 bg-forest hover:bg-green-800 text-white font-semibold py-2.5 rounded-lg text-sm transition">
                                    View Details
                                </button>
                                <button onclick="addToBooking('${pkg.name}')" class="border border-forest text-forest hover:bg-forest/5 px-4 py-2.5 rounded-lg text-sm">
                                    <i class="fas fa-cart-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
            grid.innerHTML = html || '<p class="col-span-full text-center text-gray-500 py-12">No safaris found in this category.</p>';
        }

        // Modal functions
        window.openModal = function(id) {
            const pkg = safariPackages.find(p => p.id === id);
            if (!pkg) return;
            
            const modalBody = document.getElementById('modalBody');
            modalBody.innerHTML = `
                <div class="space-y-5">
                    <div>
                        <span class="text-golden text-sm font-bold uppercase tracking-wider">${pkg.duration} · ${pkg.category === 'game' ? 'Game Safari' : pkg.category === 'kilimanjaro' ? 'Kilimanjaro Climb' : 'Special Tour'}</span>
                        <h2 class="text-3xl font-bold serif text-forest mt-1">${pkg.name}</h2>
                        <p class="text-2xl font-bold text-golden mt-2">${pkg.price} <span class="text-sm font-normal text-gray-500">per person</span></p>
                    </div>
                    <p class="text-gray-700">${pkg.fullDesc}</p>
                    <div class="grid sm:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-bold text-forest flex items-center gap-2"><i class="fas fa-list-check text-golden"></i> Itinerary Highlights</h4>
                            <ul class="mt-2 space-y-1 text-sm text-gray-600">
                                ${pkg.itinerary.map(i => `<li class="flex gap-2"><i class="fas fa-chevron-right text-golden text-xs mt-1"></i>${i}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="space-y-3">
                            <div class="bg-green-50 p-4 rounded-xl">
                                <p class="font-bold text-green-700"><i class="fas fa-check-circle mr-1"></i> Included</p>
                                <ul class="text-sm mt-1 list-disc list-inside">${pkg.included.map(i => `<li>${i}</li>`).join('')}</ul>
                            </div>
                            <div class="bg-red-50 p-4 rounded-xl">
                                <p class="font-bold text-red-700"><i class="fas fa-times-circle mr-1"></i> Not Included</p>
                                <ul class="text-sm mt-1 list-disc list-inside">${pkg.notIncluded.map(i => `<li>${i}</li>`).join('')}</ul>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end gap-3 pt-4 border-t">
                        <button onclick="closeModal()" class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Close</button>
                        <button onclick="addToBooking('${pkg.name}'); closeModal()" class="bg-golden hover:bg-amber-500 text-brand-dark font-bold px-8 py-2 rounded-lg shadow">Add to Enquiry</button>
                    </div>
                </div>
            `;
            document.getElementById('safariModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        window.closeModal = function() {
            document.getElementById('safariModal').classList.remove('active');
            document.body.style.overflow = '';
        };

        window.addToBooking = function(name) {
            alert(`"${name}" added to your enquiry! (Demo)`);
        };

        // Category filtering
        document.querySelectorAll('.category-pill').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.category-pill').forEach(b => {
                    b.classList.remove('bg-forest', 'text-white');
                    b.classList.add('bg-gray-100', 'text-gray-700');
                });
                this.classList.remove('bg-gray-100', 'text-gray-700');
                this.classList.add('bg-forest', 'text-white');
                
                const cat = this.dataset.category;
                renderSafaris(cat);
            });
        });

        // Initial render
        renderSafaris('all');

        // Close modal on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });

        // Click outside modal to close
        document.getElementById('safariModal').addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });

    })();


    //footer

document.addEventListener('DOMContentLoaded', function() {
    // 1. Locate the container in the HTML
    const footerContainer = document.getElementById('footer-container');
    
    if (!footerContainer) {
        console.error('Footer generation failed: <div id="footer-container"></div> is missing from the HTML.');
        return;
    }

    // -------------------------------------------
    // ADD FLAT ICON CDN (flaticon uicons) if not already present
    // -------------------------------------------
    function loadFlatIconCDN() {
        // regular-rounded set (used for map-marker, envelope)
        if (!document.querySelector('link[href*="uicons-regular-rounded"]')) {
            const linkRR = document.createElement('link');
            linkRR.rel = 'stylesheet';
            linkRR.href = 'https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css';
            document.head.appendChild(linkRR);
        }
        // brands set (used for WhatsApp contact & social media)
        if (!document.querySelector('link[href*="uicons-brands"]')) {
            const linkBrands = document.createElement('link');
            linkBrands.rel = 'stylesheet';
            linkBrands.href = 'https://cdn-uicons.flaticon.com/uicons-brands/css/uicons-brands.css';
            document.head.appendChild(linkBrands);
        }
    }
    loadFlatIconCDN();

    // -------------------------------------------
    // 2. The Complete Footer HTML Template
    // -------------------------------------------
    const footerHTML = `
        <footer class="bg-[#0f172a] text-slate-300 pt-16 pb-8 border-t-4 border-[#1645aa] relative mt-24 overflow-hidden w-full">
            <div class="absolute top-0 right-0 w-64 h-64 bg-[#1645aa] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 pointer-events-none"></div>

            <div class="w-full px-6 sm:px-12 lg:px-20 2xl:px-32 relative z-10">
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 xl:gap-20 mb-12 border-b border-slate-800 pb-12">
                    
                    <div class="space-y-6">
                        <div class="text-2xl font-black text-white flex items-center gap-2 uppercase tracking-tight">
                            <ion-icon name="compass-outline" class="text-[#facc15] text-3xl"></ion-icon>
                            Kimondo <span class="text-[#facc15]">Adventure</span>
                        </div>
                        <p class="text-sm leading-relaxed text-slate-400">
                            Crafting unforgettable safaris, mountain treks, and beach holidays across Tanzania. Experience the wild heart of Africa with our expert guides and tailored itineraries.
                        </p>
                    </div>

                    <div>
                        <h3 class="text-white font-bold text-lg mb-6 uppercase tracking-wider">Adventures</h3>
                        <ul class="space-y-3">
                            <li><a href="#" class="text-sm hover:text-[#facc15] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#1645aa]"></ion-icon> Serengeti Safaris</a></li>
                            <li><a href="#" class="text-sm hover:text-[#facc15] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#1645aa]"></ion-icon> Mt. Kilimanjaro Treks</a></li>
                            <li><a href="#" class="text-sm hover:text-[#facc15] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#1645aa]"></ion-icon> Zanzibar Beach Tours</a></li>
                            <li><a href="#" class="text-sm hover:text-[#facc15] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#1645aa]"></ion-icon> Day Trips & Excursions</a></li>
                            <li><a href="#" class="text-sm hover:text-[#facc15] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#1645aa]"></ion-icon> Custom Itineraries</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="text-white font-bold text-lg mb-6 uppercase tracking-wider">Information</h3>
                        <ul class="space-y-3">
                            <li><a href="#" class="text-sm hover:text-[#facc15] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#1645aa]"></ion-icon> About Us</a></li>
                            <li><a href="#" class="text-sm hover:text-[#facc15] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#1645aa]"></ion-icon> Booking Terms</a></li>
                            <li><a href="privacy.html" class="text-sm hover:text-[#facc15] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#1645aa]"></ion-icon> Privacy Policy</a></li>
                            <li><a href="#" class="text-sm hover:text-[#facc15] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#1645aa]"></ion-icon> FAQs</a></li>
                            <li><a href="#" class="text-sm hover:text-[#facc15] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#1645aa]"></ion-icon> Contact Us</a></li>
                        </ul>
                    </div>

                    <div class="flex flex-col justify-between">
                        <div>
                            <h3 class="text-white font-bold text-lg mb-6 uppercase tracking-wider">Stay Connected</h3>
                            
                            <div class="space-y-4 text-sm text-slate-400 mb-8">
                                <p class="flex items-center gap-3"><i class="fi fi-rr-map-marker text-[#facc15] text-xl"></i> Tanzania, East Africa</p>
                                <p class="flex items-center gap-3"><i class="fi fi-rr-envelope text-[#facc15] text-xl"></i> booking@kimondoadventure.com</p>
                                <p class="flex items-center gap-3"><i class="fi fi-brands-whatsapp text-[#facc15] text-xl"></i> +255 XXX XXX XXX</p>
                            </div>
                        </div>

                        <!-- SOCIAL MEDIA BUTTONS – ICONS CENTERED WITH leading-none -->
                        <div class="flex gap-4 mt-auto">
                            <a href="#" class="group relative w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-[#1645aa] hover:text-[#facc15] transition-all duration-300 shadow-lg">
                                <i class="fi fi-brands-instagram text-2xl pointer-events-none leading-none"></i>
                                <span class="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-[#0f172a] text-xs font-bold px-2.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md z-50">@KimondoAdventure</span>
                            </a>
                            
                            <a href="#" class="group relative w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-[#1645aa] hover:text-[#facc15] transition-all duration-300 shadow-lg">
                                <i class="fi fi-brands-tik-tok text-2xl pointer-events-none leading-none"></i>
                                <span class="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-[#0f172a] text-xs font-bold px-2.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md z-50">@Kimondo_Safaris</span>
                            </a>
                            
                            <a href="#" class="group relative w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-[#1645aa] hover:text-[#facc15] transition-all duration-300 shadow-lg">
                                <i class="fi fi-brands-facebook text-2xl pointer-events-none leading-none"></i>
                                <span class="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-[#0f172a] text-xs font-bold px-2.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md z-50">Kimondo Adventure Ltd</span>
                            </a>
                            
                            <a href="#" class="group relative w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-[#1645aa] hover:text-[#facc15] transition-all duration-300 shadow-lg">
                                <i class="fi fi-brands-whatsapp text-2xl pointer-events-none leading-none"></i>
                                <span class="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-[#0f172a] text-xs font-bold px-2.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md z-50">Chat with Us</span>
                            </a>
                        </div>
                    </div>

                </div>

                <!-- PRIVACY POLICY & TERMS BETWEEN COPYRIGHT AND POWERED BY -->
                <div class="flex flex-col md:flex-row items-center justify-between text-xs text-white gap-4">
                    <p>&copy; <span id="current-year"></span> Kimondo Adventure. All rights reserved.</p>
                    
                    <div class="flex gap-4">
                        <a href="privacy.html" class="hover:text-[#facc15] text-white transition-colors">Privacy Policy</a>
                        <a href="terms.html" class="hover:text-[#facc15] text-white transition-colors">Terms &amp; Conditions</a>
                    </div>
                    
                    <p>Powered by <a href="#" class="text-[#facc15] hover:text-white transition-colors font-semibold tracking-wide">Africana Tech</a></p>
                </div>
            </div>
        </footer>

        <button id="back-to-top" class="fixed bottom-6 right-6 w-12 h-12 bg-[#facc15] text-[#0f172a] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(250,204,21,0.4)] opacity-0 invisible translate-y-4 transition-all duration-300 z-50 hover:bg-white hover:scale-110">
            <ion-icon name="arrow-up-outline" class="text-2xl font-bold"></ion-icon>
        </button>
    `;

    // 3. Inject the HTML into the page
    footerContainer.innerHTML = footerHTML;

    // 4. Initialize Interactive Logic
    
    // Dynamic Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Back to Top Button Logic
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
                backToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
            } else {
                backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
                backToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});//

//footer 2//
document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.getElementById('kimondo-footer');
    
    if (!footerContainer) {
        console.warn('Footer container with id "kimondo-footer" not found.');
        return;
    }

    const currentYear = new Date().getFullYear();

    const footerHTML = `
        <footer class="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-amber-500">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    
                    <div>
                        <h2 class="text-2xl font-bold text-white mb-4 tracking-wide uppercase">
                            Kimondo <span class="text-amber-500">Adventures</span>
                        </h2>
                        <p class="text-sm leading-relaxed text-slate-400 mb-6">
                            Crafting unforgettable safari experiences, mountain treks, and cultural journeys across Tanzania. Let us guide you to the wild heart of Africa.
                        </p>
                        <div class="flex space-x-4">
                            <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors duration-300">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                            </a>
                            <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors duration-300">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path></svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h3>
                        <ul class="space-y-3">
                            <li><a href="#" class="text-sm hover:text-amber-500 transition-colors flex items-center gap-2"><span>&rarr;</span> About Us</a></li>
                            <li><a href="#" class="text-sm hover:text-amber-500 transition-colors flex items-center gap-2"><span>&rarr;</span> Our Team</a></li>
                            <li><a href="#" class="text-sm hover:text-amber-500 transition-colors flex items-center gap-2"><span>&rarr;</span> Travel Information</a></li>
                            <li><a href="#" class="text-sm hover:text-amber-500 transition-colors flex items-center gap-2"><span>&rarr;</span> Booking Terms</a></li>
                            <li><a href="#" class="text-sm hover:text-amber-500 transition-colors flex items-center gap-2"><span>&rarr;</span> Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="text-lg font-bold text-white mb-6 uppercase tracking-wider">Adventures</h3>
                        <ul class="space-y-3">
                            <li><a href="#" class="text-sm hover:text-amber-500 transition-colors flex items-center gap-2"><span>&rarr;</span> Serengeti Safaris</a></li>
                            <li><a href="#" class="text-sm hover:text-amber-500 transition-colors flex items-center gap-2"><span>&rarr;</span> Kilimanjaro Climbing</a></li>
                            <li><a href="#" class="text-sm hover:text-amber-500 transition-colors flex items-center gap-2"><span>&rarr;</span> Zanzibar Beaches</a></li>
                            <li><a href="#" class="text-sm hover:text-amber-500 transition-colors flex items-center gap-2"><span>&rarr;</span> Ngorongoro Crater</a></li>
                            <li><a href="#" class="text-sm hover:text-amber-500 transition-colors flex items-center gap-2"><span>&rarr;</span> Day Excursions</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="text-lg font-bold text-white mb-6 uppercase tracking-wider">Get In Touch</h3>
                        <ul class="space-y-4 text-sm text-slate-400">
                            <li class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span>Arusha, Tanzania<br>East Africa</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                <span>+255 (0) 123 456 789</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                <span>info@kimondoadventures.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                    <p>&copy; ${currentYear} Kimondo Adventures. All rights reserved.</p>
                    <p class="mt-4 md:mt-0">Designed by <a href="#" class="text-amber-500 hover:text-white transition-colors font-medium">Africana Tech</a></p>
                </div>

            </div>
        </footer>
    `;

    footerContainer.innerHTML = footerHTML;
});