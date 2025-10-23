import TaskForm from "../components/TaskForm";
export default function AddTaskPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Add Task</h1>
      <p>Here you can add a new task.</p>
      <TaskForm/>
    </div>
  );
}
