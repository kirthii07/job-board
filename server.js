const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Fake in-memory DB
let jobs = [];
let id = 1;

// Add a job
app.post("/jobs", (req, res) => {
  const job = { id: id++, ...req.body };
  jobs.push(job);
  res.json(job);
});

// Get all jobs
app.get("/jobs", (req, res) => {
  res.json(jobs);
});
app.get("/", (req, res) => {
  res.send("✅ Job Board Backend is running!");
});


app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
