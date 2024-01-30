import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
  PreviewData,
} from "next";
import { Post } from "../blogs";
import { ParsedUrlQuery } from "querystring";

type BlogPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BlogPage: NextPage<BlogPageProps> = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.meta}</p>
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

  const { title, meta } = (await getPosts(postSlug))[0];

  return {
    props: {
      post: {
        title,
        meta,
      },
    },
  };
};

export default BlogPage;
