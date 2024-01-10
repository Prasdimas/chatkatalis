// src/pages/AddUser.js

import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [click, setClick] = useState(5);
  const history = useHistory();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name,
        email,
        password,
        click,
      });
      history.push("/dashboard");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <h1>Tambah Pengguna Baru</h1>
      <form onSubmit={saveUser}>
        <label>Nama:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label>Click:</label>
        <input type="number" value={click} onChange={(e) => setClick(e.target.value)} />

        <button type="submit">Simpan</button>
      </form>
    </div>
  );
};

export default AddUser;
