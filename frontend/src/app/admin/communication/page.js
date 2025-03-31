"use client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function CommunicationPage() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (message.trim() === "") return;

        setMessages([...messages, { text: message, sender: "You" }]);
        setMessage("");
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 ml-64 pt-4 mt-20">
            <div className="flex items-center justify-between p-4 text-white bg-blue-500">
                <div className="flex items-center space-x-2">
                    <Avatar src="/path/to/avatar.png" alt="User Avatar" />
                    <span className="text-lg font-semibold">Chat Room</span>
                </div>
            </div>

            {/* Messages Display */}
            <div className="p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                        <div className={`p-3 rounded-lg ${msg.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                            <span>{msg.text}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="p-4 flex flex-wrap items-center space-x-2 bg-white shadow-md">
                <Input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full h-50 text-lg p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button onClick={handleSendMessage} color="blue" className="mt-5">
                    Send
                </Button>
            </div>

        </div>
    );
}
