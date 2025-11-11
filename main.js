// ============================================
// MAIN.JS - Complete Updated Version
// ============================================

// --- AUTHENTICATION ---
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
}

function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function logout() {
    localStorage.removeItem('user');
    window.location.reload();
}

function performLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    const user = {
        email: email,
        id: Date.now(),
        name: email.split('@')[0],
        isOwner: email === 'owner@aiaxcart.com' // Set your owner email
    };
    
    setCurrentUser(user);
    closeLoginModal();
    window.location.reload();
}

function performSignup() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    const user = {
        email: email,
        id: Date.now(),
        name: email.split('@')[0],
        isOwner: false
    };
    
    setCurrentUser(user);
    closeSignupModal();
    window.location.reload();
}

// --- MODAL FUNCTIONS ---
function showLoginModal() {
    document.getElementById('login-modal').style.display = 'flex';
}

function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}

function showSignupModal() {
    document.getElementById('signup-modal').style.display = 'flex';
}

function closeSignupModal() {
    document.getElementById('signup-modal').style.display = 'none';
}

function showCheckoutModal() {
    document.getElementById('checkout-modal').style.display = 'flex';
}

function closeCheckoutModal() {
    document.getElementById('checkout-modal').style.display = 'none';
}

function closeOrderConfirmationModal() {
    document.getElementById('order-confirmation-modal').style.display = 'none';
    window.location.reload();
}

// --- INITIALIZE PRODUCTS FROM LOCALSTORAGE OR DEFAULT ---
function getProducts() {
    const stored = localStorage.getItem('products');
    if (stored) {
        return JSON.parse(stored);
    }
    
    // Default products if none exist
    const defaultProducts = [
        { id: 'netflix', name: 'Netflix Premium', category: 'entertainment', icon: '📺', stock: 15, sold: 42, 
          pricing: { 'solo profile': { '1m': 160, '2m': 280, '3m': 435, '4m': 565, '6m': 850, '8m': 1090, '12m': 1500 }, 
                     'shared profile': { '1m': 80, '2m': 145, '3m': 205, '4m': 270, '6m': 410, '8m': 520, '12m': 800 } } },
        { id: 'viu', name: 'Viu Premium', category: 'entertainment', icon: '🎬', stock: 8, sold: 25,
          pricing: { 'solo account': { '1m': 70, '2m': 105, '3m': 145, '4m': 170, '6m': 205, '10m': 280, '12m': 310 },
                     'shared account': { '1m': 30, '2m': 55, '3m': 75, '4m': 90, '6m': 120, '10m': 190, '12m': 220 } } },
        { id: 'spotify', name: 'Spotify Premium', category: 'streaming', icon: '🎵', stock: 15, sold: 55,
          pricing: { 'solo fw': { '1m': 60, '2m': 110, '3m': 150, '4m': 200 }, 'solo nw': { '1m': 45, '2m': 80, '3m': 120, '4m': 150 } } },
        { id: 'youtube', name: 'YouTube Premium', category: 'streaming', icon: '📹', stock: 20, sold: 65,
          pricing: { 'famhead': { '1m': 70, '2m': 90, '3m': 125, '4m': 150, '5m': 175, '6m': 200 },
                     'solo': { '1m': 45, '2m': 60, '3m': 85, '4m': 105, '5m': 125, '6m': 145 },
                     'invite': { '1m': 20, '2m': 35, '3m': 50, '4m': 60, '5m': 70, '6m': 80 } } },
        { id: 'chatgpt', name: 'ChatGPT Plus', category: 'ai', icon: '🧠', stock: 10, sold: 22,
          pricing: { 'solo account': { '1m': 600, '2m': 1050, '3m': 1500 }, 'shared account': { '1m': 350, '2m': 650, '3m': 900 } } },
        { id: 'canva', name: 'Canva Pro', category: 'editing', icon: '🎨', stock: 12, sold: 30,
          pricing: { 'solo account': { '1m': 180, '3m': 500, '6m': 950, '12m': 1800 } } }
    ];
    
    localStorage.setItem('products', JSON.stringify(defaultProducts));
    return defaultProducts;
}

function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// --- TAB NAVIGATION ---
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const tabButtons = document.querySelectorAll('.tab');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Activate button
    event.target.classList.add('active');
    
    // Load content based on tab
    if (tabName === 'account') {
        loadAccountTab();
    } else if (tabName === 'report') {
        loadReportTab();
    } else if (tabName === 'rules') {
        loadRulesTab();
    } else if (tabName === 'feedback') {
        loadFeedbackTab();
    }
}

// --- RENDER PRODUCTS ---
function renderProducts() {
    const products = getProducts();
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    
    // Group by category
    const categories = {
        'entertainment': { name: '🎬 Entertainment', products: [] },
        'streaming': { name: '🎵 Music & Streaming', products: [] },
        'ai': { name: '🤖 AI Tools', products: [] },
        'editing': { name: '🎨 Editing Tools', products: [] },
        'educational': { name: '📚 Educational', products: [] }
    };
    
    products.forEach(product => {
        if (categories[product.category]) {
            categories[product.category].products.push(product);
        }
    });
    
    // Render each category
    Object.keys(categories).forEach(catKey => {
        const cat = categories[catKey];
        if (cat.products.length === 0) return;
        
        const section = document.createElement('div');
        section.className = 'category-section';
        section.innerHTML = `
            <div class="category-header">
                <h3 class="category-title">${cat.name}</h3>
            </div>
            <div class="products-grid" id="category-${catKey}"></div>
        `;
        container.appendChild(section);
        
        const grid = document.getElementById('category-' + catKey);
        cat.products.forEach(product => {
            grid.appendChild(createProductCard(product));
        });
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    
    const accountTypes = Object.keys(product.pricing);
    const firstType = accountTypes[0];
    const durations = Object.keys(product.pricing[firstType]);
    const firstDuration = durations[0];
    const firstPrice = product.pricing[firstType][firstDuration];
    
    const stockBadge = product.stock > 0 
        ? `<span class="badge badge-stock">✓ ${product.stock} in stock</span>` 
        : `<span class="badge badge-out">Out of stock</span>`;
    
    card.innerHTML = `
        <div class="product-image">${product.icon}</div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-badges">
                ${stockBadge}
                <span class="badge badge-sold">📊 ${product.sold} sold</span>
            </div>
            <div class="account-types" id="account-types-${product.id}">
                ${accountTypes.map((type, idx) => 
                    `<button class="account-btn ${idx === 0 ? 'active' : ''}" onclick="selectAccountType('${product.id}', '${type}')">${type}</button>`
                ).join('')}
            </div>
            <p class="duration-label">Duration:</p>
            <div class="duration-scroll" id="duration-${product.id}">
                ${durations.map((dur, idx) => 
                    `<button class="duration-btn ${idx === 0 ? 'active' : ''}" onclick="selectDuration('${product.id}', '${dur}')">${dur}</button>`
                ).join('')}
            </div>
            <div class="price-display" id="price-${product.id}">₱${firstPrice}</div>
            <button class="btn-checkout" id="checkout-${product.id}" onclick="initiateCheckout('${product.id}')" ${product.stock === 0 ? 'disabled' : ''}>
                ${product.stock > 0 ? 'Order Now' : 'Out of Stock'}
            </button>
        </div>
    `;
    
    return card;
}

function selectAccountType(productId, accountType) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Update UI
    const buttons = document.querySelectorAll(`#account-types-${productId} .account-btn`);
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update durations and price
    const durations = Object.keys(product.pricing[accountType]);
    const firstDuration = durations[0];
    const durationContainer = document.getElementById('duration-' + productId);
    durationContainer.innerHTML = durations.map((dur, idx) => 
        `<button class="duration-btn ${idx === 0 ? 'active' : ''}" onclick="selectDuration('${productId}', '${dur}')">${dur}</button>`
    ).join('');
    
    updatePrice(productId, accountType, firstDuration);
}

function selectDuration(productId, duration) {
    const buttons = document.querySelectorAll(`#duration-${productId} .duration-btn`);
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const accountTypeBtn = document.querySelector(`#account-types-${productId} .account-btn.active`);
    const accountType = accountTypeBtn.textContent;
    
    updatePrice(productId, accountType, duration);
}

function updatePrice(productId, accountType, duration) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const price = product.pricing[accountType][duration];
    document.getElementById('price-' + productId).textContent = '₱' + price;
}

// --- CHECKOUT ---
let currentCheckout = null;

function initiateCheckout(productId) {
    const user = getCurrentUser();
    if (!user) {
        alert('Please login to place an order');
        showLoginModal();
        return;
    }
    
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) {
        alert('Product out of stock');
        return;
    }
    
    const accountTypeBtn = document.querySelector(`#account-types-${productId} .account-btn.active`);
    const durationBtn = document.querySelector(`#duration-${productId} .duration-btn.active`);
    
    const accountType = accountTypeBtn.textContent;
    const duration = durationBtn.textContent;
    const price = product.pricing[accountType][duration];
    
    // Calculate expiry
    const months = parseInt(duration);
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + months);
    
    currentCheckout = {
        product: product,
        accountType: accountType,
        duration: duration,
        price: price,
        expiryDate: expiryDate
    };
    
    // Display checkout details
    const details = document.getElementById('checkout-details');
    details.innerHTML = `
        <p><strong>Product:</strong> ${product.name}</p>
        <p><strong>Account Type:</strong> ${accountType}</p>
        <p><strong>Duration:</strong> ${duration}</p>
        <p><strong>Price:</strong> ₱${price}</p>
        <p><strong>Expiry Date:</strong> ${expiryDate.toLocaleDateString()} ${expiryDate.toLocaleTimeString()}</p>
    `;
    
    // Load and display rules
    loadCheckoutRules(product.name);
    
    showCheckoutModal();
}

function loadCheckoutRules(productName) {
    const rules = JSON.parse(localStorage.getItem('rules') || '[]');
    const productRules = rules.filter(rule => 
        rule.product === productName || rule.product === 'General (All Products)'
    );
    
    const rulesContent = document.getElementById('checkout-rules-content');
    if (productRules.length === 0) {
        rulesContent.innerHTML = '<p style="color: #888; font-style: italic;">No specific rules for this product.</p>';
    } else {
        rulesContent.innerHTML = productRules.map(rule => 
            `<p style="margin: 0.5rem 0; color: #5a3e36;">• ${rule.rule}</p>`
        ).join('');
    }
}

function confirmOrder() {
    if (!currentCheckout) return;
    
    const user = getCurrentUser();
    const order = {
        id: 'ORD' + Date.now(),
        product: currentCheckout.product.name,
        productId: currentCheckout.product.id,
        accountType: currentCheckout.accountType,
        duration: currentCheckout.duration,
        price: currentCheckout.price,
        buyer: user.email,
        buyerName: user.name,
        status: 'pending',
        createdAt: new Date().toISOString(),
        expiryDate: currentCheckout.expiryDate.toISOString()
    };
    
    // Save order
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Send Telegram notification
    if (typeof notifyNewOrder === 'function') {
        notifyNewOrder(order);
    }
    
    closeCheckoutModal();
    
    // Show confirmation
    const confirmDetails = document.getElementById('order-confirmation-details');
    confirmDetails.innerHTML = `
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Product:</strong> ${order.product}</p>
        <p><strong>Price:</strong> ₱${order.price}</p>
        <p style="margin-top: 1.5rem; padding: 1rem; background: #fff9e6; border-radius: 10px; border: 1px solid #ffe4b3;">
            <strong>📌 Next Steps:</strong><br>
            1. Send payment via GCash or Maya<br>
            2. Wait for owner confirmation<br>
            3. Account details will be delivered to your account page
        </p>
        <p style="margin-top: 1rem; color: #888; font-size: 0.95rem;">Expected delivery: Within 24 hours after payment confirmation</p>
    `;
    
    document.getElementById('order-confirmation-modal').style.display = 'flex';
    
    currentCheckout = null;
}

// --- ACCOUNT TAB ---
function loadAccountTab() {
    const user = getCurrentUser();
    const contentDiv = document.getElementById('account-content');
    const ordersDiv = document.getElementById('orders-history');
    
    if (!user) {
        contentDiv.innerHTML = '<p>Login to view your account details and order history.</p>';
        ordersDiv.style.display = 'none';
        return;
    }
    
    contentDiv.innerHTML = `
        <div style="background: #fff; padding: 2rem; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.05);">
            <h3>Welcome, ${user.name}!</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Member Since:</strong> ${new Date(user.id).toLocaleDateString()}</p>
        </div>
    `;
    
    // Load user orders
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = allOrders.filter(order => order.buyer === user.email);
    
    ordersDiv.style.display = 'block';
    const ordersList = document.getElementById('orders-list');
    
    if (userOrders.length === 0) {
        ordersList.innerHTML = '<p style="color: #888; font-style: italic;">No orders yet.</p>';
    } else {
        ordersList.innerHTML = userOrders.map(order => `
            <div style="background: #fff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <h4 style="margin-top: 0; color: #613e36;">${order.product}</h4>
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Account Type:</strong> ${order.accountType}</p>
                <p><strong>Duration:</strong> ${order.duration}</p>
                <p><strong>Price:</strong> ₱${order.price}</p>
                <p><strong>Status:</strong> <span style="color: ${order.status === 'delivered' ? '#28a745' : '#ffa500'};">${order.status.toUpperCase()}</span></p>
                <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
                ${order.deliveryDetails ? `
                    <div style="margin-top: 1rem; padding: 1rem; background: #e8f5e9; border-radius: 8px;">
                        <h5 style="margin-top: 0; color: #2e7d32;">Account Details:</h5>
                        <p><strong>Email:</strong> ${order.deliveryDetails.email}</p>
                        <p><strong>Password:</strong> ${order.deliveryDetails.password}</p>
                        ${order.deliveryDetails.profile ? `<p><strong>Profile:</strong> ${order.deliveryDetails.profile}</p>` : ''}
                        ${order.deliveryDetails.pin ? `<p><strong>PIN:</strong> ${order.deliveryDetails.pin}</p>` : ''}
                        <p><strong>Expires:</strong> ${new Date(order.expiryDate).toLocaleDateString()} ${new Date(order.expiryDate).toLocaleTimeString()}</p>
                    </div>
                ` : '<p style="color: #888; font-style: italic;">Waiting for delivery...</p>'}
            </div>
        `).join('');
    }
}

// --- REPORT TAB ---
function loadReportTab() {
    const user = getCurrentUser();
    const contentDiv = document.getElementById('report-content');
    const formDiv = document.getElementById('report-form');
    
    if (!user) {
        contentDiv.style.display = 'block';
        formDiv.style.display = 'none';
    } else {
        contentDiv.style.display = 'none';
        formDiv.style.display = 'block';
    }
}

function submitReport() {
    const user = getCurrentUser();
    if (!user) {
        alert('Please login first');
        return;
    }
    
    const text = document.getElementById('report-text').value;
    const imageInput = document.getElementById('report-image');
    
    if (!text.trim()) {
        alert('Please describe your issue');
        return;
    }
    
    const report = {
        id: Date.now(),
        user: user.email,
        userName: user.name,
        text: text,
        image: null,
        date: new Date().toISOString()
    };
    
    // Handle image upload
    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            report.image = e.target.result;
            saveReport(report);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        saveReport(report);
    }
}

function saveReport(report) {
    const reports = JSON.parse(localStorage.getItem('reports') || '[]');
    reports.push(report);
    localStorage.setItem('reports', JSON.stringify(reports));
    
    alert('Report submitted successfully! We will review it soon.');
    document.getElementById('report-text').value = '';
    document.getElementById('report-image').value = '';
}

// --- RULES TAB ---
function loadRulesTab() {
    const rules = JSON.parse(localStorage.getItem('rules') || '[]');
    const container = document.getElementById('rules-container');
    
    if (rules.length === 0) {
        container.innerHTML = '<p style="color: #888; font-style: italic;">No rules available yet.</p>';
        return;
    }
    
    // Group by product
    const groupedRules = {};
    rules.forEach(rule => {
        const product = rule.product || 'General';
        if (!groupedRules[product]) {
            groupedRules[product] = [];
        }
        groupedRules[product].push(rule);
    });
    
    container.innerHTML = Object.keys(groupedRules).map(product => `
        <div style="background: #fff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <h3 style="margin-top: 0; color: #613e36;">${product}</h3>
            ${groupedRules[product].map(rule => `<p style="margin: 0.5rem 0; color: #5a3e36;">• ${rule.rule}</p>`).join('')}
        </div>
    `).join('');
}

// --- FEEDBACK TAB ---
function loadFeedbackTab() {
    const user = getCurrentUser();
    const authDiv = document.getElementById('feedback-auth-required');
    const formDiv = document.getElementById('feedback-form');
    
    if (!user) {
        authDiv.style.display = 'block';
        formDiv.style.display = 'none';
    } else {
        authDiv.style.display = 'none';
        formDiv.style.display = 'block';
    }
    
    // Load existing feedback
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    const listDiv = document.getElementById('feedback-list');
    
    if (feedbacks.length === 0) {
        listDiv.innerHTML = '<p style="color: #888; font-style: italic;">No feedback yet. Be the first to share!</p>';
    } else {
        listDiv.innerHTML = feedbacks.map(fb => `
            <div style="background: #fff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <strong style="color: #613e36;">${fb.userName || fb.user}</strong>
                    <span style="color: #888; font-size: 0.9rem;">${new Date(fb.date).toLocaleString()}</span>
                </div>
                <p style="color: #5a3e36; margin: 0.5rem 0;">${fb.text}</p>
                ${fb.image ? `<img src="${fb.image}" style="max-width: 100%; border-radius: 8px; margin-top: 0.5rem;">` : ''}
            </div>
        `).join('');
    }
}

function submitFeedback() {
    const user = getCurrentUser();
    if (!user) {
        alert('Please login first');
        return;
    }
    
    const text = document.getElementById('feedback-text').value;
    const imageInput = document.getElementById('feedback-image');
    
    if (!text.trim()) {
        alert('Please write your feedback');
        return;
    }
    
    const feedback = {
        id: Date.now(),
        user: user.email,
        userName: user.name,
        text: text,
        image: null,
        date: new Date().toISOString()
    };
    
    // Handle image upload
    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            feedback.image = e.target.result;
            saveFeedback(feedback);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        saveFeedback(feedback);
    }
}

function saveFeedback(feedback) {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    feedbacks.push(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    
    alert('Thank you for your feedback!');
    document.getElementById('feedback-text').value = '';
    document.getElementById('feedback-image').value = '';
    loadFeedbackTab();
}

// --- SEARCH/FILTER ---
function filterProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        if (productName.includes(query)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// --- INITIALIZE ON PAGE LOAD ---
document.addEventListener('DOMContentLoaded', function() {
    const user = getCurrentUser();
    
    if (user) {
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('user-section').style.display = 'flex';
        document.getElementById('user-name').textContent = user.name;
        
        // Show admin link if owner
        if (user.isOwner) {
            document.getElementById('admin-link').style.display = 'block';
        }
    } else {
        document.getElementById('auth-section').style.display = 'flex';
        document.getElementById('user-section').style.display = 'none';
    }
    
    renderProducts();
    loadRulesTab();
    loadFeedbackTab();
});
