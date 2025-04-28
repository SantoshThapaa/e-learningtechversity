"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { TextEditor } from "./TextEditor";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CommunicationPage() {
  const [value, setValue] = useState("");
  const [sendAt, setSendAt] = useState("");
  const [targetAudience, setTargetAudience] = useState("all");

  const showSuccessToast = () => {
    toast.success("Notification scheduled successfully!");
  };

  const showErrorToast = () => {
    toast.error("Error sending notification. Please try again.");
  };

  const handleSend = async () => {
    if (!value || !sendAt) {
      showErrorToast();
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/notifications", {
        message: value,
        sendAt: new Date(sendAt).toISOString(),
        targetAudience,  // Send the selected target audience
        sender: "Admin",
      });
      showSuccessToast();
      setValue("");  
      setSendAt(""); 
      setTargetAudience("all");  
    } catch (error) {
      showErrorToast();
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7ff] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-sm text-muted-foreground mb-4">
          <span className="text-gray-500">Home</span> {'>'} <span className="text-blue-500">Notifications</span>
        </div>

        <Card className="p-6">
          <TextEditor defaultValue={value} onChange={setValue} />

          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="sendAt" className="block mb-1 text-sm font-medium text-gray-700">
                Schedule Time
              </Label>
              <Input
                type="datetime-local"
                id="sendAt"
                value={sendAt}
                onChange={(e) => setSendAt(e.target.value)}
                className="w-64 bg-white"
              />
            </div>

            <div>
              <Label htmlFor="sendTo" className="block mb-1 text-sm font-medium text-gray-700">
                Send to
              </Label>
              <select
                id="sendTo"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-56 bg-white p-2 border rounded-md"
              >
                <option value="all">All</option>
                <option value="teacher">Teachers</option>  {/* Updated option */}
                <option value="user">Users</option>       {/* Updated option */}
              </select>
            </div>

            <Button onClick={handleSend} className="bg-[#1d2a5e] hover:bg-[#1d2a5ecc] text-white">
              Send
            </Button>
          </div>
        </Card>
      </div>

      <ToastContainer />
    </div>
  );
}
