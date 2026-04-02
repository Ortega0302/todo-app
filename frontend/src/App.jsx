import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';

function App() {
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);

    const fetchTodos = () => {
        axios.get('http://localhost:8080/api/todos')
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error fetching todos:', error));
    };

    const toggleTodo = (todo) => {
        axios.put(`http://localhost:8080/api/todos/${todo.id}`, {
            ...todo,
            completed: !todo.completed
        })
            .then(() => fetchTodos())
            .catch(error => console.error('Error updating todo:', error));
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/todos/${id}`);
            fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const editTodo = (todo) => {
        setEditingTodo(todo);
    };

    const saveEdit = (updatedTodo) => {
        axios.put(`http://localhost:8080/api/todos/${updatedTodo.id}`, updatedTodo)
            .then(() => {
                setEditingTodo(null);
                fetchTodos();
            })
            .catch(error => console.error('Error updating todo:', error));
    };

    const cancelEdit = () => {
        setEditingTodo(null);
    };

    const [sortOrder, setSortOrder] = useState('newest');

    const sortedTodos = [...todos].sort((a, b) => {
        if (sortOrder === 'newest') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }else{
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
    });

    const clearCompleted = async () => {
        const completedTodos = todos.filter(todo => todo.completed);
        try {
            await  Promise.all(
                completedTodos.map(todo => axios.delete(`http://localhost:8080/api/todos/${todo.id}`))
            );
            fetchTodos();
        } catch (error){
            console.error('Error clearing completed:', error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">Todo App</h1>
                <AddTodoForm onTodoAdded={fetchTodos} />
                <div className="flex gap-4 mb-4">
                    <button
                        onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                        className="bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded px-4 py-2 transition"
                    >
                        Sort: {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
                    </button>
                    <button
                        onClick={clearCompleted}
                        className="bg-red-700 hover:bg-red-600 text-gray-300 text-sm rounded px-4 py-2 transition"
                    >
                        Clear Completed
                    </button>
                </div>

                <TodoList
                    todos={sortedTodos}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    editingTodo={editingTodo}
                    onEdit={editTodo}
                    onSave={saveEdit}
                    onCancel={cancelEdit}
                />
            </div>

        </div>
    );
}

export default App;