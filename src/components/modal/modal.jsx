import React, { useState, useEffect } from "react";
import { Modal, Button, Alert } from "antd";
import { addTodo, editTodoById } from "../../services/todoapi";
import { useAuth } from "../../contexts/AuthContext";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../form/FormInput";
import { useForm } from "react-hook-form";

const taskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be at most 100 characters" }),

  description: z
    .string()
    .max(500, { message: "Description must be at most 500 characters" })
    .optional(),
});

const TaskModal = ({ isOpen, isEdit, onClose, todo, setTodos }) => {
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(taskSchema) });

  useEffect(() => {
    if (isEdit && todo) {
      reset({
        title: todo.title || "",
        description: todo.description || "",
      });
    } else {
      reset({
        title: "",
        description: "",
      });
    }
  }, [isEdit, todo, reset, isOpen]);

  const handleEdit = async (data) => {
    if (!user?.user?.id) {
      setError("Please log in to edit tasks.");
    }

    try {
      setLoading(true);
      setError(null); // Clear any previous errors

      const editTodo = {
        title: data.title,
        description: data.description || "", // Ensure description exists
      };

      const response = await editTodoById(todo.id, editTodo);

      // Update the todos list in the parent component
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === todo.id ? response.data : t))
      );
      console.log(response.data);
      onClose(); // Close the modal after successful edit
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to edit task");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data) => {
    if (!user?.user?.id) {
      setError("Please log in to add tasks.");
      return;
    }

    try {
      setLoading(true);
      const newTodo = {
        title: data.title,
        description: data.description,
        isDone: false,
        ownerId: user.user.id,
      };

      const response = await addTodo(newTodo);
      setTodos((prev) => [...prev, response.data]);

      setError(null);
      onClose();
      reset();
    } catch (err) {
      console.error(err);
      setError("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={isEdit ? "Edit Task" : "Add New Task"}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      {error && (
        <Alert message={error} type="error" showIcon className="mb-4" />
      )}

      <form
        className="space-y-4"
        onSubmit={handleSubmit(isEdit ? handleEdit : handleAdd)}
      >
        <FormInput
          register={register}
          title="Title"
          name="title"
          type="text"
          placeholder="Enter task title"
          error={errors.title?.message}
        />
        <FormInput
          register={register}
          title="Description"
          name="description"
          type="text"
          placeholder="Enter task description"
          error={errors.description?.message}
          isTextArea={true}
        />
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {isEdit ? "Save Changes" : "Add"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;
