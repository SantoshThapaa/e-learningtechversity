import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FullPaid = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token'); 
        if (!token) {
          setError('Please log in first');
          setLoading(false);
          return;
        }
        const response = await axios.get('https://back.bishalpantha.com.np/api/full-pay', {
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        });

        setPayments(response.data); 
      } catch (error) {
        console.error('Error fetching payments:', error);
        setError('There was an error fetching the payments.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []); 
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
              <th className="py-2 px-2">Join Date</th>
              <th className="py-2 px-2">Payment</th>
              <th className="py-2 px-2">Payment Status</th>
              <th className="py-2 px-2">Batch</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr key={index}>
                  <td className="py-2 px-2">{payment.userId.name}</td>
                  <td className="py-2 px-2">{payment.userId.email}</td>
                  <td className="py-2 px-2">{payment.courseId ? payment.courseId.title : 'N/A'}</td>
                  <td className="py-2 px-2">{new Date(payment.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-2">${payment.amount}</td>
                  <td className="py-2 px-2">{payment.paymentPlan === 'Full Pay' ? 'Full Payment' : 'EMI'}</td>
                  <td className="py-2 px-2">{payment.courseId ? payment.courseId.batchNo : 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-2 px-2 text-center">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FullPaid;
