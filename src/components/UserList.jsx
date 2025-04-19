'use client';
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '../features/users/userSlice.js';
import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export default function UserList() {
  const { data: users = [], isLoading } = useGetUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password) return alert('Please fill all fields');
    await createUser(formData);
    setFormData({ name: '', email: '', password: '' });
    window.location.reload();
  };

  const handleUpdate = async (id) => {
    const newName = prompt('Enter new name:');
    if (!newName) return;
    await updateUser({ id, data: { name: newName } });
    window.location.reload();
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-gradient-to-br from-white via-gray-50 to-white shadow-xl rounded-2xl">
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-700">User Management Panel</h1>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
       />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white rounded-xl p-3 hover:bg-blue-700 transition duration-300 shadow-md"
        >
          Add User
        </button>
      </div>

      {/* User List */}
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center bg-white p-5 rounded-xl shadow hover:shadow-md transition duration-300"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleUpdate(user._id)}
                  className="text-blue-600 hover:text-blue-800 transition"
                  title="Edit"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-600 hover:text-red-800 transition"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
