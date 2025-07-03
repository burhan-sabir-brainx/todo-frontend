import { api } from './api';
import { ENDPOINTS } from '../config/apiConfig';

export const todoService = {
    getAllTodos: async () => {
        try {
            const response = await api.get(ENDPOINTS.TODOS);
            return response.todos || response;
        } catch (error) {
            console.error('Error fetching todos:', error);
            throw new Error('Failed to fetch todos');
        }
    },

    createTodo: async (todoData) => {
        try {
            const response = await api.post(ENDPOINTS.TODOS, {
                todo: {
                    text: todoData.text,
                    completed: false
                }
            });
            return response.todo || response;
        } catch (error) {
            console.error('Error creating todo:', error);
            throw new Error('Failed to create todo');
        }
    },

    updateTodo: async (id, todoData) => {
        try {
            const response = await api.put(ENDPOINTS.TODO_BY_ID(id), {
                todo: todoData
            });
            return response.todo || response;
        } catch (error) {
            console.error('Error updating todo:', error);
            throw new Error('Failed to update todo');
        }
    },

    deleteTodo: async (id) => {
        try {
            await api.delete(ENDPOINTS.TODO_BY_ID(id));
            return { success: true };
        } catch (error) {
            console.error('Error deleting todo:', error);
            throw new Error('Failed to delete todo');
        }
    },

    toggleTodo: async (id, completed) => {
        try {
            const response = await api.put(ENDPOINTS.TODO_BY_ID(id), {
                todo: { completed }
            });
            return response.todo || response;
        } catch (error) {
            console.error('Error toggling todo:', error);
            throw new Error('Failed to toggle todo');
        }
    }
}; 