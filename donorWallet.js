// Image Constants
const IMG_INTRO_1 = 'oasis/Intro_1.jpg';
const IMG_INTRO_2 = 'oasis/Intro_2.jpg';
const IMG_INTRO_3 = 'oasis/Intro_3.jpg';
const IMG_INTRO_4 = 'oasis/Intro_4.jpg';

// Global State Management
let currentLanguage = 'zh'; // Default to Chinese
let currentUser = 'guest'; // 'guest' or 'alice'
let selectedItems = {
    NEEDS: [],
    LIVES: []
};

// Mock Data
const mockData = {
    guest: {
        totalDonations: 5389730,
        usedDonations: 3897304
    },
    alice: {
        totalDonations: 5389,
        usedDonations: 1333,
        name: 'Alice',
        address: '0x742d...8B3f',
        level: 'Gold',
        expiry: '2029-12-31'
    }
};

const careItemDetails = {
    FOOD: {
        en: { name: 'Nutritional Food', price: 100, unit: 'portion', description: 'Five meals a day, not instant noodles' },
        zh: { name: '營養糧食', price: 100, unit: '份', description: '一日五餐非公仔麵' }
    },
    INSURANCE: {
        en: { name: 'Medical Insurance', price: 268, unit: 'month', description: 'Doctor visits and surgeries' },
        zh: { name: '醫療保險', price: 268, unit: '月', description: '睇醫生及手術' }
    },
    COLLAR: {
        en: { name: 'Smart Collar', price: 330, unit: 'piece', description: 'Automatic health monitoring' },
        zh: { name: '智能頸圈', price: 330, unit: '件', description: '自動健康檢查' }
    },
    ADOPTION: {
        en: { name: 'Full Adoption', price: 489, unit: 'month', description: 'Real-time activity and health data' },
        zh: { name: '全面助養', price: 489, unit: '月', description: '即時活動健康資料' }
    }
};

const animalDetails = {
    ALLSTRAY: {
        en: { name: 'All Oasis Strays', description: 'All strays in the park that need care' },
        zh: { name: '綠洲浪浪', description: '園區內所有需要照顧的浪浪' }
    },
    SQUIRREL: {
        en: { name: 'Squirrel Dog, 6 years', description: 'Healthy and happy, one eye problem' },
        zh: { name: '松鼠狗6歲', description: '健康快樂 一隻眼疾' }
    },
    PUG: {
        en: { name: 'Pug Dog, 8 years', description: 'Energetic and active, occasional stomach pain' },
        zh: { name: '八哥狗8歲', description: '精神活躍 間中肚痛' }
    },
    TERRIER: {
        en: { name: 'Terrier Dog, 14 years', description: 'Still strong, right leg not flexible' },
        zh: { name: '爹利狗14歲', description: '老當益壯 右腳不靈活' }
    }
};

// Language Management
function selectLanguage(lang) {
    currentLanguage = lang;
    updateLanguage();
    showPage('matching-page');
    document.getElementById('top-nav').classList.remove('hidden');
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-en][data-zh]');
    elements.forEach(element => {
        const text = currentLanguage === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-zh');
        element.textContent = text;
    });
    
    // Update member greeting
    updateMemberGreeting();
}

function updateMemberGreeting() {
    const greeting = document.getElementById('member-greeting');
    if (currentUser === 'guest') {
        greeting.textContent = currentLanguage === 'en' ? 'I am a guest' : '我是訪客';
        greeting.setAttribute('data-en', 'I am a guest');
        greeting.setAttribute('data-zh', '我是訪客');
    } else {
        greeting.textContent = currentLanguage === 'en' ? 'Hello Alice' : '您好 Alice';
        greeting.setAttribute('data-en', 'Hello Alice');
        greeting.setAttribute('data-zh', '您好 Alice');
    }
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    document.getElementById(pageId).classList.add('active');
    
    // Handle special page logic
    if (pageId === 'donation-page') {
        updateDonationSummary();
    } else if (pageId === 'about-page') {
        updateAboutPageStats();
    }
    
    // Show/hide nav based on page
    const topNav = document.getElementById('top-nav');
    if (pageId === 'intro-page') {
        topNav.classList.add('hidden');
    } else {
        topNav.classList.remove('hidden');
    }
}

// Modal Management
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Selection Modal
let currentModalCard = null;

function openSelectModal(cardElement) {
    currentModalCard = cardElement;
    const type = cardElement.getAttribute('data-type');
    const modal = document.getElementById('select-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDetails = document.getElementById('modal-details');
    const toggleBtn = document.getElementById('select-toggle-btn');
    
    // Set modal image
    modalImage.src = cardElement.querySelector('img').src;
    
    // Set modal content based on type
    const isNeed = cardElement.closest('.needs-carousel') !== null;
    let details;
    
    if (isNeed) {
        details = careItemDetails[type][currentLanguage];
        modalTitle.textContent = details.name;
        modalDetails.innerHTML = `
            <p><strong>${currentLanguage === 'en' ? 'Price' : '價格'}</strong>: $${details.price}/${details.unit}</p>
            <p><strong>${currentLanguage === 'en' ? 'Description' : '描述'}</strong>: ${details.description}</p>
        `;
    } else {
        details = animalDetails[type][currentLanguage];
        modalTitle.textContent = details.name;
        modalDetails.innerHTML = `
            <p><strong>${currentLanguage === 'en' ? 'Description' : '描述'}</strong>: ${details.description}</p>
        `;
    }
    
    // Update toggle button
    const category = isNeed ? 'NEEDS' : 'LIVES';
    const isSelected = selectedItems[category].includes(type);
    toggleBtn.textContent = isSelected ? 
        (currentLanguage === 'en' ? 'Unselect' : '取消選擇') : 
        (currentLanguage === 'en' ? 'Select' : '選擇');
    toggleBtn.className = isSelected ? 'cancel-btn' : 'gradient-btn';
    
    openModal('select-modal');
}

function toggleSelection() {
    if (!currentModalCard) return;
    
    const type = currentModalCard.getAttribute('data-type');
    const isNeed = currentModalCard.closest('.needs-carousel') !== null;
    const category = isNeed ? 'NEEDS' : 'LIVES';
    
    const index = selectedItems[category].indexOf(type);
    if (index > -1) {
        // Unselect
        selectedItems[category].splice(index, 1);
        currentModalCard.classList.remove('selected');
    } else {
        // Select
        selectedItems[category].push(type);
        currentModalCard.classList.add('selected');
    }
    
    closeModal('select-modal');
    updateSelectionVisuals();
}

function updateSelectionVisuals() {
    // Update all card visual states
    document.querySelectorAll('.card').forEach(card => {
        const type = card.getAttribute('data-type');
        const isNeed = card.closest('.needs-carousel') !== null;
        const category = isNeed ? 'NEEDS' : 'LIVES';
        
        if (selectedItems[category].includes(type)) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
}

// Settings Modal
function openSettingsModal() {
    const modal = document.getElementById('settings-modal');
    const loginForm = document.getElementById('login-form');
    const memberInfo = document.getElementById('member-info');
    
    if (currentUser === 'guest') {
        loginForm.classList.remove('hidden');
        memberInfo.classList.add('hidden');
    } else {
        loginForm.classList.add('hidden');
        memberInfo.classList.remove('hidden');
    }
    
    openModal('settings-modal');
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'alice' && password === '2345') {
        currentUser = 'alice';
        updateMemberGreeting();
        updateUserStats();
        
        // Switch to member view
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('member-info').classList.remove('hidden');
    } else {
        alert(currentLanguage === 'en' ? 'Invalid credentials' : '登入資訊錯誤');
    }
}

function logout() {
    currentUser = 'guest';
    updateMemberGreeting();
    updateUserStats();
    closeModal('settings-modal');
}

function updateUserStats() {
    const userData = currentUser === 'guest' ? mockData.guest : mockData.alice;
    document.getElementById('total-donations').textContent = `$${userData.totalDonations.toLocaleString()}`;
    document.getElementById('used-donations').textContent = `$${userData.usedDonations.toLocaleString()}`;
}

// Donations Modals
function openTotalDonationsModal() {
    openModal('total-donations-modal');
}

function openUsedDonationsModal() {
    openModal('used-donations-modal');
}

// Scan Modal
function openScanModal() {
    openModal('scan-modal');
}

function simulateScan() {
    // Simulate QR code scan result
    const mockQRData = {
        NEEDS: ['FOOD'],
        LIVES: ['SQUIRREL']
    };
    
    // Update selection
    selectedItems = mockQRData;
    updateSelectionVisuals();
    
    closeModal('scan-modal');
    showPage('donation-page');
    
    alert(currentLanguage === 'en' ? 
        'QR Code scanned! Items added to donation.' : 
        '二維碼已掃描！項目已添加到捐款中。');
}

// Donation Page Logic
function updateDonationSummary() {
    const selectedItemsDiv = document.getElementById('selected-items');
    const totalDiv = document.getElementById('donation-total');
    
    let itemsList = [];
    let total = 0;
    
    // Process NEEDS
    selectedItems.NEEDS.forEach(type => {
        const item = careItemDetails[type][currentLanguage];
        itemsList.push(`${item.name} - $${item.price}`);
        total += item.price;
    });
    
    // Process LIVES (multiply by count)
    const livesCount = selectedItems.LIVES.length;
    if (livesCount > 0) {
        total *= livesCount;
        selectedItems.LIVES.forEach(type => {
            const animal = animalDetails[type][currentLanguage];
            itemsList.push(animal.name);
        });
    }
    
    if (itemsList.length === 0) {
        selectedItemsDiv.innerHTML = `<p>${currentLanguage === 'en' ? 'Please select items from the matching page' : '請從配對頁面選擇項目'}</p>`;
        total = 0;
    } else {
        selectedItemsDiv.innerHTML = `
            <div class="scrolling-text">
                ${itemsList.join(' • ')}
            </div>
        `;
    }
    
    totalDiv.textContent = total.toLocaleString();
    document.getElementById('payment-amount').textContent = total.toLocaleString();
}

// Payment Modal
function openPaymentModal() {
    const total = parseInt(document.getElementById('donation-total').textContent.replace(/,/g, ''));
    if (total === 0) {
        alert(currentLanguage === 'en' ? 
            'Please select items first' : 
            '請先選擇項目');
        return;
    }
    
    document.getElementById('payment-amount').textContent = total.toLocaleString();
    openModal('payment-modal');
}

function processPayment() {
    // Simulate payment processing
    const total = parseInt(document.getElementById('payment-amount').textContent.replace(/,/g, ''));
    
    // Update user stats
    const userData = currentUser === 'guest' ? mockData.guest : mockData.alice;
    userData.totalDonations += total;
    userData.usedDonations += total;
    updateUserStats();
    
    // Show completion
    closeModal('payment-modal');
    document.querySelector('.thank-you-box').classList.add('hidden');
    const completeBox = document.getElementById('donation-complete');
    completeBox.classList.remove('hidden');
    
    // Generate mock blockchain data
    const now = new Date();
    document.getElementById('tx-timestamp').textContent = now.toISOString();
    document.getElementById('tx-amount').textContent = total.toLocaleString();
    document.getElementById('tx-block').textContent = Math.floor(Math.random() * 1000000);
    document.getElementById('tx-hash').textContent = '0x' + Math.random().toString(16).substr(2, 8) + '...';
    
    // Clear selections
    selectedItems = { NEEDS: [], LIVES: [] };
    updateSelectionVisuals();
}

// About Page Logic
function updateAboutPageStats() {
    const guestData = mockData.guest;
    const aliceData = mockData.alice;
    
    const totalDonations = guestData.totalDonations + aliceData.totalDonations;
    const totalUsed = guestData.usedDonations + aliceData.usedDonations;
    const currentUserUsed = currentUser === 'guest' ? 0 : aliceData.usedDonations;
    
    // Update circular visualization
    document.querySelector('.total-box .amount').textContent = `$${totalDonations.toLocaleString()}`;
    document.querySelector('.used-box .amount').textContent = `$${totalUsed.toLocaleString()}`;
    document.querySelector('.member-box .amount').textContent = `$${currentUserUsed.toLocaleString()}`;
}

// Initialize carousel images
function initializeCarouselImages() {
    const carouselImages = document.querySelectorAll('.carousel-image');
    const imageUrls = [IMG_INTRO_1, IMG_INTRO_2, IMG_INTRO_3, IMG_INTRO_4];
    
    carouselImages.forEach((img, index) => {
        if (index < imageUrls.length) {
            img.src = imageUrls[index];
        }
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel with local images
    initializeCarouselImages();
    
    // Set initial language
    updateLanguage();
    updateUserStats();
    
    // Add click outside modal to close
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            const modalId = event.target.id;
            closeModal(modalId);
        }
    });
    
    // Add keyboard support
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            // Close any open modal
            document.querySelectorAll('.modal').forEach(modal => {
                if (modal.style.display === 'block') {
                    closeModal(modal.id);
                }
            });
        }
    });
    
    // Add smooth scrolling for carousels
    document.querySelectorAll('.cards-carousel').forEach(carousel => {
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('active');
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.classList.remove('active');
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.classList.remove('active');
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    });
    
    // Add touch support for mobile
    document.querySelectorAll('.cards-carousel').forEach(carousel => {
        let startX;
        let scrollLeft;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('touchmove', (e) => {
            if (!startX) return;
            const x = e.touches[0].pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    });
    
    // Add glowing effect to selected cards
    setInterval(() => {
        document.querySelectorAll('.card.selected').forEach(card => {
            card.classList.toggle('glow-effect');
        });
    }, 2000);
    
    console.log('Donor Wallet App initialized successfully!');
});

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        selectLanguage,
        showPage,
        toggleSelection,
        login,
        logout,
        processPayment
    };
}


