import React, { useEffect, useState } from "react";
import axios from "axios";

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [form, setForm] = useState({ name: "", type: "", location: "" });
  const [editingId, setEditingId] = useState(null);

  // Cargar candidatos al iniciar
  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/candidates`)
      .then((res) => setCandidates(res.data))
      .catch((err) => console.error(err));
  };

  // Manejar inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Crear o actualizar candidato
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Actualizar
      axios
        .put(`${process.env.REACT_APP_API_BASE_URL}/candidates/${editingId}`, form)
        .then(() => {
          fetchCandidates();
          setForm({ name: "", type: "", location: "" });
          setEditingId(null);
        })
        .catch((err) => console.error(err));
    } else {
      // Crear
      axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/candidates`, form)
        .then(() => {
          fetchCandidates();
          setForm({ name: "", type: "", location: "" });
        })
        .catch((err) => console.error(err));
    }
  };

  // Eliminar candidato
  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/candidates/${id}`)
      .then(() => fetchCandidates())
      .catch((err) => console.error(err));
  };

  // Cargar candidato en el formulario para editar
  const handleEdit = (candidate) => {
    setForm({ name: candidate.name, type: candidate.type, location: candidate.location });
    setEditingId(candidate._id);
  };

  return (
    <div>
      <h1>Candidate Manager</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="type"
          placeholder="Type"
          value={form.type}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Update Candidate" : "Add Candidate"}</button>
      </form>

      {/* Lista de candidatos */}
      <ul>
        {candidates.map((c) => (
          <li key={c._id}>
            {c.name} - {c.type} - {c.location}
            <button onClick={() => handleEdit(c)}>Edit</button>
            <button onClick={() => handleDelete(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Candidates;
