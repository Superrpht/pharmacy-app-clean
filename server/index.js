const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5050;

// 1. CORS + preflight
app.use(cors({ origin: "http://localhost:1234", credentials: true }));
app.options("*", cors());

// 2. JSON bodies
app.use(express.json());

// 3. POST /login only
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password are required" });
  // dummy users
  const users = [
    { username: "travis", password: "password123", name: "Travis" },
    { username: "jane",   password: "secret321",   name: "Jane"   }
  ];
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  return res.json({ user: { username: user.username, name: user.name } });
});

// 4. 404 + error‐handler
app.use((_, res) => res.status(404).json({ message: "Not found" }));
app.use((err, _, res, __) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => console.log(`Auth server listening on http://localhost:${PORT}`));
