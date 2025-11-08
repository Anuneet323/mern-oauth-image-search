import React, { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [term, set] = useState("");
  const [images, setImages] = useState([]);
  const [sel, setS] = useState([]);
  const [top, setT] = useState([]);
  const [hist, setH] = useState([]);

  // Load user & top searches
  useEffect(() => {
    fetch("http://localhost:5000/auth/user", { credentials: "include" })
      .then((r) => r.json())
      .then(setUser);

    fetch("http://localhost:5000/api/top-searches")
      .then((r) => r.json())
      .then(setT);
  }, []);

  const search = async () => {
    const data = await fetch("http://localhost:5000/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ term }),
    }).then((r) => r.json());

    setImages(data.images || []);

    setH(
      await fetch("http://localhost:5000/api/history", {
        credentials: "include",
      }).then((r) => r.json())
    );
  };

  // ✅ LOGIN PAGE (Google + GitHub)
  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500">
        <div className="bg-white/20 backdrop-blur-xl p-12 rounded-3xl border border-white/30 shadow-2xl w-[380px] text-center">
          <h1 className="text-white text-4xl font-extrabold drop-shadow-md">
            Welcome 👋
          </h1>
          <p className="text-white/80 mt-2 mb-8">
            Sign in to browse and save beautiful images
          </p>

          <div className="space-y-3">
            {/* Google Login */}
            <button
              onClick={() => (window.location = "http://localhost:5000/auth/google")}
              className="flex items-center justify-center gap-3 w-full bg-white text-gray-800 py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                className="w-6 h-6"
              />
              Continue with Google
            </button>

            {/* GitHub Login */}
            <button
              onClick={() => (window.location = "http://localhost:5000/auth/github")}
              className="flex items-center justify-center gap-3 w-full bg-gray-900 text-white py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                className="w-6 h-6 invert"
              />
              Continue with GitHub
            </button>
          </div>

          <p className="text-white/60 text-sm mt-6">
            Secure OAuth • No password needed ✅
          </p>
        </div>
      </div>
    );

  // ✅ DASHBOARD UI (After Login)
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Hello,{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse">
            {user.name}
          </span>
          👋
        </h1>

        <button
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transition"
          onClick={() => (window.location = "http://localhost:5000/auth/logout")}
        >
          Logout
        </button>
      </div>

      {/* TRENDING SEARCHES */}
      <div className="bg-white p-5 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          🔥 Trending Searches
        </h2>
        <p className="text-gray-600">
          {top.map((x) => x._id).join(", ") || "No searches yet"}
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="flex gap-3 items-center">
        <input
          value={term}
          onChange={(e) => set(e.target.value)}
          placeholder="Search breathtaking images..."
          className="flex-1 p-4 text-lg rounded-2xl border border-gray-300 shadow focus:ring-2 focus:ring-purple-500 outline-none transition"
        />
        <button
          onClick={search}
          className="bg-purple-600 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-md hover:bg-purple-700 hover:scale-105 transition"
        >
          Search
        </button>
      </div>

      {/* SELECTED COUNTER */}
      <p className="text-lg font-medium">Selected: {sel.length}</p>

      {/* IMAGE GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {images.map((i) => (
          <div
            key={i.id}
            className="relative group cursor-pointer shadow-lg rounded-2xl overflow-hidden"
          >
            <img
              src={i.url}
              alt={i.alt || "image"}
              className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-300"
            />
            <input
              type="checkbox"
              checked={sel.includes(i.id)}
              onChange={() =>
                setS((p) =>
                  p.includes(i.id)
                    ? p.filter((x) => x !== i.id)
                    : [...p, i.id]
                )
              }
              className="absolute top-3 left-3 w-6 h-6 cursor-pointer drop-shadow-lg"
            />
          </div>
        ))}
      </div>

      {/* HISTORY SECTION */}
      <div className="bg-white p-5 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-3">🕒 Your Search History</h3>
        <ul className="text-gray-600 space-y-1 text-lg">
          {hist.map((h) => (
            <li key={h._id}>• {h.term}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
