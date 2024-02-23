import BlogCard from "@/components/BlogCard";
import { InferGetStaticPropsType, NextPage } from "next";

export interface Post {
  title: string;
  slug: string;
  content: string;
  meta: string;
}

export const getStaticProps = async () => {
  const posts = await fetch("http://localhost:3000/api/posts").then((data) =>
    data.json()
  );
  return {
    props: { posts: posts.postsInfo as Post[] },
  };
};

type BlogsProps = InferGetStaticPropsType<typeof getStaticProps>;

const Blogs: NextPage<BlogsProps> = ({ posts }) => {
  return (
    <div className="max-w-3xl mx-auto p-5 space-y-5">
      {posts.map((post) => (
        <BlogCard
          title={post.title}
          content={post.meta}
          slug={post.slug}
          key={post.slug}
        />
      ))}
    </div>
  );
};

export default Blogs;
