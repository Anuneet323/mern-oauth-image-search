🌐 MERN OAuth Image Search App

A full-stack MERN + OAuth project that allows users to log in securely, search images using the Unsplash API, and view personal & global search trends — all with a clean, responsive React UI.

🧠 Tech Stack

Frontend: React.js (Vite) + Tailwind CSS
Backend: Node.js + Express.js
Database: MongoDB Atlas
Authentication: Google OAuth 2.0 + GitHub OAuth (via Passport.js)
Image Source: Unsplash API
Hosting:

Frontend → Vercel

Backend → Render

🚀 Features

✅ OAuth Authentication — Secure login with Google or GitHub using Passport.js
✅ Top Searches Banner — Displays the 5 most frequent search terms across all users
✅ Image Search — Authenticated users can search images via Unsplash API
✅ Multi-select Grid — Select multiple images with checkboxes
✅ Personal Search History — View your own past searches
✅ Responsive UI — Built with Tailwind for mobile and desktop users

🧩 Project Structure
mern-oauth-image-search/
├── client/                # React + Vite frontend
│   ├── src/               # Components and UI logic
│   ├── package.json       # Vite & React dependencies
│   └── vite.config.js
│
├── server/                # Express backend with Passport OAuth
│   ├── routes/            # API and Auth routes
│   ├── config/            # Passport strategies (Google + GitHub)
│   ├── models/            # Mongoose schemas
│   ├── server.js          # Entry point
│   └── package.json
│
└── README.md

⚙️ Environment Setup
🧩 Backend .env (Render)
MONGO_URI=your_mongo_connection_string
SESSION_SECRET=mysecretkey123
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
BASE_URL=https://<your-render-app>.onrender.com
CLIENT_URL=https://<your-vercel-site>.vercel.app

🧩 Frontend .env (optional)
VITE_API_URL=https://<your-render-app>.onrender.com

🧪 API Endpoints
Method	Endpoint	Description
GET	/api/top-searches	Fetch top 5 most frequent search terms
POST	/api/search	Search images on Unsplash (authenticated)
GET	/api/history	Fetch personal search history
GET	/auth/google	Login via Google
GET	/auth/github	Login via GitHub
GET	/auth/logout	Logout user
🧰 Installation (Local)
# 1. Clone the repository
git clone https://github.com/Anuneet323/mern-oauth-image-search.git

# 2. Install backend dependencies
cd server
npm install

# 3. Install frontend dependencies
cd ../client
npm install

# 4. Run the backend
cd ../server
npm start

# 5. Run the frontend (in another terminal)
cd ../client
npm run dev


Then open → http://localhost:5173

🌍 Live Deployment

Frontend: (https://mern-oauth-image-search.vercel.app/)

Backend: (https://mern-auth-backend-frjy.onrender.com/)

🧠 Author

👨‍💻 Anuneet Singh Chauhan
B.Tech CSE (IoT Specialization)
Full Stack Developer | Passionate about scalable apps & cloud integration
🔗 LinkedIn
 | GitHub

💬 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork this repo and submit a PR 🚀

🧾 License

This project is licensed under the MIT License
