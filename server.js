import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
const uri = "your_mongodb_atlas_connection_string";
mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error(err));

// Schema
const ResponseSchema = new mongoose.Schema({
  userName: String,
  userArid: String,
  image: String,
  selectedOption: String,
  createdAt: { type: Date, default: Date.now }
});

const Response = mongoose.model("Response", ResponseSchema);

// API endpoint
app.post("/api/save-response", async (req, res) => {
  try {
    await Response.insertMany(req.body);
    res.json({ message: "Responses saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving responses" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
