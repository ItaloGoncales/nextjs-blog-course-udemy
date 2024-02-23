import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
  PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Post } from ".";

type BlogPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BlogPage: NextPage<BlogPageProps> = ({ post }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-semibold text-2xl py-5">{post.title}</h1>
      <div className="prose pb-20">
        <MDXRemote {...post.content} />
      </div>
    </div>
  );
};

const getPosts = async (slug?: string): Promise<Post[]> => {
  const { postsInfo } = await fetch(
    `http://localhost:3000/api/posts${slug ? `?slug=${slug}` : ""}`
  ).then((data) => data.json() as Promise<{ postsInfo: Post[] }>);

  return postsInfo;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsInfo = await getPosts();

  return {
    paths: postsInfo.map((post) => ({
      params: {
        postSlug: post.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) => {
  const { params } = context;
  const { postSlug } = params as any;

  const { title, meta, content } = (await getPosts(postSlug))[0];

  return {
    props: {
      post: {
        title,
        meta: meta,
        content: await serialize(content, { parseFrontmatter: true }),
      },
    },
  };
};

export default BlogPage;
