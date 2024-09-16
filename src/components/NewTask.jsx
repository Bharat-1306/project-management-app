import { useState } from "react";
export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState("");

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleTaskClick() {
    onAdd(enteredTask);
    setEnteredTask("");
    //trasfer back to app.js
  }
  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 p-1 borber-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        onChange={handleChange}
        value={enteredTask}
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleTaskClick}
      >
        Add Task
      </button>
    </div>
  );
}
