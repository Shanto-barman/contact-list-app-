import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/contacts").then((res) => {
      setContacts(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/contacts", form).then((res) => {
      setContacts([...contacts, res.data]);
      setForm({ name: "", email: "", phone: "" });
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/contacts/${id}`).then(() => {
      setContacts(contacts.filter((d) => d._id !== id));
    });
  };

  return (
    <div className="container mt-5">
      <h2> Contact List</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="form-control mb-2"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="form-control mb-2"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="form-control mb-2"
          required
        />
        <button className="btn btn-primary w-100">Add Contact</button>
      </form>

      <ul className="list-group">
        {contacts.map((d) => (
          <li
            key={d._id}
            className="list-group-item d-flex justify-content-between"
          >
            <span>
              <b>{d.name}</b> <br />
              {d.email} <br /> {d.phone}
            </span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(d._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
