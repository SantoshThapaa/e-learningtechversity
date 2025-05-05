"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ShareButton from '../ui/shareButton';
import Blog from './Blog';
import Footer from './Footer/StudentFooter';

const BlogPost = () => {
    const [blog, setBlog] = useState(null);
    const [recentPosts, setRecentPosts] = useState([]);
    const { blogId } = useParams();

    useEffect(() => {
        if (!blogId) return;

        axios
            .get(`https://back.bishalpantha.com.np/api/blog/${blogId}`)
            .then((response) => setBlog(response.data))
            .catch((err) => console.error("Error fetching blog details:", err));

        axios
            .get('https://back.bishalpantha.com.np/api/blogs/all')
            .then((response) => {
                setRecentPosts(response.data.slice(0, 3));  // Limit to 3 blogs
            })
            .catch((err) => console.error("Error fetching recent blogs:", err));
    }, [blogId]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    const imageUrl = `https://back.bishalpantha.com.np/${blog.imageUrl.replace(/^\/+/, '')}`;
    console.log("Image URL:", imageUrl);

    return (
        <div className="max-w-7xl mx-auto mt-30 px-4">
            {/* Blog Post Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <Image
                        src="/author.jpg"
                        alt="Author"
                        width={50}
                        height={50}
                        className="rounded-full mr-3"
                    />
                    <div>
                        <h1 className="text-4xl font-semibold text-gray-800">{blog.title}</h1>
                        <p className="text-sm text-gray-600">{blog.author} • {new Date(blog.date).toLocaleDateString()} • {blog.readTime} min read</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <h2>Share this Post</h2>
                    <ShareButton />
                </div>
            </div>

            {/* Blog Image */}
            <div className="relative mb-6">
                <Image
                    src={imageUrl}
                    alt="Blog Post Image"
                    width={1200}
                    height={800}
                    className="object-cover w-full h-96 rounded-xl"
                />
            </div>

            <div className='flex space-x-12'>
                {/* Blog Content */}
                <div className="prose lg:prose-xl text-gray-700 mb-12">
                    {blog.description}
                </div>

                {/* Recent Posts */}
                <div className="mt-12">
                    <h2 className="text-xl font-semibold text-gray-800">Recent Post</h2>
                    <div className="flex flex-col mt-4">
                        {recentPosts.map((post) => (
                            <div key={post._id} className="flex items-center space-x-4 mb-6">
                                <Image
                                    src={post.imageUrl ? `https://back.bishalpantha.com.np/${post.imageUrl.replace(/^\/+/, '')}` : '/fallback-image.jpg'}
                                    alt="Recent Post Image"
                                    width={80}
                                    height={80}
                                    className="rounded-md"
                                />
                                <div>
                                    <p className="text-lg text-gray-800 font-semibold">{post.title}</p>
                                    <p className="text-sm text-gray-600">{new Date(blog.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-8 flex gap-10">
                <div>
                    <p className="text-sm text-gray-600">Share This Post</p>
                    <ShareButton />
                </div>
                <div className="flex space-x-4 mt-2">
                    <Button variant="outline" className="text-gray-600 bg-gray-200">Multilanguage</Button>
                    <Button variant="outline" className="text-gray-600 bg-gray-200">Language Club</Button>
                    <Button variant="outline" className="text-gray-600 bg-gray-200">Language Learning</Button>

                </div>
            </div>
            <div className='mt-20'>
                <Blog recentPosts={recentPosts.slice(0, 3)} />
            </div>
        </div>
    );
}

export default BlogPost;
