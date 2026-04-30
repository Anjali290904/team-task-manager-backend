import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const navigate = useNavigate();

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ================= FETCH TASKS =================
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= ADD TASK =================
  const addTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      await API.post("/tasks", { title });

      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE TASK =================
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= EDIT =================
  const startEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
  };

  const updateTask = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/tasks/${editId}`, {
        title: editTitle,
      });

      setEditId(null);
      setEditTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= LOAD =================
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Dashboard</h2>

      {/* 🚪 LOGOUT BUTTON */}
      <button onClick={logout}>Logout</button>

      <hr />

      {/* ================= FORM ================= */}
      {editId ? (
        <form onSubmit={updateTask}>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <button type="submit">Update</button>
          <button onClick={() => setEditId(null)}>Cancel</button>
        </form>
      ) : (
        <form onSubmit={addTask}>
          <input
            placeholder="Enter task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      )}

      <hr />

      {/* ================= TASK LIST ================= */}
      {tasks.map((task) => (
        <div
          key={task._id}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>{task.title}</span>

          <div>
            <button onClick={() => startEdit(task)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;