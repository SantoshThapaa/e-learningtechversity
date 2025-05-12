'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
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
import { Check, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddCourseForm({ onClose }) {
  const [form, setForm] = useState({
    title: '',
    batchNo: '',
    assignedTo: '',
    price: '',
    duration: '',
    durationUnit: '',
    image: null,
    category: '',
    description: ''
  });

  const [teachers, setTeachers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(false);
  const [open, setOpen] = useState(false);
  const [batchOptions, setBatchOptions] = useState([]);
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else if (name === 'duration') {
      setForm({ ...form, duration: value });
    } else if (name === 'durationUnit') {
      setForm({ ...form, durationUnit: value });
    }
    else {
      setForm({ ...form, [name]: value });
    }
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get('https://back.bishalpantha.com.np/api/teachers');
        setTeachers(res.data.teachers || []);
      } catch (err) {
        console.error('Failed to fetch teachers:', err);
      }
    };
    fetchTeachers();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await axios.get('https://back.bishalpantha.com.np/api/categories');
        setCategories(categoryRes.data.categories || []);
      } catch (err) {
        console.error('Failed to load initial course data:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBatchOptions = async () => {
      try {
        const res = await axios.get("https://back.bishalpantha.com.np/api/batch/no");
        if (res.data && res.data.batchNo) {
          setBatchOptions([res.data.batchNo]);
        } else {
          console.error("API response is not in the expected format:", res.data);
          toast.error("Failed to fetch batch options. Invalid response format.");
        }
      } catch (err) {
        console.error("Failed to fetch batch options:", err);
        toast.error("Failed to fetch batch options");
      }
    };

    fetchBatchOptions();
  }, []);


  const handleSubmit = async () => {
    const data = new FormData();
    const combinedDuration = form.duration && form.durationUnit
      ? `${form.duration} ${form.durationUnit}`
      : '';

    Object.keys(form).forEach((key) => {
      if (key !== 'duration' && key !== 'durationUnit') {
        if (form[key]) data.append(key, form[key]);
      }
    });

    if (combinedDuration) {
      data.append('duration', combinedDuration);
    }

    try {
      await axios.post('https://back.bishalpantha.com.np/api/createnewcourses', data);
      toast.success('Course added successfully!', {
        position: "top-right",
        autoClose: 5000,
      });
      router.push("/admin/courses");
      router.back();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to add course', {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };
  const handleCancel = () => {
    router.back();
  };

  return (
    <>
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
            <div className="mb-4">
              <Label>Batch No</Label>
              <select
                name="batchNo"
                value={form.batchNo}
                onChange={handleChange}
                className="w-full p-3 mb-4 border rounded-md"
              >
                <option value="" disabled>Select Batch</option>
                {batchOptions.map((batch, index) => (
                  <option key={index} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>
            </div>



            <div>
              <Label>Category</Label>
              <Popover open={openCategory} onOpenChange={setOpenCategory}>
                <PopoverTrigger asChild>
                  <div className="relative w-full">
                    <Input
                      name="category"
                      placeholder="Enter or select category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full pr-10"
                    />
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Select a category..." />
                    <CommandEmpty>No categories found.</CommandEmpty>
                    <CommandGroup>
                      {categories.length > 0 ? (
                        categories.map((cat, index) => (
                          <CommandItem
                            key={index}
                            value={cat}
                            onSelect={() => setForm({ ...form, category: cat })}
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${form.category === cat ? 'opacity-100' : 'opacity-0'}`}
                            />
                            {cat}
                          </CommandItem>
                        ))
                      ) : (
                        <p>No categories available</p>
                      )}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Course Duration</Label>
              <div className="flex items-center border rounded-md">
                <Input
                  name="duration"
                  placeholder="6"
                  value={form.duration}
                  onChange={handleChange}
                  className="w-20 p-2 border-r"
                />
                <select
                  name="durationUnit"
                  value={form.durationUnit}
                  onChange={handleChange}
                  className="text-sm border-0 p-2 w-20"
                >
                  <option value="months">Weeks</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>

            <div>
              <Label>Course Price</Label>
              <Input name="price" placeholder="$" value={form.price} onChange={handleChange} />
            </div>

            <div>
              <Label>Assign to</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" className="w-[300px] justify-between">
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
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSubmit} className="bg-[#1D1E40] text-white">Send</Button>
          </div>
        </CardContent>
      </Card>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}
