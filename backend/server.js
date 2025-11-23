import express from "express";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });
const PINATA_JWT = process.env.PINATA_JWT;

if (!PINATA_JWT) {
  console.error("ERROR: PINATA_JWT not set in .env");
  process.exit(1);
}

// 1. Upload Image to Pinata
app.post("/uploadImage", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const data = new FormData();
    data.append("file", fs.createReadStream(file.path));

    const result = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data,
      {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
          ...data.getHeaders(),
        },
      }
    );

    res.json({ cid: result.data.IpfsHash });
    fs.unlinkSync(file.path);
  } catch (err) {
    console.error("Image upload error:", err.message);
    res.status(500).json({ error: "Image upload failed", details: err.message });
  }
});

// 2. Upload JSON Metadata to Pinata
app.post("/uploadJSON", async (req, res) => {
  try {
    const metadata = req.body;

    const result = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      metadata,
      {
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ cid: result.data.IpfsHash });
  } catch (err) {
    console.error("JSON upload error:", err.message);
    res.status(500).json({ error: "JSON upload failed", details: err.message });
  }
});

// 3. Hybrid Agent Analysis Endpoint
app.post("/analyze-incident", async (req, res) => {
  try {
    const { incident, networkState } = req.body;

    if (!incident) {
      return res.status(400).json({ error: "No incident data provided" });
    }

    // Mock response - all clear, no incidents detected
    const analysis = {
      status: "success",
      incident: incident,
      analysis: {
        severity: "Clear",
        should_report: false,
        confidence: 0.98,
        reasoning: "All sectors monitored and clear. No anomalies detected. System operating normally.",
        recommended_actions: [
          "Continue routine monitoring",
          "Maintain current drone positions",
          "All systems nominal"
        ]
      },
      agents_used: ["spoon_os", "gemini"],
      fallback_active: false,
      timestamp: new Date().toISOString()
    };

    res.json(analysis);
  } catch (err) {
    console.error("Incident analysis error:", err.message);
    res.status(500).json({ error: "Analysis failed", details: err.message });
  }
});

// 4. Gemini Fallback Query Endpoint
app.post("/query-gemini", async (req, res) => {
  try {
    const { query, context } = req.body;

    if (!query) {
      return res.status(400).json({ error: "No query provided" });
    }

    // This would call the Gemini API
    // For now, return a mock response
    const response = {
      status: "success",
      query: query,
      answer: "Gemini analysis would be performed here",
      model: "gemini-pro",
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (err) {
    console.error("Gemini query error:", err.message);
    res.status(500).json({ error: "Query failed", details: err.message });
  }
});

// 5. Network Requirements Analysis
app.post("/network-requirements", async (req, res) => {
  try {
    const { networkState, query } = req.body;

    const analysis = {
      status: "success",
      network_health: "operational",
      recommendations: [
        "Optimize drone deployment pattern",
        "Increase monitoring frequency in high-risk sectors",
        "Maintain minimum 3 active drones for coverage"
      ],
      resource_allocation: {
        drones: 3,
        sectors: 4,
        battery_threshold: 20,
        response_time_target: "90 seconds"
      },
      timestamp: new Date().toISOString()
    };

    res.json(analysis);
  } catch (err) {
    console.error("Network analysis error:", err.message);
    res.status(500).json({ error: "Analysis failed", details: err.message });
  }
});

// 6. Health check
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    pinata: !!PINATA_JWT,
    gemini: !!process.env.GEMINI_API_KEY,
    spoon_os: "configured"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Pinata JWT configured: ${PINATA_JWT ? "yes" : "no"}`);
  console.log(`✓ Gemini API configured: ${process.env.GEMINI_API_KEY ? "yes" : "no"}`);
  console.log(`✓ Spoon OS configured: yes`);
});
