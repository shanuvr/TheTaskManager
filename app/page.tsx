"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./components/TaskCard";

export default function HomePage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [showEdit, setShowEdit] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCompleted, setEditCompleted] = useState(false);

  const getTasks = async () => {
    try {
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
  if (!confirmed) return;
    await axios.delete(`/api/tasks/${id}`);
    getTasks();
  };
//dfd
  const handleEdit = (task: any) => {
    setCurrentTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditCompleted(task.completed);
    setShowEdit(true);
  };

  const handleUpdate = async () => {
    if (!currentTaskId) return;

    await axios.put(`/api/tasks/${currentTaskId}`, {
      title: editTitle,
      description: editDescription,
      completed: editCompleted,
    });

    setShowEdit(false);
    setCurrentTaskId(null);
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <main className="min-h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-semibold mb-8 text-center">Task Tracker</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              _id={task._id}
              title={task.title}
              description={task.description}
              completed={task.completed}
              onDelete={handleDelete}
              onEdit={() => handleEdit(task)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No tasks yet.</p>
        )}
      </div>

      {showEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded p-6 space-y-4">
            <h2 className="text-xl font-medium text-center">Edit Task</h2>

            <input
              type="text"
              placeholder="Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full border border-black rounded px-3 py-2 focus:outline-none"
            />

            <textarea
              placeholder="Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={3}
              className="w-full border border-black rounded px-3 py-2 focus:outline-none resize-none"
            />

            <div>
              <label className="block mb-1 text-sm">Status</label>
              <select
                value={editCompleted ? "true" : "false"}
                onChange={(e) => setEditCompleted(e.target.value === "true")}
                className="w-full border border-black rounded px-3 py-2 focus:outline-none"
              >
                <option value="true">Completed</option>
                <option value="false">Pending</option>
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEdit(false)}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
