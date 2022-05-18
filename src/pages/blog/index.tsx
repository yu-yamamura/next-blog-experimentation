import { FileNotFoundError } from '@/lib/errors/file-not-found-error';
import { getAllSlugs, getPostBySlug } from '@/lib/post';
import { Post } from '@/types/Post';
import type { NextPage, GetStaticProps } from 'next';

type Props = {
  allPosts: (Post | FileNotFoundError)[];
};

const Blog: NextPage<Props> = ({ allPosts }) =>
  allPosts.length === 0 ? (
    <h1>Sorry, no blog posts found.</h1>
  ) : (
    <>
      {allPosts.some((post) => post instanceof FileNotFoundError) ? null : (
        <ul>
          {allPosts.map((post) => (
            <li key={(post as Post).slug}>{(post as Post).title}</li>
          ))}
        </ul>
      )}
    </>
  );

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps<Props> = async () => {
  const allSlugs = getAllSlugs();
  const allPosts = allSlugs.map((slug) => getPostBySlug(slug));

  return { props: { allPosts } };
};
export default Blog;
