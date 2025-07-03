import { useState, useEffect } from 'react';
import { todoService } from '../services/todoService';

export const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Fetch todos from backend
    const fetchTodos = async () => {
        try {
            setLoading(true);
            setError(null);
            const fetchedTodos = await todoService.getAllTodos();
            setTodos(fetchedTodos);
        } catch (err) {
            setError('Failed to load todos. Please try again.');
            console.error('Error fetching todos:', err);
        } finally {
            setLoading(false);
        }
    };

    // Add a new todo
    const addTodo = async (text) => {
        if (!text.trim() || submitting) return false;

        try {
            setSubmitting(true);
            setError(null);
            const newTodo = await todoService.createTodo({ text: text.trim() });
            setTodos(prevTodos => [...prevTodos, newTodo]);
            return true;
        } catch (err) {
            setError('Failed to add todo. Please try again.');
            console.error('Error adding todo:', err);
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    // Toggle todo completion status
    const toggleTodo = async (id) => {
        const todo = todos.find(t => t.id === id);
        if (!todo) return;

        try {
            setError(null);
            const updatedTodo = await todoService.toggleTodo(id, !todo.completed);
            setTodos(prevTodos =>
                prevTodos.map(t => t.id === id ? updatedTodo : t)
            );
        } catch (err) {
            setError('Failed to update todo. Please try again.');
            console.error('Error toggling todo:', err);
        }
    };

    // Delete a todo
    const deleteTodo = async (id) => {
        try {
            setError(null);
            await todoService.deleteTodo(id);
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        } catch (err) {
            setError('Failed to delete todo. Please try again.');
            console.error('Error deleting todo:', err);
        }
    };

    // Load todos on mount
    useEffect(() => {
        fetchTodos();
    }, []);

    // Computed values
    const completedCount = todos.filter(todo => todo.completed).length;
    const totalCount = todos.length;

    return {
        todos,
        loading,
        error,
        submitting,
        completedCount,
        totalCount,
        addTodo,
        toggleTodo,
        deleteTodo,
        fetchTodos,
    };
}; 