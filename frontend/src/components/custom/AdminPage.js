'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaTrash } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddAdminForm from './AddAdminForm';

export default function AdminPage() {
    const [admins, setAdmins] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    const fetchAdmins = async () => {
        try {
            const res = await axios.get('https://back.bishalpantha.com.np/api/admins');
            setAdmins(res.data.admins || []);
        } catch (err) {
            console.error('Error fetching admins:', err);
            toast.error('Failed to fetch admins');
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleView = (admin) => {
        setSelectedAdmin(admin);
        setShowViewModal(true);
    };

    const handleDelete = (admin) => {
        setSelectedAdmin(admin);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`https://back.bishalpantha.com.np/api/user/${selectedAdmin._id}`);
            toast.success('Admin deleted successfully!');
            fetchAdmins();
            setShowDeleteModal(false);
        } catch (err) {
            toast.error('Error deleting admin.');
            console.error('Error deleting admin:', err);
        }
    };

    return (
        <div className="p-6 ml-60 sm:ml-16 md:ml-10">
            <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-muted-foreground mb-4">
                    <span className="text-gray-500">Home</span> {'>'} <span className="text-blue-500">Admins</span>
                </div>
                <Button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600"
                >
                    Add Admin
                </Button>
            </div>

            {/* Table Layout */}
            <div className="overflow-x-auto shadow-lg mb-10">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4">Admins</th>
                            <th>Email ID</th>
                            <th>Role</th>
                            <th>Join Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin, i) => (
                            <tr key={i} className="border-t">
                                <td className="p-3 flex items-center gap-2">
                                    <div className="w-15 h-15 rounded-full border-4 border-white shadow-lg bg-gray-200 flex justify-center items-center">
                                        <span className="text-white">{admin.name[0]}</span>
                                    </div>
                                    {admin.name}
                                </td>
                                <td>{admin.email}</td>
                                <td>{admin.role}</td>
                                <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div className="flex gap-2 text-gray-500 cursor-pointer">
                                        <FaEye onClick={() => handleView(admin)} className="text-blue-500 cursor-pointer" />
                                        <FaTrash onClick={() => handleDelete(admin)} className="text-red-500 cursor-pointer" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Admin Modal */}
            {showViewModal && selectedAdmin && selectedAdmin.name && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-xl max-w-md w-full">
                        <h3 className="text-xl font-semibold">{selectedAdmin.name}</h3>
                        <div className="flex items-center gap-4 mt-4">
                            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-200 flex justify-center items-center">
                                <span className="text-white">{selectedAdmin.name[0]}</span>
                            </div>
                            <div>
                                <p><strong>Email:</strong> {selectedAdmin.email}</p>
                                <p><strong>Role:</strong> {selectedAdmin.role}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button onClick={() => setShowViewModal(false)} className="bg-red-500 text-white rounded-full px-4 py-2">
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedAdmin && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-xl max-w-md w-full">
                        <h3 className="text-lg font-semibold text-center">Are you sure you want to delete {selectedAdmin.name}?</h3>
                        <div className="mt-4 flex justify-around">
                            <Button onClick={confirmDelete} className="bg-red-500 text-white rounded-full px-4 py-2">
                                Yes, Delete
                            </Button>
                            <Button onClick={() => setShowDeleteModal(false)} className="bg-gray-500 text-white rounded-full px-4 py-2">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Admin Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="p-6 rounded shadow-xl max-w-md w-full">
                        <AddAdminForm onClose={() => setShowAddModal(false)} />
                    </div>
                </div>
            )}

            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
}
