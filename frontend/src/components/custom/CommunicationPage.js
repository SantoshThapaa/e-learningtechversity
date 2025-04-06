"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function CommunicationPage() {
  const [value, setValue] = useState("");

  return (
    <div className="min-h-screen bg-[#f4f7ff] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-sm text-muted-foreground mb-4">
          <span className="text-gray-500">Home</span> {'>'} <span className="text-blue-500">Fees</span>
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Submit Task</h2>

          {/* Editor Section */}
          <div className="border rounded-md overflow-hidden">
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Here will be a text editor. Student will be allowed to submit their task from here."
              className="w-full h-60 p-4 text-sm outline-none resize-none"
            />
          </div>

          {/* Dropdown & Send Button */}
          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="sendTo" className="block mb-1 text-sm font-medium text-gray-700">
                Send to
              </Label>
              <Input id="sendTo" value="All" readOnly className="w-56 bg-white" />
            </div>
            <Button className="bg-[#1d2a5e] hover:bg-[#1d2a5ecc] text-white">
              Send
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
