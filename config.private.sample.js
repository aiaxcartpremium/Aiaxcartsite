
// config.private.js — do NOT commit to GitHub
window.CONFIG_PRIVATE = {
  DATABASE: {
    SUPABASE_URL: "https://YOUR-PROJECT.supabase.co",
    SUPABASE_ANON_KEY: "YOUR-ANON-KEY"
  },
  TELEGRAM: {
    BOT_TOKEN: "123456:ABCDEF...", // optional if using Edge Function secret
    CHAT_ID: "-1001234567890",
    ENABLED: true
  },
  STORAGE: {
    REPORTS_BUCKET: "reports"
  }
};
