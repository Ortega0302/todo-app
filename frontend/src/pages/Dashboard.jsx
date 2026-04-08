import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TodoList from '../components/TodoList';
import AddTodoForm from '../components/AddTodoForm';
import ProfileDropdown from '../components/ProfileDropdown';

function Dashboard() {
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);
    const [sortOrder, setSortOrder] = useState('newest');
    const [profile, setProfile] = useState({ displayName: '', email: '', profileImage: '' });
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const authHeader = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const fetchTodos = () => {
        axios.get('http://localhost:8080/api/todos', authHeader)
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error fetching todos:', error));
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchTodos();
        axios.get('http://localhost:8080/api/user/profile', authHeader)
            .then(response => setProfile(response.data))
            .catch(error => console.error('Error fetching profile:', error));
    }, []);

    const toggleTodo = (todo) => {
        axios.put(`http://localhost:8080/api/todos/${todo.id}`, {
            ...todo,
            completed: !todo.completed
        }, authHeader)
            .then(() => fetchTodos())
            .catch(error => console.error('Error updating todo:', error));
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/todos/${id}`, authHeader);
            fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const editTodo = (todo) => {
        setEditingTodo(todo);
    };

    const saveEdit = (updatedTodo) => {
        axios.put(`http://localhost:8080/api/todos/${updatedTodo.id}`, updatedTodo, authHeader)
            .then(() => {
                setEditingTodo(null);
                fetchTodos();
            })
            .catch(error => console.error('Error updating todo:', error));
    };

    const cancelEdit = () => {
        setEditingTodo(null);
    };

    const clearCompleted = async () => {
        const completedTodos = todos.filter(todo => todo.completed);
        try {
            await Promise.all(
                completedTodos.map(todo => axios.delete(`http://localhost:8080/api/todos/${todo.id}`, authHeader))
            );
            fetchTodos();
        } catch (error) {
            console.error('Error clearing completed:', error);
        }
    };

    const sortedTodos = [...todos].sort((a, b) => {
        if (sortOrder === 'newest') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
    });

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Todo App</h1>
                    <ProfileDropdown profile={profile} />
                </div>
                <AddTodoForm onTodoAdded={fetchTodos} token={token} />
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

export default Dashboard;