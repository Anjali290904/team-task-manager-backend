import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    await API.post("/auth/signup", form);
    navigate("/");
  };

  return (
    <form onSubmit={submit}>
      <h2>Signup</h2>

      <input placeholder="Name"
        onChange={(e)=>setForm({...form,name:e.target.value})}/>

      <input placeholder="Email"
        onChange={(e)=>setForm({...form,email:e.target.value})}/>

      <input type="password" placeholder="Password"
        onChange={(e)=>setForm({...form,password:e.target.value})}/>

      <button>Create Account</button>
    </form>
  );
}