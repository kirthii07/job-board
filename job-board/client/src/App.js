import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: "", company: "", description: "" });

  // Fetch jobs from backend
  useEffect(() => {
    axios.get("http://localhost:5000/jobs").then(res => setJobs(res.data));
  }, []);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/jobs", form);
    setJobs([...jobs, res.data]); // update UI
    setForm({ title: "", company: "", description: "" }); // reset form
  };

  return (
    <div style={{ margin: "20px", fontFamily: "Arial" }}>
      <h1>Job Board</h1>

      {/* Job Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Job Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        /><br/>
        <input
          placeholder="Company"
          value={form.company}
          onChange={e => setForm({ ...form, company: e.target.value })}
        /><br/>
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        /><br/>
        <button type="submit">Post Job</button>
      </form>

      <hr />

      {/* Job List */}
      <h2>Available Jobs</h2>
      {jobs.map(job => (
        <div key={job.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{job.title}</h3>
          <p><b>Company:</b> {job.company}</p>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
