"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export default function NotificationListPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const showErrorToast = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showSuccessToast = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const role = "user";  // This will be for the "user" role
      const response = await axios.get(
        `http://localhost:4000/api/notifications/user/${role}`
      );
      console.log(response.data);  // Log to check the response structure
      setNotifications(response.data);
      setLoading(false);
      showSuccessToast("Notifications fetched successfully.");
    } catch (error) {
      setLoading(false);
      showErrorToast("Error fetching notifications.");
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-sm text-muted-foreground mb-4">
          <span className="text-gray-500">Home</span> {'>'} <span className="text-blue-500">Notifications</span>
        </div>

        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Scheduled Notifications</h2>

          {loading ? (
            <div className="text-center text-gray-500">Loading notifications...</div>
          ) : (
            <div className="space-y-4">
              {notifications.length === 0 ? (
                <div className="text-center text-gray-500">No notifications available.</div>
              ) : (
                notifications.map((notification, index) => (
                  <div key={index} className="p-4 border rounded-md bg-white shadow-md">
                    <h3 className="font-semibold text-gray-800">{notification.message}</h3>
                    <div className="text-sm text-gray-500">
                      <span>{new Date(notification.sendAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          <div className="mt-6 text-center">
            <Button
              onClick={fetchNotifications}
              className="bg-[#1d2a5e] hover:bg-[#1d2a5ecc] text-white px-6 py-2 rounded-md"
            >
              Refresh Notifications
            </Button>
          </div>
        </Card>
      </div>

      <ToastContainer />
    </div>
  );
}
