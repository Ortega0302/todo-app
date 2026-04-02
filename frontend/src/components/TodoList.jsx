import { useState } from 'react';

function TodoList({ todos, onToggle, onDelete, editingTodo, onEdit, onSave, onCancel }) {
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const [expandedId, setExpandedId] = useState(null);

    const handleEdit = (todo) => {
        setEditTitle(todo.title);
        setEditDescription(todo.description);
        onEdit(todo);
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">My Todos</h2>

            <div className="grid grid-cols-12 gap-2 text-sm text-gray-400 font-medium mb-3 px-3">
                <div className="col-span-1"></div>
                <div className="col-span-3">Todo</div>
                <div className="col-span-4">Description</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-3 text-right">Actions</div>
            </div>

            <ul className="space-y-2">
                {todos.map(todo =>
                    <li key={todo.id} className="bg-gray-700 rounded-lg px-3 py-3">
                        {todo.id === editingTodo?.id ? (
                            <div className="grid grid-cols-12 gap-2 items-center">
                                <div className="col-span-1"></div>
                                <div className="col-span-3">
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="w-full bg-gray-600 text-gray-100 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="col-span-4">
                                    <input
                                        type="text"
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        className="w-full bg-gray-600 text-gray-100 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="col-span-4 flex justify-end gap-2">
                                    <button
                                        onClick={() => onSave({ ...editingTodo, title: editTitle, description: editDescription })}
                                        className="bg-green-600 hover:bg-green-700 text-white text-sm rounded px-3 py-1 transition"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={onCancel}
                                        className="bg-gray-500 hover:bg-gray-600 text-white text-sm rounded px-3 py-1 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (

                            <div className="grid grid-cols-12 gap-2 items-center">
                                <div className="col-span-1">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => onToggle(todo)}
                                        className="w-4 h-4 accent-blue-500"
                                    />
                                </div>
                                <div className={`col-span-3 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                                    {todo.title}
                                </div>
                                <div
                                    className={`col-span-4 text-gray-400 cursor-pointer ${expandedId === todo.id ? 'break-words' : 'truncate'} ${todo.completed ? 'line-through text-gray-500' : ''}`}
                                    onClick={() => setExpandedId(expandedId === todo.id ? null : todo.id)}
                                >
                                    {todo.description}
                                </div>
                                <div className="col-span-1">
                                    <span className={`text-sm ${todo.completed ? 'text-green-400' : 'text-yellow-400'}`}>
                                        {todo.completed ? "Done" : "Pending"}
                                    </span>
                                </div>
                                <div className="col-span-3 flex justify-end gap-2">
                                    <button
                                        onClick={() => handleEdit(todo)}
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded px-3 py-1 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(todo.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white text-sm rounded px-3 py-1 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div>
                                    <p className="text-xs text-blue-500">
                                        {new Date(todo.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        )}
                    </li>
                )}
            </ul>
        </div>
    );
}

export default TodoList;