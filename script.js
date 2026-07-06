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

// 4. Translation Dictionary (English only – no language switcher)
const translations = {
    en: {
        location: "Zanzibar, Tanzania",
        tagline: "Tech & Branding Authority",
        navHome: "Home",
        navZanzibar: "Zanzibar Tours",
        navSafari: "Tanzania Safaris",
        navTrekking: "Trekking",
        navShop: "Gift Shop",
        navGallery: "Gallery",
        navContact: "Contact",
        navMyBooking: "My Booking",
        navAbout: "About Us",
        navWhy: "Why Choose Us",
        navGetInvolved: "Get Involved",
        navBlog: "Blog",
        navPrivacy: "Privacy",
        navFaqs: "FAQs",
        navTerms: "Terms"
    }
};

// 5. Navigation Links (main header – excludes My Booking because it's a button)
const navLinksMain = [
    { name: 'Home', url: 'index.html', i18n: 'navHome' },
    { name: 'Zanzibar Tours', url: 'zanzibar.html', i18n: 'navZanzibar' },
    { name: 'Tanzania Safaris', url: 'tanzania.html', i18n: 'navSafari' },
    { name: 'Trekking', url: 'trecking.html', i18n: 'navTrekking' },
    { name: 'Gift Shop', url: 'gift shop.html', i18n: 'navShop' },
    { name: 'Gallery', url: 'gallery.html', i18n: 'navGallery' },
    { name: 'Contact', url: 'contact.html', i18n: 'navContact' }
];

const bookingLink = { name: 'My Booking', url: 'booking.html', i18n: 'navMyBooking' };

// 6. Info header right-side links
const infoLinks = [
    { name: 'About Us', url: 'about us.html', i18n: 'navAbout' },
    { name: 'Why Choose Us', url: 'why choose.html', i18n: 'navWhy' },
    { name: 'Get Involved', url: 'involve.html', i18n: 'navGetInvolved' },
    { name: 'Blog', url: 'blog.html', i18n: 'navBlog' },
    { name: 'FAQs', url: 'fqs.html', i18n: 'navFaqs' },
    { name: 'Privacy', url: 'privacy.html', i18n: 'navPrivacy' },
    { name: 'Terms', url: 'terms.html', i18n: 'navTerms' }
];

// 7. Build Header HTML
function buildHeaderHTML() {
    const t = translations.en;

    const desktopLinksHTML = navLinksMain.map(link => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const isActive = decodeURIComponent(currentPage) === decodeURIComponent(link.url);
        const baseClasses = "transition-colors duration-300 text-[13px] xl:text-sm 2xl:text-base tracking-wide whitespace-nowrap px-1.5 xl:px-2 2xl:px-3";
        const stateClasses = isActive
            ? "text-forest font-bold underline underline-offset-4 decoration-2"
            : "text-warm font-medium hover:text-forest";
        return `<a href="${link.url}" class="${baseClasses} ${stateClasses}" data-i18n="${link.i18n}">${t[link.i18n]}</a>`;
    }).join('');

    // Mobile navigation links – My Booking as a golden button
    const mobileNavLinks = [...navLinksMain, bookingLink];
    const mobileLinksHTML = mobileNavLinks.map(link => {
        // My Booking button styling
        if (link === bookingLink) {
            return `
            <a href="${link.url}" class="relative block mx-4 my-2 bg-golden hover:bg-yellow-500 text-white px-6 py-3 rounded-md font-semibold tracking-wider shadow-sm transition-colors duration-300 text-center whitespace-nowrap" data-i18n="${link.i18n}">
                <span>${t[link.i18n]}</span>
                <span data-booking-count class="hidden absolute -top-2 -right-2 min-w-[1.2rem] h-6 rounded-full bg-forest text-[10px] font-bold text-white flex items-center justify-center px-1.5">0</span>
            </a>`;
        }
        // Regular links
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const isActive = decodeURIComponent(currentPage) === decodeURIComponent(link.url);
        const baseClasses = "block px-6 py-3 transition-colors duration-300 border-b border-gray-100 whitespace-nowrap";
        const stateClasses = isActive
            ? "text-forest font-bold underline underline-offset-4 decoration-2"
            : "text-warm font-medium hover:bg-forest hover:text-white";
        return `<a href="${link.url}" class="${baseClasses} ${stateClasses}" data-i18n="${link.i18n}">${t[link.i18n]}</a>`;
    }).join('');

    const infoRightHTML = infoLinks.map(link => {
        const baseClasses = "text-xs font-medium tracking-wide text-white/90 hover:text-golden transition-colors whitespace-nowrap";
        return `<a href="${link.url}" class="${baseClasses}">${t[link.i18n]}</a>`;
    }).join(' <span class="text-white/40">|</span> ');

    return `
    <header class="bg-white shadow-md fixed w-full top-0 z-[9999]">
        
        <!-- ===== INFO HEADER (centered on mobile, between on desktop) ===== -->
        <div class="bg-gradient-to-r from-warm to-choco text-white py-2 md:py-3">
            <div class="w-full px-2 lg:px-4 flex flex-row items-center justify-center lg:justify-between flex-nowrap">
                <div class="flex flex-row items-center gap-3 md:gap-6 text-[13px] font-medium whitespace-nowrap overflow-x-auto hide-scrollbar">
                    <a href="https://maps.google.com/?q=Dar+es+Salaam" target="_blank" class="flex items-center gap-2 hover:text-golden transition-colors group">
                        <i class="fa-solid fa-location-dot text-golden text-base group-hover:scale-110 transition-transform"></i>
                        <span class="hidden sm:inline">${t.location}</span>
                        <span class="sm:hidden">Zanzibar Tanzania</span>
                    </a>
                    <a href="https://wa.me/255658840425" target="_blank" class="flex items-center gap-2 hover:text-golden transition-colors group">
                        <i class="fa-brands fa-whatsapp text-green-400 text-[18px] group-hover:scale-110 transition-transform"></i>
                        <span class="inline">+255 65 884 0425</span>
                    </a>
                    <a href="mailto:hello@kimondoadventures.com" class="hidden md:flex items-center gap-2 hover:text-golden transition-colors group">
                        <i class="fa-solid fa-envelope text-golden text-base group-hover:scale-110 transition-transform"></i>
                        <span>hello@kimondoadventures.com</span>
                    </a>
                </div>
                
                <div class="hidden lg:flex items-center gap-3 lg:gap-5 flex-shrink-0 ml-4">
                    ${infoRightHTML}
                </div>
            </div>
        </div>

        <!-- ===== MAIN HEADER ===== -->
        <div class="w-full px-2 lg:px-4 flex items-center justify-between py-3 md:py-5">
            
            <div class="flex-shrink-0">
                <a href="index.html" class="text-2xl md:text-2xl lg:text-3xl font-serif font-bold text-forest flex items-center gap-2 whitespace-nowrap">
                    Kimondo <span class="text-golden italic">Adventures</span>
                </a>
            </div>

            <nav class="hidden xl:flex items-center justify-center flex-1 min-w-0 gap-0.5 2xl:gap-4 px-2">
                ${desktopLinksHTML}
            </nav>

            <div class="hidden xl:flex items-center flex-shrink-0">
                <a href="${bookingLink.url}" class="relative bg-golden hover:bg-yellow-500 text-white px-5 xl:px-6 py-2 xl:py-3 rounded-md font-semibold tracking-wider shadow-md transition-all duration-300 transform hover:-translate-y-0.5 text-sm xl:text-base whitespace-nowrap" data-i18n="${bookingLink.i18n}">
                    <span>${t[bookingLink.i18n]}</span>
                    <span data-booking-count class="hidden absolute -top-2 -right-2 min-w-[1.2rem] h-6 rounded-full bg-forest text-[10px] font-bold text-white flex items-center justify-center px-1.5">0</span>
                </a>
            </div>

            <div class="xl:hidden flex-shrink-0">
                <button id="mobile-menu-btn" class="text-forest hover:text-golden focus:outline-none p-2">
                    <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path id="menu-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
            </div>
        </div>

        <div id="mobile-menu" class="hidden xl:hidden bg-white border-r border-b border-t border-gray-100 shadow-xl absolute font-sans top-full left-0 w-max rounded-br-2xl overflow-hidden">
            <div class="flex flex-col py-2">
                ${mobileLinksHTML}
            </div>
        </div>
    </header>
    `;
}

// 8. Initialization on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById('kimondo-header');
    if (!headerContainer) return;

    headerContainer.innerHTML = buildHeaderHTML();

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

// Only initialize lightbox functions if lightbox elements exist
const hasLightbox = lightbox && lightboxImg;

// --- INITIALIZATION ---
function initGallery() {
    // Exit early if gallery elements don't exist on this page
    if (!filterContainer || !galleryGrid) {
        return;
    }

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
    if (!hasLightbox) return;
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
    if (!hasLightbox) return;
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
    if (!hasLightbox) return;
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
if (hasLightbox) {
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') closeLightbox(null);
            if (e.key === 'ArrowRight') navigateLightbox(1, e);
            if (e.key === 'ArrowLeft') navigateLightbox(-1, e);
        }
    });
}







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
    if (!grid) return;

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
    if (cartCountSpan) cartCountSpan.innerText = cartCount;
    showToast(`✨ ${itemName} added to cart! (${price})`);
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'bg-dark text-white px-5 py-2 rounded-full shadow-lg text-sm toast';
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}



//booking cart management//

const bookingStorageKey = 'kimondoBookingItems';
let bookingCart = [];
let bookingToastTimer = null;

function normalizePrice(value) {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return 0;
    const parsed = parseFloat(value.replace(/[^0-9.]/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
}

function loadBookingCart() {
    try {
        const stored = localStorage.getItem(bookingStorageKey);
        if (!stored) return [];
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.warn('Error loading booking cart:', error);
        return [];
    }
}

function saveBookingCart(cart) {
    try {
        const items = Array.isArray(cart) ? cart : [];
        localStorage.setItem(bookingStorageKey, JSON.stringify(items));
        bookingCart = items;
        updateBookingIndicator();
    } catch (error) {
        console.warn('Error saving booking cart:', error);
    }
}

function updateBookingIndicator() {
    const count = bookingCart.reduce((sum, item) => sum + (item.quantity || item.adults || 1), 0);
    const badges = document.querySelectorAll('[data-booking-count]');
    badges.forEach(badge => {
        badge.textContent = count;
        if (count > 0) {
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    });
}

function ensureToastContainer() {
    let container = document.getElementById('kimondo-booking-toast-container');
    if (container) return container;

    container = document.createElement('div');
    container.id = 'kimondo-booking-toast-container';
    container.style.position = 'fixed';
    container.style.right = '20px';
    container.style.bottom = '20px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'flex-end';
    container.style.gap = '0.75rem';
    container.style.zIndex = '99999';
    container.style.pointerEvents = 'none';
    container.style.maxWidth = 'min(92vw, 400px)';
    document.body.appendChild(container);
    return container;
}

function showBookingToast(message, type = 'success') {
    const container = ensureToastContainer();
    container.querySelectorAll('.booking-toast').forEach(toast => toast.remove());

    if (bookingToastTimer) {
        clearTimeout(bookingToastTimer);
        bookingToastTimer = null;
    }

    const isWarning = type === 'warning';
    const toast = document.createElement('div');
    toast.className = 'booking-toast';
    toast.style.cssText = [
        'display:flex',
        'align-items:center',
        'gap:0.65rem',
        'padding:0.85rem 1.15rem',
        'border-radius:9999px',
        'font-weight:700',
        'font-size:0.95rem',
        'line-height:1.4',
        'box-shadow:0 10px 24px rgba(0, 0, 0, 0.2)',
        'border:1px solid ' + (isWarning ? '#B91C1C' : '#1B5E20'),
        'background:' + (isWarning ? '#DC2626' : '#2E7D32'),
        'color:#ffffff',
        'pointer-events:none',
        'opacity:1',
        'transform:translateY(0)',
        'transition:opacity 0.25s ease, transform 0.25s ease'
    ].join(';') + ';';
    toast.innerHTML = `<div class="flex items-center gap-2"><i class="fa-solid ${isWarning ? 'fa-triangle-exclamation' : 'fa-check-circle'}"></i><span>${message}</span></div>`;
    container.appendChild(toast);

    bookingToastTimer = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(8px)';
        setTimeout(() => toast.remove(), 250);
    }, 2800);
}

window.showBookingToast = showBookingToast;
window.showToast = showBookingToast;

function addToBooking(item) {
    if (!item || !item.name) return false;

    const normalized = {
        id: item.id ? String(item.id) : String(item.name).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/gi, ''),
        name: String(item.name),
        description: item.description ? String(item.description) : '',
        image: item.image ? String(item.image) : '',
        img: item.img ? String(item.img) : '',
        type: item.type ? String(item.type) : 'activity',
        price: String(item.price ?? ''),
        basePrice: normalizePrice(item.price),
        options: item.options || {},
        date: '',
        adults: 1,
        bookingType: 'guest',
        vehicle: '1 - 4 Pax = Noah / Alphard',
        tripType: 'one-way',
        quantity: Number.isInteger(item.quantity) && item.quantity > 0 ? item.quantity : 1
    };

    const currentItems = loadBookingCart();
    const existing = currentItems.find(existingItem => {
        const sameId = Boolean(normalized.id && existingItem.id && existingItem.id === normalized.id);
        const sameNameType = existingItem.name === normalized.name && existingItem.type === normalized.type;
        return sameId || sameNameType;
    });

    if (existing) {
        showBookingToast('This activity already exists in your cart.', 'warning');
        return false;
    }

    currentItems.push(normalized);
    saveBookingCart(currentItems);
    showBookingToast(`${normalized.name} added to your cart.`, 'success');
    if (typeof window.renderCart === 'function') {
        window.renderCart();
    } else {
        renderBookingPageCart();
    }
    return true;
}

window.addToBooking = addToBooking;
window.addToBookingItem = function (id, name, description, price, img, type) {
    addToBooking({ id, name, description, image: img, img, price, type });
};

function renderBookingPageCart() {
    const container = document.getElementById('booking-items-container');
    if (!container) return;

    let html = '';
    let subtotal = 0;

    if (bookingCart.length === 0) {
        html = `
            <div class="rounded-3xl border border-dashed border-warm/30 bg-warm/5 p-8 text-center text-warm/70">
                Your booking cart is empty. Browse safaris and experiences to add them here.
            </div>`;
    } else {
        bookingCart.forEach((item) => {
            const itemTotal = normalizePrice(item.price) * (item.quantity || 1);
            subtotal += itemTotal;
            const imgSrc = item.image || item.img || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=240&q=80';
            html += `
                <div class="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-light rounded-xl border border-warm/5" data-item-id="${item.id}">
                    <img src="${imgSrc}" alt="${item.name}" class="w-20 h-20 rounded-xl object-cover shrink-0">
                    <div class="flex-1">
                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                            <div>
                                <h4 class="font-semibold text-forest">${item.name}</h4>
                                <p class="text-xs text-warm/50">${item.description || item.type}</p>
                            </div>
                            <div class="flex items-center gap-3 mt-2 sm:mt-0">
                                <div class="flex items-center border border-warm/20 rounded-full">
                                    <button class="px-2.5 py-1 text-warm/50 hover:text-warm" onclick="updateBookingQuantity('${item.id}', -1)">−</button>
                                    <span class="px-2 text-sm font-semibold">${item.quantity || 1}</span>
                                    <button class="px-2.5 py-1 text-warm/50 hover:text-warm" onclick="updateBookingQuantity('${item.id}', 1)">+</button>
                                </div>
                                <span class="font-bold text-forest min-w-[60px] text-right">$${itemTotal.toLocaleString()}</span>
                                <button class="text-warm/30 hover:text-red-500 remove-item" onclick="removeBookingItem('${item.id}')"><i class="fa-solid fa-trash-can"></i></button>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
    }

    container.innerHTML = html;
    const subtotalEl = document.getElementById('subtotal');
    const summarySubtotalEl = document.getElementById('summary-subtotal');
    const totalEl = document.getElementById('summary-total');
    const total = subtotal + 180;

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString()}`;
    if (summarySubtotalEl) summarySubtotalEl.textContent = `$${subtotal.toLocaleString()}`;
    if (totalEl) totalEl.textContent = `$${total.toLocaleString()}`;
}

window.updateBookingQuantity = function (itemId, change) {
    const item = bookingCart.find(i => i.id === itemId);
    if (!item) return;
    item.quantity = Math.max(1, (item.quantity || 1) + change);
    saveBookingCart(bookingCart);
    renderBookingPageCart();
};

window.removeBookingItem = function (itemId) {
    const index = bookingCart.findIndex(i => i.id === itemId);
    if (index === -1) return;
    bookingCart.splice(index, 1);
    saveBookingCart(bookingCart);
    renderBookingPageCart();
};

function initBookingCart() {
    bookingCart = loadBookingCart();
    updateBookingIndicator();
    renderBookingPageCart();
    if (!document.getElementById('toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'fixed inset-x-0 bottom-5 z-[9999] flex flex-col items-center gap-3 px-4 pointer-events-none';
        document.body.appendChild(toastContainer);
    }
}

document.addEventListener('DOMContentLoaded', initBookingCart);






//footer 2//

document.addEventListener('DOMContentLoaded', function () {
    const footerContainer = document.getElementById('footer-container');

    if (!footerContainer) {
        console.error('Footer generation failed: <div id="footer-container"></div> is missing from the HTML.');
        return;
    }

    // -------------------------------------------
    // ADD IONICONS CDN (for footer icons)
    // -------------------------------------------
    if (!document.querySelector('script[src*="ionicons"]')) {
        const ionIconScript = document.createElement('script');
        ionIconScript.src = 'https://unpkg.com/ionicons@7/dist/ionicons/ionicons.esm.js';
        ionIconScript.type = 'module';
        document.head.appendChild(ionIconScript);

        const ionIconNoModule = document.createElement('script');
        ionIconNoModule.src = 'https://unpkg.com/ionicons@7/dist/ionicons/ionicons.js';
        ionIconNoModule.noModule = true;
        document.head.appendChild(ionIconNoModule);
    }

    // -------------------------------------------
    // ADD FLAT ICON CDN (flaticon uicons)
    // -------------------------------------------
    function loadFlatIconCDN() {
        if (!document.querySelector('link[href*="uicons-regular-rounded"]')) {
            const linkRR = document.createElement('link');
            linkRR.rel = 'stylesheet';
            linkRR.href = 'https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css';
            document.head.appendChild(linkRR);
        }
        if (!document.querySelector('link[href*="uicons-brands"]')) {
            const linkBrands = document.createElement('link');
            linkBrands.rel = 'stylesheet';
            linkBrands.href = 'https://cdn-uicons.flaticon.com/uicons-brands/css/uicons-brands.css';
            document.head.appendChild(linkBrands);
        }
    }
    loadFlatIconCDN();

    // -------------------------------------------
    // NEW FOOTER HTML (deep forest background, 6 columns)
    // -------------------------------------------
    const footerHTML = `
        <footer class="bg-[#0f2a24] text-slate-300 pt-16 pb-8 border-t-4 border-[#d4a853] relative mt-24 overflow-hidden w-full">
            <div class="absolute top-0 right-0 w-64 h-64 bg-[#d4a853] rounded-full mix-blend-multiply filter blur-[100px] opacity-10 pointer-events-none"></div>

            <div class="w-full px-6 sm:px-12 lg:px-20 2xl:px-32 relative z-10">
                
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-10 xl:gap-8 mb-12 border-b border-white/10 pb-12">
                    
                    <!-- Col 1: About Kimondo -->
                    <div class="space-y-6">
                    <h3 class="text-white font-bold text-lg mb-6 uppercase tracking-wider">About Kimondo</h3>
                       
                        <p class="text-sm leading-relaxed text-white/60">
                            Crafting unforgettable safaris, mountain treks, and beach holidays across Tanzania. Experience the wild heart of Africa with our expert guides and tailored itineraries.
                        </p>
                    </div>

                    <!-- Col 2: Quick Links -->
                    <div>
                        <h3 class="text-white font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h3>
                        <ul class="space-y-3">
                            <li><a href="index.html" class="text-sm hover:text-[#d4a853] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#d4a853]"></ion-icon> Home</a></li>
                            <li><a href="about us.html" class="text-sm hover:text-[#d4a853] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#d4a853]"></ion-icon> About Us</a></li>
                            <li><a href="involve.html" class="text-sm hover:text-[#d4a853] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#d4a853]"></ion-icon> Get Involved</a></li>
                            <li><a href="blog.html" class="text-sm hover:text-[#d4a853] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#d4a853]"></ion-icon> Blog</a></li>
                            <li><a href="contact.html" class="text-sm hover:text-[#d4a853] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#d4a853]"></ion-icon> Contact Us</a></li>
                        </ul>
                    </div>

                    <!-- Col 3: Zanzibar Tours -->
                    <div>
                        <h3 class="text-white font-bold text-lg mb-6 uppercase tracking-wider">Zanzibar Tours</h3>
                        <ul class="space-y-3">
                            <li><a href="#" class="text-sm hover:text-[#d4a853] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#d4a853]"></ion-icon> Water Sports</a></li>
                            <li><a href="#" class="text-sm hover:text-[#d4a853] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#d4a853]"></ion-icon> Safari Blue Cruise</a></li>
                            <li><a href="#" class="text-sm hover:text-[#d4a853] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#d4a853]"></ion-icon> Ocean Encounters</a></li>
                            <li><a href="#" class="text-sm hover:text-[#d4a853] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#d4a853]"></ion-icon> Cultural Gems</a></li>
                            <li><a href="#" class="text-sm hover:text-[#d4a853] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#d4a853]"></ion-icon> Luxury Moments</a></li>
                        </ul>
                    </div>

                    <!-- Col 4: Tanzania Safaris -->
                    <div>
                        <h3 class="text-white font-bold text-lg mb-6 uppercase tracking-wider">Tanzania Safaris</h3>
                        <ul class="space-y-3">
                            <li><a href="#" class="text-sm hover:text-[#d4a853] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#d4a853]"></ion-icon> Serengeti</a></li>
                            <li><a href="#" class="text-sm hover:text-[#d4a853] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#d4a853]"></ion-icon> Ngorongoro</a></li>
                            <li><a href="#" class="text-sm hover:text-[#d4a853] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#d4a853]"></ion-icon> Tarangire</a></li>
                            <li><a href="#" class="text-sm hover:text-[#d4a853] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#d4a853]"></ion-icon> Lake Manyara</a></li>
                            <li><a href="#" class="text-sm hover:text-[#d4a853] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#d4a853]"></ion-icon> Mikumi</a></li>
                        </ul>
                    </div>

                    <!-- Col 5: Trekking -->
                    <div>
                        <h3 class="text-white font-bold text-lg mb-6 uppercase tracking-wider">Trekking</h3>
                        <ul class="space-y-3">
                            <li><a href="#" class="text-sm hover:text-[#d4a853] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#d4a853]"></ion-icon> Machame Route</a></li>
                            <li><a href="#" class="text-sm hover:text-[#d4a853] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#d4a853]"></ion-icon> Marangu Route</a></li>
                            <li><a href="#" class="text-sm hover:text-[#d4a853] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#d4a853]"></ion-icon> Lemosho Route</a></li>
                            <li><a href="#" class="text-sm hover:text-[#d4a853] transition-colors flex items-center gap-2"><ion-icon name="chevron-forward" class="text-[#d4a853]"></ion-icon> Mount Meru</a></li>
                        </ul>
                    </div>

                    <!-- Col 6: Stay Connected -->
                    <div class="flex flex-col justify-between">
                        <div>
                            <h3 class="text-white font-bold text-lg mb-6 uppercase tracking-wider">Stay Connected</h3>
                            <div class="space-y-4 text-sm text-white/60 mb-8">
                                <p class="flex items-center gap-3"><i class="fi fi-rr-map-marker text-[#d4a853] text-xl"></i> Tanzania, East Africa</p>
                                <p class="flex items-center gap-3"><i class="fi fi-rr-envelope text-[#d4a853] text-xl"></i> hello@kimondoadventures.com</p>
                                <p class="flex items-center gap-3"><i class="fi fi-brands-whatsapp text-[#d4a853] text-xl"></i> +255 65 884 0425</p>
                            </div>
                        </div>

                        <div class="flex gap-4 mt-auto">
                            <a href="#" class="group relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#d4a853] hover:text-[#0f2a24] transition-all duration-300">
                                <i class="fi fi-brands-instagram text-lg pointer-events-none leading-none"></i>
                            </a>
                            <a href="#" class="group relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#d4a853] hover:text-[#0f2a24] transition-all duration-300">
                                <i class="fi fi-brands-tik-tok text-lg pointer-events-none leading-none"></i>
                            </a>
                            <a href="#" class="group relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#d4a853] hover:text-[#0f2a24] transition-all duration-300">
                                <i class="fi fi-brands-facebook text-lg pointer-events-none leading-none"></i>
                            </a>
                            <a href="https://wa.me/255658840425" class="group relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#d4a853] hover:text-[#0f2a24] transition-all duration-300">
                                <i class="fi fi-brands-whatsapp text-lg pointer-events-none leading-none"></i>
                            </a>
                        </div>
                    </div>

                </div>

                <!-- Bottom bar -->
                <div class="flex flex-col md:flex-row items-center justify-between text-xs text-white/70 gap-4">
                    <p>&copy; <span id="current-year"></span> Kimondo Adventure. All rights reserved.</p>
                    
                    <div class="flex gap-4">
                        <a href="privacy.html" class="hover:text-[#d4a853] transition-colors">Privacy Policy</a>
                        <a href="terms.html" class="hover:text-[#d4a853] transition-colors">Terms &amp; Conditions</a>
                    </div>
                    
                    <p>Powered by <a href="#" class="text-[#d4a853] hover:text-white transition-colors font-semibold tracking-wide">Africana Tech</a></p>
                </div>
            </div>
        </footer>

        <button id="back-to-top" class="fixed bottom-6 right-6 w-12 h-12 bg-[#d4a853] text-[#0f2a24] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(212,168,83,0.4)] opacity-0 invisible translate-y-4 transition-all duration-300 z-50 hover:bg-white hover:scale-110">
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
});