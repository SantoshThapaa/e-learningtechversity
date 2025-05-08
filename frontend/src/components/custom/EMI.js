'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EMI() {
  const [emiPayments, setEmiPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null); 
  const [showDeleteModal, setShowDeleteModal] = useState(false); 

  useEffect(() => {
    const fetchEmiPayments = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Please log in to view EMI payments');
          setLoading(false);
          return;
        }
        
        const response = await axios.get('https://back.bishalpantha.com.np/api/emi', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        setEmiPayments(response.data);
      } catch (err) {
        console.error('Error fetching EMI payments:', err);
        setError('There was an error fetching the EMI payments.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmiPayments();
  }, []);

  const handleViewPayment = (paymentId) => {
    const payment = emiPayments.find(payment => payment._id === paymentId);
    setViewPayment(payment); 
  };

  const handleDeletePayment = (paymentId) => {
    setSelectedPayment(paymentId); 
    setShowDeleteModal(true); 
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error('Please log in to delete the payment');
      setShowDeleteModal(false);
      return;
    }

    try {
      const response = await axios.delete(`https://back.bishalpantha.com.np/api/emi/${selectedPayment}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 200) {
        toast.success('Payment deleted successfully');
        setEmiPayments(emiPayments.filter(payment => payment._id !== selectedPayment)); 
      }

      setShowDeleteModal(false); 
    } catch (error) {
      console.error('Error deleting payment:', error);
      toast.error('Failed to delete the payment');
      setShowDeleteModal(false); 
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="overflow-x-auto shadow-md border border-gray-200 rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-100 text-left">
            <tr>
              <th className="py-2 px-2">Students</th>
              <th className="py-2 px-2">Email ID</th>
              <th className="py-2 px-2">Courses</th>
              <th className="py-2 px-2">Pay Date</th>
              <th className="py-2 px-2">Payment</th>
              <th className="py-2 px-2">Payment Duration</th>
              <th className="py-2 px-2">Batch</th>
              <th className="py-2 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {emiPayments.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-2 px-2 text-center">No EMI payments found</td>
              </tr>
            ) : (
              emiPayments.map((payment, index) => (
                <tr key={index}>
                  <td className="py-2 px-2">{payment.userId.name}</td>
                  <td className="py-2 px-2">{payment.userId.email}</td>
                  <td className="py-2 px-2">{payment.courseId ? payment.courseId.title : 'N/A'}</td>
                  <td className="py-2 px-2">{new Date(payment.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-2">${payment.amount}</td>
                  <td className="py-2 px-2">{payment.paymentPlan === 'EMI' ? 'Monthly' : 'Full Pay'}</td>
                  <td className="py-2 px-2">{payment.courseId ? payment.courseId.batchNo : 'N/A'}</td>
                  <td className="py-2 px-2 space-x-2">
                    <button
                      className="text-blue-500"
                      onClick={() => handleViewPayment(payment._id)}
                    >
                      👁️
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDeletePayment(payment._id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold text-center">Are you sure you want to delete this payment?</h3>
            <div className="mt-4 flex justify-around">
              <button onClick={confirmDelete} className="bg-red-500 text-white rounded-full px-4 py-2">
                Yes, Delete
              </button>
              <button onClick={handleCloseModal} className="bg-gray-500 text-white rounded-full px-4 py-2">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}
