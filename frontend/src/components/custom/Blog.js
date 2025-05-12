"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Blog = ({ recentPosts }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('https://back.bishalpantha.com.np/api/blogs/all')
      .then(response => setBlogs(response.data.slice(0, 3)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-4xl font-bold text-center mb-8">LATEST NEWS & BLOG</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map(blog => {
          const imageUrl = `https://back.bishalpantha.com.np/${blog.imageUrl.replace(/^\/+/, '')}`;
          console.log("Image URL:", imageUrl);

          return (
            <div key={blog._id} className="bg-white rounded-lg shadow-lg p-6 relative">
              <div className="mb-4">
                <Image
                  src={imageUrl}
                  alt={blog.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="absolute top-4 left-4 bg-green-500 text-black text-sm px-2 py-1 rounded-full">
                  {new Date(blog.date).toLocaleDateString()}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
                <p className="text-gray-600 mt-4">{blog.description.slice(0, 100)}...</p>
                <Link href={`/student/blog/${blog._id}`}>
                  <Button variant="outline" className="mt-4">
                    Read More
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
