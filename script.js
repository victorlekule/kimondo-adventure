/* ============================================
   MAIN HEADER & NAVIGATION - All Pages
   Functions: Header creation, mobile menu toggle
   ============================================ */

// 0. Inject Global Utility Styles
const globalStyles = document.createElement('style');
globalStyles.textContent = `
    /* Line clamp utilities - with vendor prefix support for compatibility */
    .line-clamp-2 { 
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-clamp: 2;
    }
    
    .line-clamp-3 { 
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-clamp: 3;
    }
    
    .line-clamp-4 { 
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-clamp: 4;
    }
`;
document.head.appendChild(globalStyles);

// 1. Inject Luxury Google Fonts (Playfair Display & Montserrat)
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// 2. Configure Tailwind CSS via JavaScript
window.tailwind.config = {
    theme: {
        extend: {
            colors: {
                forest: '#2E7D32',
                golden: '#F5A623',
                choco: '#6D3A1F',
                turquoise: '#00BCD4',
                warm: '#5D4037'
            },
            fontFamily: {
                // Set Montserrat as default for UI and Playfair for elegant branding
                sans: ['Montserrat', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
            }
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // 3. Define the Navigation Links
    const navLinks = [
        { name: 'Home', url: 'index.html' },
        { name: 'About Us', url: 'about us.html' },
        { name: 'Why Us ', url: 'why choose.html' },
        { name: 'Zanzibar Tours', url: 'zanzibar.html' },
        { name: 'Tanzania Safaris', url: 'tanzania.html' },
        { name: 'Gift Shop', url: 'gift shop.html' },
        { name: 'Gallery', url: 'gallery.html' },
        { name: 'Blog', url: 'blog.html' },
        { name: 'Contact', url: 'contact.html' }
    ];
    
    const bookingLink = { name: 'Booking', url: 'booking.html' };

    // Get current page filename, decode it (to handle spaces like %20), default to index.html
    let currentPage = window.location.pathname.split('/').pop();
    if (!currentPage || currentPage === '') {
        currentPage = 'index.html';
    } else {
        currentPage = decodeURIComponent(currentPage);
    }

    // 4. Build Links with Active State Logic
    const desktopLinksHTML = navLinks.map(link => {
        const isActive = currentPage === link.url;
        const baseClasses = "transition-colors duration-300 text-xs sm:text-sm lg:text-sm xl:text-base tracking-wide whitespace-nowrap";
        
        // Apply forest, bold, and underline if active
        const stateClasses = isActive 
            ? "text-forest font-bold underline underline-offset-3 decoration-1.5" 
            : "text-warm font-medium hover:text-forest";

        return `<a href="${link.url}" class="${baseClasses} ${stateClasses}">${link.name}</a>`;
    }).join('');

    const mobileLinksHTML = navLinks.map(link => {
        const isActive = currentPage === link.url;
        const baseClasses = "block px-4 py-3 transition-colors duration-300 text-sm border-b border-gray-100";
        
        // Apply forest, bold, and underline if active
        const stateClasses = isActive 
            ? "text-forest font-bold underline underline-offset-2 decoration-1.5" 
            : "text-warm font-medium hover:bg-forest/5 hover:text-forest";

        return `<a href="${link.url}" class="${baseClasses} ${stateClasses}">${link.name}</a>`;
    }).join('');

    // 5. Create the Complete Header HTML Structure
    const headerHTML = `
        <header class="bg-white shadow-md fixed w-full top-0 z-50">
            <div class="w-full px-3 sm:px-4 md:px-6 lg:px-8">
                <div class="flex justify-between items-center h-20 md:h-24">
                    
                    <div class="flex-shrink-0 flex items-center">
                        <a href="index.html" class="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-serif font-bold text-forest flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                            Kimondo <span class="text-golden italic">Adventures</span>
                        </a>
                    </div>

                    <nav class="hidden lg:flex items-center justify-end gap-4 xl:gap-6 ml-auto">
                        ${desktopLinksHTML}
                        <a href="${bookingLink.url}" class="bg-golden hover:bg-yellow-500 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-md font-semibold text-xs lg:text-sm xl:text-base tracking-wider shadow-md transition-all duration-300 transform hover:-translate-y-0.5 ml-2 lg:ml-4 flex-shrink-0">
                            ${bookingLink.name}
                        </a>
                    </nav>

                    <div class="lg:hidden flex items-center justify-end flex-grow gap-2">
                        <button id="mobile-menu-btn" class="text-forest hover:text-golden focus:outline-none p-2 -mr-2 flex-shrink-0">
                            <svg class="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path id="menu-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>

                </div>
            </div>

            <div id="mobile-menu" class="hidden lg:hidden bg-white border-b border-gray-100 shadow-lg font-sans">
                <div class="flex flex-col max-h-96 overflow-y-auto py-2">
                    ${mobileLinksHTML}
                    <div class="px-4 py-4">
                        <a href="${bookingLink.url}" class="block text-center bg-golden hover:bg-yellow-500 text-white px-6 py-3 rounded-md font-semibold text-sm tracking-wider shadow-sm transition-colors duration-300">
                            ${bookingLink.name}
                        </a>
                    </div>
                </div>
            </div>
        </header>
    `;

    // 6. Inject HTML
    document.getElementById('kimondo-header').innerHTML = headerHTML;

    // 7. Mobile Menu Logic
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16'); 
        } else {
            menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12'); 
        }
    });
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

/* ============================================
   GALLERY PAGE - JavaScript
   Functions: Gallery initialization, filtering, lightbox management
   ============================================ */

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
   BLOG PAGE - JavaScript
   Functions: Blog posts data, modal management, reveal animations
   ============================================ */

// --- BLOG DATA ---
const blogPosts = [
    {
        id: 1,
        category: "Travel Guide",
        title: "Ultimate Zanzibar Travel Guide (2026 Edition)",
        excerpt: "Zanzibar is one of Africa's most breathtaking destinations. Whether you're visiting for relaxation, adventure, or romance, this guide will help you plan the perfect trip.",
        image: "IMG/1 (7).jpg",
        fullContent: `
            <p class="text-xl font-light text-warm/80 mb-8 border-l-4 border-golden pl-6">Zanzibar is one of Africa's most breathtaking destinations, known for its white sandy beaches, turquoise waters, rich culture, and unforgettable experiences. Whether you're visiting for relaxation, adventure, or romance, this guide will help you plan the perfect trip.</p>
            
            <h3>Where is Zanzibar?</h3>
            <p>Zanzibar is a tropical island located off the coast of Tanzania in East Africa, surrounded by the Indian Ocean. It is a semi-autonomous region with a unique blend of African, Arab, and Indian influences.</p>
            
            <div class="my-10">
                <img src="IMG/1 (13).jpg" alt="Clear Kayak" class="w-full h-80 object-cover rounded-2xl shadow-md">
                <p class="text-sm text-center text-warm/50 mt-3 font-serif italic">Crystal clear waters perfect for kayaking.</p>
            </div>

            <h3>Top Things To Do</h3>
            <p>Don't leave the island without experiencing these highlights:</p>
            <ul>
                <li>Clear Kayak Experience</li>
                <li>Safari Blue Ocean Adventure</li>
                <li>Stone Town Historical Tour</li>
                <li>Spice Farm Tasting Tour</li>
                <li>Sunset Dhow Cruise</li>
                <li>Jozani Forest Visit</li>
            </ul>
            
            <h3>Best Beaches in Zanzibar</h3>
            <ul>
                <li><strong>Nungwi & Kendwa:</strong> Best for sunsets, swimming at all tides, and nightlife.</li>
                <li><strong>Paje & Jambiani:</strong> Perfect for kitesurfing and a younger, vibrant crowd.</li>
                <li><strong>Matemwe:</strong> Quiet, relaxing, and close to the famous Mnemba Atoll for diving.</li>
            </ul>
            
            <h3>Travel Tips</h3>
            <ul>
                <li><strong>Currency:</strong> Tanzanian Shilling (TZS). USD is widely accepted, but ensure notes are printed after 2013.</li>
                <li><strong>Language:</strong> Swahili & English.</li>
                <li><strong>Transport:</strong> Taxis, pre-arranged transfers, or private tours are recommended over public transit (daladalas) for comfort.</li>
            </ul>
            
            <div class="mt-12 p-8 bg-forest/5 rounded-3xl border border-forest/10 text-center">
                <h4 class="font-serif text-2xl text-forest font-bold mb-4">Ready to go?</h4>
                <p class="mb-6 text-warm/70">Planning your trip with the right team makes all the difference.</p>
                <a href="#" class="inline-block bg-golden hover:bg-amber-400 text-dark font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-md">Book your experience today</a>
            </div>
        `
    },
    {
        id: 2,
        category: "Top 10",
        title: "Top 10 Things To Do in Zanzibar",
        excerpt: "If you're visiting Zanzibar, these are the top 10 must-do experiences you shouldn't miss. From Stone Town to the deep blue sea.",
        image: "IMG/1 (7).jpg",
        fullContent: `
            <p class="text-xl font-light text-warm/80 mb-8 border-l-4 border-golden pl-6">If you're visiting Zanzibar, these are the top 10 must-do experiences you shouldn't miss to make your trip truly unforgettable.</p>
            
            <h3>The Must-Do List</h3>
            <p>Experience the best Zanzibar has to offer with these curated activities.</p>
        `
    },
    {
        id: 3,
        category: "Travel Advice",
        title: "Zanzibar vs Safari: Which Should You Choose?",
        excerpt: "Many travelers ask: Should I choose Zanzibar or a safari? The answer depends on what kind of experience you're looking for.",
        image: "IMG/1 (7).jpg",
        fullContent: `<p class="text-xl font-light text-warm/80 mb-8 border-l-4 border-golden pl-6">Many travelers ask this question. The answer depends entirely on your preferences.</p>`
    }
];

// --- RENDER BLOG LIST ---
function renderBlogList() {
    const grid = document.getElementById('blog-grid');
    if(!grid) return;
    
    grid.innerHTML = '';
    blogPosts.forEach((post, index) => {
        const delay = index * 100;
        const cardHTML = `
            <article class="flex flex-col md:flex-row gap-6 lg:gap-10 items-center group cursor-pointer reveal active" style="transition-delay: ${delay}ms" onclick="openModal(${post.id})">
                <div class="w-full md:w-5/12 h-64 md:h-72 relative overflow-hidden rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.04)] shrink-0 border border-warm/5">
                    <img src="${post.image}" alt="${post.title}" class="absolute inset-0 w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105">
                    <div class="absolute inset-0 bg-dark/10 group-hover:bg-transparent transition-colors duration-500"></div>
                    <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-forest uppercase tracking-wider shadow-sm z-10">
                        ${post.category}
                    </div>
                </div>
                <div class="w-full md:w-7/12 flex flex-col py-2">
                    <div class="flex items-center gap-3 text-warm/40 text-xs font-bold uppercase tracking-widest mb-3">
                        <span>Kimondo Journal</span>
                        <span class="w-1 h-1 rounded-full bg-golden"></span>
                        <span>5 Min Read</span>
                    </div>
                    <h2 class="text-2xl lg:text-3xl xl:text-4xl font-serif font-bold text-forest mb-4 leading-[1.2] group-hover:text-golden transition-colors line-clamp-2">
                        ${post.title}
                    </h2>
                    <p class="text-warm/70 font-light text-base lg:text-lg leading-relaxed mb-6 line-clamp-3">
                        ${post.excerpt}
                    </p>
                    <div class="mt-auto inline-flex items-center gap-3 text-xs font-bold text-forest uppercase tracking-widest group-hover:text-golden transition-colors w-max">
                        Read Article
                        <i class="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                    </div>
                </div>
            </article>
        `;
        grid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// --- BLOG MODAL LOGIC ---
function openModal(id) {
    const post = blogPosts.find(p => p.id === id);
    if(!post) return;
    
    const modal = document.getElementById('modal');
    if(!modal) return;
    
    const modalHero = document.getElementById('modal-hero');
    const modalContentBody = document.getElementById('modal-content-body');
    
    modalHero.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="absolute inset-0 w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-white via-dark/40 to-dark/20"></div>
        <div class="absolute bottom-16 left-0 w-full px-6 md:px-12 lg:px-20 z-10">
            <span class="bg-golden text-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block shadow-sm">${post.category}</span>
            <h1 class="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-dark leading-[1.1] max-w-4xl drop-shadow-sm">${post.title}</h1>
        </div>
    `;
    
    modalContentBody.innerHTML = post.fullContent;
    modal.classList.remove('hidden');
    
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        document.getElementById('modal-container').classList.remove('scale-95');
        document.getElementById('modal-container').classList.add('scale-100');
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    if(!modal) return;
    
    modal.classList.add('opacity-0');
    document.getElementById('modal-container').classList.remove('scale-100');
    document.getElementById('modal-container').classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        const modalContent = document.querySelector('.modal-content');
        if(modalContent) modalContent.scrollTop = 0;
    }, 300);
    
    document.body.style.overflow = 'auto';
}

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

/* ============================================
   ZANZIBAR SERVICES PAGE - JavaScript
   Functions: Services/activities, category management, booking
   ============================================ */

// --- SERVICES DATA ---
const accentColors = [
    { bg: "bg-golden", hover: "hover:bg-amber-500", text: "text-white" },
    { bg: "bg-turquoise", hover: "hover:bg-cyan-600", text: "text-white" },
    { bg: "bg-forest", hover: "hover:bg-green-700", text: "text-white" },
    { bg: "bg-warm", hover: "hover:bg-amber-800", text: "text-white" },
    { bg: "bg-choco", hover: "hover:bg-orange-800", text: "text-white" }
];

const servicesData = [
    {
        id: "water-sports",
        title: "Water Sports",
        image: "IMG/1 (1).jpg",
        desc: "Dive into excitement with our thrilling water sports experiences in Zanzibar.",
        activities: [
            { title: "Clear Kayak Photoshoot", price: "$65", unit: "per person", image: "IMG/1 (1).jpg", description: "Experience crystal-clear waters like never before.", included: ["Transparent Kayak Rental", "Professional Guide", "Directed Photoshoot", "Life Jackets"], excluded: ["Hotel Transfer", "Meals & Drinks"], itinerary: ["Arrival & Safety Briefing", "Guided Kayak Session", "Drone/Camera Shoot", "Media File Delivery"] },
            { title: "Jet Ski Adventure", price: "$100", unit: "per 30 mins", image: "IMG/1 (1).jpg", description: "Feel the adrenaline as you ride across the Indian Ocean.", included: ["High-speed Jet Ski", "Instructor Guide", "Safety Equipment"], excluded: ["Photos", "Hotel Transfer"], itinerary: ["Tutorial & Fitting", "Guided Escort to Zone", "30 Min Free Ride", "Return to Shore"] }
        ]
    },
    {
        id: "ocean-experiences",
        title: "Ocean Experiences",
        image: "IMG/1 (1).jpg",
        desc: "Explore the beauty of Zanzibar's crystal-clear waters with unforgettable ocean experiences.",
        activities: [
            { title: "Nakupenda Sandbank", price: "$45", unit: "per person", image: "IMG/1 (1).jpg", description: "Relax on a stunning white sandbank.", included: ["Boat Ride", "Seafood BBQ Lunch", "Fresh Fruits", "Snorkeling Equipment"], excluded: ["Towels", "Alcoholic Drinks"], itinerary: ["Stone Town Departure", "Bawe Snorkeling", "Sandbank Arrival", "Lunch & Beach Time"] }
        ]
    }
];

function renderCategories() {
    const categoriesView = document.getElementById('categories-view');
    if(!categoriesView) return;
    
    categoriesView.innerHTML = servicesData.map((service, idx) => {
        const color = accentColors[idx % accentColors.length];
        return `
            <div onclick="openService('${service.id}')" class="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full reveal category-card">
                <div class="aspect-[4/3] w-full overflow-hidden relative shrink-0">
                    <img src="${service.image}" alt="${service.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    <div class="absolute bottom-6 left-6 right-6">
                        <h3 class="text-2xl font-serif font-bold text-white mb-2 group-hover:text-golden transition-colors">${service.title}</h3>
                    </div>
                </div>
                <div class="p-6 flex flex-col flex-grow bg-white">
                    <p class="text-warm/70 text-sm line-clamp-3 font-light leading-relaxed mb-6">${service.desc}</p>
                    <div class="mt-auto flex items-center justify-between ${color.bg} ${color.hover} -mx-6 -mb-6 px-6 py-4 text-white transition-all duration-300">
                        <span class="text-xs font-bold uppercase tracking-widest">Explore Activities</span>
                        <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-dark transition-colors">
                            <i class="fa-solid fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
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

function openService(id) {
    const service = servicesData.find(s => s.id === id);
    const serviceTitleEl = document.getElementById('service-title');
    const serviceDescEl = document.getElementById('service-desc');
    
    if(serviceTitleEl) serviceTitleEl.textContent = service.title;
    if(serviceDescEl) serviceDescEl.textContent = service.desc;
    
    document.getElementById('hero-section').classList.add('hidden');
    document.getElementById('explore-heading').classList.add('hidden');
    document.getElementById('categories-view').classList.add('hidden');
    document.getElementById('activities-view').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showCategories() {
    document.getElementById('hero-section').classList.remove('hidden');
    document.getElementById('explore-heading').classList.remove('hidden');
    document.getElementById('activities-view').classList.add('hidden');
    document.getElementById('categories-view').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function addToBooking(name, price) { 
    alert(name + " (" + price + ") added to your booking list!"); 
}

/* ============================================
   BLOG PAGE MODAL EVENTS
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    const closeModalBtn = document.getElementById('close-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    
    if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if(modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('modal');
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) closeModal();
    });
    
    // Initialize pages
    renderBlogList();
    initContactPage();
    initGiftShop();
    renderCategories();
});