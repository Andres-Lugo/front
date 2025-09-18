import React, { useEffect, useState } from "react";
import axios from "axios";
import './candidates.css';


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
  <div className="container">
    <h1>Formulario</h1>

    {/* Formulario */}
    <form onSubmit={handleSubmit} className="form">
  <div className="form-group">
    <label htmlFor="name">Nombre</label>
    <input
      id="name"
      name="name"
      type="text"
      value={form.name}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label htmlFor="type">Tipo</label>
    <input
      id="type"
      name="type"
      type="text"
      value={form.type}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label htmlFor="location">Ubicación</label>
    <input
      id="location"
      name="location"
      type="text"
      value={form.location}
      onChange={handleChange}
      required
    />
  </div>

  <button type="submit">{editingId ? "Actualizar candidato" : "Agregar candidato"}</button>
</form>
    {/* Lista de candidatos */}
    <ul>
      {candidates.map((c) => (
        <li key={c._id}>
          {c.name} - {c.type} - {c.location}
          <button onClick={() => handleEdit(c)}>Editar</button>
          <button onClick={() => handleDelete(c._id)}>Borrar</button>
        </li>
      ))}
    </ul>
  </div>
);

}

export default Candidates;
