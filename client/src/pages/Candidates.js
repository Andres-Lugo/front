import React, { useEffect, useState } from "react";
import axios from "axios";

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [form, setForm] = useState({ name: "", type: "", location: "" });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/candidates`)
      .then((res) => setCandidates(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Candidates</h1>
      <ul>
        {candidates.map((c) => (
          <li key={c._id}>
            {c.name} - {c.type} - {c.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Candidates;
