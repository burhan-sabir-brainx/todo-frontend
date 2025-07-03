import React, { useState } from 'react';
import { useTodos } from '../../hooks/useTodos';
import './todolist.css';

export default function TodoList() {
    const [inputValue, setInputValue] = useState('');
    const {
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
    } = useTodos();

    const handleAddTodo = async () => {
        const success = await addTodo(inputValue);
        if (success) {
            setInputValue('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    };

    if (loading) {
        return (
            <div className="todo-list-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading todos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="todo-list-container">
            <h1>My Todo List</h1>

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={fetchTodos} className="retry-button">
                        Retry
                    </button>
                </div>
            )}

            <div className="todo-stats">
                <span>{completedCount} of {totalCount} completed</span>
            </div>

            <div className="add-todo-section">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a new todo..."
                    className="todo-input"
                    disabled={submitting}
                />
                <button
                    onClick={handleAddTodo}
                    className={`add-button ${submitting ? 'loading' : ''}`}
                    disabled={submitting || inputValue.trim() === ''}
                >
                    {submitting ? 'Adding...' : 'Add Todo'}
                </button>
            </div>

            <div className="todos-container">
                {todos.length === 0 ? (
                    <p className="no-todos">No todos yet. Add one above!</p>
                ) : (
                    todos.map(todo => (
                        <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                            <div className="todo-content">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id)}
                                    className="todo-checkbox"
                                />
                                <span className="todo-text">{todo.text}</span>
                            </div>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="delete-button"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}