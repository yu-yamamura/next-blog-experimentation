import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import matter from 'gray-matter';
import { Post } from '@/types/Post';
import { FileNotFoundError } from './errors/file-not-found-error';

const postDirectory = path.join(cwd(), 'data', 'posts');

export const getAllSlugs = (): Post['slug'][] => {
  return fs
    .readdirSync(postDirectory)
    .map((fileName) => fileName.replace(/\.md$/, ''));
};

export const getPostBySlug = (slug: string): Post | FileNotFoundError => {
  const fullPath = path.join(postDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return new FileNotFoundError(`${fullPath} not found`);
  }
  const fileContent = fs.readFileSync(fullPath);
  const matterResult = matter(fileContent);

  return { slug, ...matterResult.data } as Post;
};
