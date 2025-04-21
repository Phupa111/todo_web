import { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";

import {
  deleteTodo,
  getTodosByOwnerId,
  getTodosById,
} from "../../services/todoapi";
import { useAuth } from "../../contexts/AuthContext";
import TaskModal from "../../components/modal/modal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const apiUrl = import.meta.env.VITE_API_URL;

const ToDoPage = () => {
  const { user, isLoggedIn } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const [todo, setTodo] = useState([]);
  useEffect(() => {
    const fetchTodos = async () => {
      if (!isLoggedIn || !user?.user.id) {
        setError("Please log in to view your tasks.");
        setTodos([]);
        return;
      }

      setLoading(true);
      try {
        const response = await getTodosByOwnerId(user.user.id, page, pageSize);
        console.log("res", response.data);
        setTodos(response.data.items);
        setTotalPages(response.data.totalPages);
        setError(null);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch tasks");
        setTodos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [user, isLoggedIn, page, pageSize]);

  const handleDelete = async (todoId) => {
    if (!user?.user.id) {
      setError("Please log in to delete tasks.");
      return;
    }

    try {
      await deleteTodo(todoId);
      setTodos(todos.filter((todo) => todo.id !== todoId));
      setError(null);
    } catch (err) {
      setError(err.response?.data || "Failed to delete task");
    }
  };

  const handleEdit = async (todoId) => {
    setIsModalOpen(true);
    setIsEdit(true);

    try {
      const response = await getTodosById(todoId);

      setTodo(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to Edit");
    }
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-purple-100 py-20 px-6 text-center">
        <p className="text-xl text-gray-800">
          Please log in to view your tasks.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-purple-100 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800">📝 My Tasks</h1>
          <p className="text-gray-500">Stay productive and crush your goals!</p>
        </header>

        {loading && (
          <div className="text-center text-gray-600 flex items-center justify-center">
            <Loader2 className="animate-spin mr-2" size={24} />
            Loading tasks...
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {!loading && todos.length === 0 && (
          <div className="text-center text-gray-600">No tasks found.</div>
        )}

        {!loading && todos.length > 0 && (
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
                      todo.isDone
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {todo.title}
                  </span>
                </div>
                <div className="flex flex-row gap-4">
                  <button
                    onClick={() => handleEdit(todo.id)} // ใส่ฟังก์ชัน handleEdit ที่รับ todo object ไปแก้ไข
                    className="text-sm text-blue-500 hover:underline"
                  >
                    <EditOutlined />
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400 hover:bg-blue-600 transition"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400 hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 mt-6 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          <Plus size={20} />
          Add New Task
        </button>
      </div>
      <TaskModal
        isOpen={isModalOpen}
        isEdit={isEdit}
        onClose={() => {
          setIsModalOpen(false), setIsEdit(false);
        }}
        todo={todo}
        setTodos={setTodos}
      />
    </div>
  );
};

export default ToDoPage;
