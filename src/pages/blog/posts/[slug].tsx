import { ParsedUrlQuery } from 'querystring';
import Link from 'next/link';
import { getAllSlugs, getPostBySlug } from '@/lib/post';
import { Post } from '@/types/Post';
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';

type Params = ParsedUrlQuery & {
  slug: string;
};

type Props = {
  post: Post;
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = getAllSlugs().map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
  // eslint-disable-next-line @typescript-eslint/require-await
}) => {
  const post = getPostBySlug((params as Params).slug) as Post;

  return { props: { post } };
};

const Post: NextPage<Props> = ({ post: { title, date, tags, content } }) => (
  <>
    <h1>
      {title} - {date}
    </h1>
    <ul>
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
    <main>
      {content}
      <br />
      <Link href="/blog/posts">
        <a>← All the posts</a>
      </Link>
    </main>
  </>
);

export default Post;
