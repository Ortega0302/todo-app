import { useState } from 'react';
import axios from 'axios';

function AddTodoForm({ onTodoAdded }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/todos', { title, description })
            .then(() => {
                onTodoAdded();
                setTitle('');
                setDescription('');
            })
            .catch(error => {
                console.error('Error creating todo:', error);
            });
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
            <form onSubmit={handleSubmit} className="flex gap-4 items-end">
                <div className="flex-1">
                    <label className="block text-sm text-gray-400 mb-1">Todo</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="What needs to be done?"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm text-gray-400 mb-1">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add details..."
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded px-6 py-2 transition"
                >
                    Add
                </button>
            </form>
        </div>
    );
}

export default AddTodoForm;