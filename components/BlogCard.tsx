import { FC } from "react";

interface BlogCardProps {
  title: string;
  content: string;
}

const BlogCard: FC<BlogCardProps> = ({ title, content }): JSX.Element => {
  return (
    <div className="bg-green-100 p-2 rounded">
      <h1 className="text-3xl text-gray-900 font-semibold">{title}</h1>
      <p className="text-gray-500">{content}</p>
    </div>
  );
};

export default BlogCard;
