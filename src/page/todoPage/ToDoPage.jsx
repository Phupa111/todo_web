import React from "react";
import { Plus } from "lucide-react";

const ToDoPage = () => {
  const todos = [
    { id: 1, title: "Finish UI design", isDone: false },
    { id: 2, title: "Write API docs", isDone: true },
    { id: 3, title: "Deploy to server", isDone: false },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-purple-100 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800">📝 My Tasks</h1>
          <p className="text-gray-500">Stay productive and crush your goals!</p>
        </header>
        <div className="bg-white rounded-xl shadow-lg divide-y divide-gray-200">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex justify-between items-center px-4 py-3 ${
                todo.isDone ? "bg-green-50" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  className="w-5 h-5 text-purple-600"
                  readOnly
                />
                <span
                  className={`text-lg ${
                    todo.isDone ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {todo.title}
                </span>
              </div>
              <button className="text-sm text-red-500 hover:underline">
                Delete
              </button>
            </div>
          ))}
        </div>
        <button className="flex items-center gap-2 mt-6 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
          <Plus size={20} />
          Add New Task
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
