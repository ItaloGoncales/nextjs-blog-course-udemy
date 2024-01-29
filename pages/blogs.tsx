import BlogCard from "@/components/BlogCard";
import { NextPage } from "next";
import { useEffect, useState } from "react";

interface BlogsProps {}

const Blogs: NextPage<BlogsProps> = () => {
  const [posts, setPosts] = useState<
    { title: string; slug: string; meta: string }[]
  >([]);

  const fetchPosts = async () => {
    const postsData = await fetch("/api/posts").then((data) => data.json());
    setPosts(postsData.postsInfo);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-5 space-y-5">
      {posts.map((post) => (
        <BlogCard title={post.title} content={post.meta} key={post.slug} />
      ))}
    </div>
  );
};

export default Blogs;
