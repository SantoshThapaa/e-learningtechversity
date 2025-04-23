"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function BlogPost() {
    const [blog, setBlog] = useState(null);
    const [moreBlogs, setMoreBlogs] = useState([]);
    const { blogId } = useParams();

    useEffect(() => {
        if (!blogId) return;

        axios
            .get(`http://localhost:4000/api/blog/${blogId}`)
            .then((response) => setBlog(response.data))
            .catch((err) => console.error("Error fetching blog details:", err));

        // Fetching all blogs for the "More Blogs" section
        axios
            .get('http://localhost:4000/api/blogs/all')
            .then((response) => {
                setMoreBlogs(response.data.slice(0, 3));  // Limit to 3 blogs
            })
            .catch((err) => console.error("Error fetching more blogs:", err));
    }, [blogId]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    const validImageUrl = blog.imageUrl && (blog.imageUrl.startsWith('http') || blog.imageUrl.startsWith('https'))
        ? blog.imageUrl
        : '/fallback-image.jpg';

    return (
        <div className="max-w-7xl mx-auto mt-202 px-4">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
                <p className="text-lg text-gray-500">by {blog.author} | {new Date(blog.date).toLocaleDateString()} | 5 min read</p>
                <div className="flex justify-center gap-4 mt-4">
                    <Button variant="outline" className="text-sm text-gray-500 hover:text-black">
                        Share Post: Facebook
                    </Button>
                    <Button variant="outline" className="text-sm text-gray-500 hover:text-black">
                        Share Post: Twitter
                    </Button>
                </div>
            </div>

            <div className="max-w-2xl mx-auto mb-12">
                <div className="flex justify-center">
                    <Image
                        src={validImageUrl}
                        alt={blog.title}
                        width={500}
                        height={300}
                        className="object-cover rounded-lg"
                    />
                </div>
                <p className="text-gray-700 mt-6 mb-4">
                    {blog.description}
                </p>
            </div>

            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                    <Image
                        src={blog.authorImage || "/author-placeholder.jpg"}
                        alt="Author Image"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <div className="ml-4">
                        <p className="font-semibold">{blog.author}</p>
                        <p className="text-sm text-gray-500">{blog.authorRole}</p>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="font-semibold mb-2">Share This Post</h3>
                <div className="flex gap-4">
                    {(blog.tags || []).map(tag => (
                        <Button key={tag} variant="outline" className="text-sm text-blue-500 hover:bg-blue-100">
                            {tag}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="mb-12">
                <h3 className="font-semibold mb-4">Recent Posts</h3>
                <div className="space-y-4">
                    {(blog.recentPosts || []).map(post => (
                        <Card key={post.id} className="shadow-lg rounded-xl overflow-hidden cursor-pointer">
                            <CardContent className="p-4">
                                <h3 className="font-medium text-lg text-black">{post.title}</h3>
                                <p className="text-sm text-gray-600">{new Date(post.date).toLocaleDateString()}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-6">More Blogs</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {moreBlogs.map(blog => (
                        <Card key={blog.id} className="shadow-lg rounded-xl overflow-hidden">
                            <CardContent className="p-4">
                                <h3 className="font-medium text-lg text-black">{blog.title}</h3>
                                <p className="text-sm text-gray-600">{new Date(blog.date).toLocaleDateString()}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
