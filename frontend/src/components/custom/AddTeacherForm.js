'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddTeacherForm({ onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:4000/api/registerteacher', form);
      toast.success('Teacher added successfully!', {
        position: "top-right", 
        autoClose: 5000, 
      });
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong.', {
        position: "top-right", 
        autoClose: 5000,
      });
    }
  };
  

  return (
    <Card className="w-[500px] shadow-lg">
      <CardHeader>
        <CardTitle>Add Teacher</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            placeholder="Name of the Teacher"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              placeholder="Teacher123@gmail.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="phone">Ph number</Label>
            <Input
              name="phone"
              placeholder="Teacher Name/ID"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} className="bg-[#1D1E40] text-white hover:bg-[#2f3060]">
            Add
          </Button>
        </div>
      </CardContent>

      <ToastContainer position="top-right" autoClose={5000} />
    </Card>
  );
}
