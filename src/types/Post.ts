import { PostMetaData } from './PostMetaData';

export type Post = PostMetaData & {
  slug: string;
  content: string;
};
