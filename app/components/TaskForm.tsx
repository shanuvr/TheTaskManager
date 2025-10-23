"use client";
import { useState } from "react";
import axios from "axios";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const response = await axios.post("/api/tasks", { title, description });

    if (response.status === 201) {
      setTitle("");
      setDescription("");
      setMessage("Task added successfully.");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Failed to add task.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border border-black rounded">
      <h2 className="text-lg font-bold mb-4 text-center">Add New Task</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-black p-2 rounded focus:outline-none"
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border border-black p-2 rounded focus:outline-none resize-none"
            placeholder="Enter task description"
            rows={3}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white p-2 rounded"
        >
          Add Task
        </button>
      </div>

      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
}
