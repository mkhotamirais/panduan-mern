npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p

ACCESS_TOKEN_SECRET=1ea91c6505a7c690ee5f28d3512337d296b8a8a2324ba0217a2982fef5cfca0d8a3d05ee0f6a58b418b4f834b7a89d1e92b993bdc387b48999d7433fdc6d73ba

REFRESH_TOKEN_SECRET=483015a27d7a494e3712c97fcd0b59bb410cdc993bfa611b1ec472f04a2e6321d99d4bcc52fdc4514eac21a883c3f9389e99e5b158d4cb42275ecc748d73a329

untuk mendapatkan random string ketik perintah berikut di terminal

node (enter) masuk node di terminal lalu

require('crypto').randomBytes(64).toString('hex')
