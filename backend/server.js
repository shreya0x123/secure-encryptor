const express = require("express");
const cors = require("cors");
const CryptoJS = require("crypto-js");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors()); // Allow all origins
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// CORS Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// Function to ensure a valid 32-byte key for AES encryption
function getFixedKey(key) {
  return CryptoJS.enc.Utf8.parse(key.padEnd(32, "0").substring(0, 32));
}

// AES encryption function
function encryptText(text, key) {
  const formattedKey = getFixedKey(key);

  return CryptoJS.AES.encrypt(text, formattedKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
}

// AES decryption function with improved error handling
function decryptText(ciphertext, key) {
  try {
    const formattedKey = getFixedKey(key);
    const bytes = CryptoJS.AES.decrypt(ciphertext, formattedKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedText) throw new Error();

    return decryptedText;
  } catch (error) {
    throw new Error("Decryption failed. Invalid key or ciphertext.");
  }
}

// Encrypt API
app.post("/encrypt", (req, res) => {
  console.log("🔒 Encrypt Request Received:", req.body);

  const { text, key } = req.body;
  if (!text || !key) {
    console.error("❌ Missing encryption parameters:", { text, key });
    return res.status(400).json({ error: "Text and key are required." });
  }

  const encrypted = encryptText(text, key);
  res.json({ encrypted });
});

// Decrypt API
app.post("/decrypt", (req, res) => {
  console.log("🔑 Decrypt Request Received:", req.body);

  const { ciphertext, key } = req.body;
  if (!ciphertext || !key) {
    console.error("❌ Missing decryption parameters:", { ciphertext, key });
    return res.status(400).json({ error: "Ciphertext and key are required." });
  }

  try {
    const decrypted = decryptText(ciphertext, key);
    console.log("✅ Successfully decrypted:", decrypted);
    res.json({ decrypted });
  } catch (error) {
    console.error("❌ Decryption failed:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
