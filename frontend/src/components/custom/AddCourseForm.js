'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AddCourseForm({ onClose }) {
  const [form, setForm] = useState({
    title: '',
    batchNo: '',
    assignedTo: '',
    duration: '',
    image: null,
    category: '',
    description: ''
  });

  const [teachers, setTeachers] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/teachers');
        setTeachers(res.data.teachers || []);
      } catch (err) {
        console.error('Failed to fetch teachers:', err);
      }
    };
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) data.append(key, form[key]);
    });

    try {
      await axios.post('http://localhost:4000/api/createnewcourses', data);
      alert('Course added successfully!');
      onClose();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to add course');
    }
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Course Details <span className="text-blue-500">ⓘ</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Name of Course <span className="text-red-500">(Required)</span></Label>
          <Input name="title" placeholder="Name of the Lesson" value={form.title} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label>Batch No</Label>
            <Input name="batchNo" placeholder="Batch 10" value={form.batchNo} onChange={handleChange} />
          </div>
          <div>
            <Label>Category</Label>
            <Input name="category" placeholder="Web" value={form.category} onChange={handleChange} />
          </div>
          <div>
            <Label>Assign to</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="w-full justify-between">
                  {form.assignedTo ? form.assignedTo : "Select a teacher"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search teacher..." />
                  <CommandEmpty>No teacher found.</CommandEmpty>
                  <CommandGroup>
                    {teachers.map((teacher) => (
                      <CommandItem
                        key={teacher._id}
                        value={teacher.name}
                        onSelect={() => {
                          // Save the teacher's ObjectId instead of name
                          setForm({ ...form, assignedTo: teacher._id });
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            teacher._id === form.assignedTo ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {teacher.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>

            </Popover>
          </div>
          <div>
            <Label>Course Duration</Label>
            <Input name="duration" placeholder="6 weeks" value={form.duration} onChange={handleChange} />
          </div>
        </div>
        <div>
          <Label>Description</Label>
          <Input name="description" placeholder="" value={form.description} onChange={handleChange} />
        </div>
        <div>
          <Label>Upload Thumbnail</Label>
          <Input type="file" name="image" onChange={handleChange} />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} className="bg-[#1D1E40] text-white">Send</Button>
        </div>
      </CardContent>
    </Card>
  );
} 