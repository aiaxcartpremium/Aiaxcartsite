// ============================================
// PUBLIC CONFIGURATION
// This file is safe to commit to GitHub
// ============================================

const CONFIG = {
    // ==================== SHOP SETTINGS ====================
    SHOP: {
        NAME: 'Aiaxcart Premium',
        LOGO: '🛒',
        TAGLINE: 'Your trusted source for premium digital accounts',
        SUPPORT_EMAIL: 'support@aiaxcart.shop',
        CONTACT_NUMBER: '+63 929 984 3629'
    },

    // ==================== PAYMENT METHODS ====================
    PAYMENT: {
        GCASH: {
            ENABLED: true,
            NUMBER: '0962 554 4105',
            NAME: 'Shanaia Maureen Mariano'
        },
        MAYA: {
            ENABLED: true,
            NUMBER: '0929 984 3629',
            NAME: 'Shanaia Maureen Mariano'
        }
    },

    // ==================== PRODUCT CATEGORIES ====================
    CATEGORIES: [
        { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
        { id: 'streaming', name: 'Streaming', icon: '🎵' },
        { id: 'ai', name: 'AI Tools', icon: '🧠' },
        { id: 'educational', name: 'Educational', icon: '📚' },
        { id: 'editing', name: 'Editing Tools', icon: '🎨' }
    ],

    // ==================== ORDER SETTINGS ====================
    ORDERS: {
        AUTO_APPROVE: false,
        REQUIRE_PAYMENT_PROOF: true,
        EXPIRY_WARNING_DAYS: 7,
        
        STATUS: {
            PENDING: 'pending',
            APPROVED: 'approved',
            DELIVERED: 'delivered',
            CANCELLED: 'cancelled'
        }
    },

    // ==================== INVENTORY SETTINGS ====================
    INVENTORY: {
        AUTO_ARCHIVE_DAYS: 30,
        SHOW_LOW_STOCK_WARNING: true,
        MIN_STOCK_LEVEL: 3
    },

    // ==================== UI SETTINGS ====================
    UI: {
        THEME: {
            PRIMARY_COLOR: '#FFD3D6',
            SECONDARY_COLOR: '#FFB0B5',
            ACCENT_COLOR: '#F9DCC0',
            TEXT_COLOR: '#5a3e36',
            BACKGROUND: '#fefaf7'
        },
        
        DISPLAY: {
            PRODUCTS_PER_PAGE: 12,
            SHOW_SOLD_COUNT: true,
            SHOW_STOCK_COUNT: true,
            SHOW_CATEGORY_ICONS: true
        }
    },

    // ==================== FEATURES ====================
    FEATURES: {
        ENABLE_REPORTS: true,
        ENABLE_FEEDBACK: true,
        ENABLE_SEARCH: true,
        ENABLE_WISHLIST: false,
        ENABLE_REFERRALS: false,
        ENABLE_DISCOUNTS: false
    },

    // ==================== SECURITY ====================
    SECURITY: {
        ENABLE_RATE_LIMITING: true,
        MAX_LOGIN_ATTEMPTS: 5,
        LOCKOUT_DURATION: 15,
        SESSION_STORAGE: 'localStorage'
    }
};

// Helper functions
function getConfig(key) {
    const keys = key.split('.');
    let value = CONFIG;
    for (const k of keys) {
        value = value[k];
        if (value === undefined) return null;
    }
    return value;
}

function isFeatureEnabled(feature) {
    return CONFIG.FEATURES[feature] === true;
}
