import fs, { Dirent } from 'fs';
import path from 'path';
import { cwd } from 'process';
import { FileNotFoundError } from '@/lib/errors/file-not-found-error';
import { getAllSlugs, getPostBySlug } from '@/lib/post';
import { Post } from '@/types/Post';

describe('getAllSlugs', () => {
  test('should return two strings as slugs if there are two blog posts', () => {
    jest
      .spyOn(fs, 'readdirSync')
      .mockReturnValue([
        'first-post.md',
        'second-post.md',
      ] as unknown as Dirent[]);

    expect(getAllSlugs()).toEqual(['first-post', 'second-post']);
  });

  test('should return an empty array if there are no blog posts', () => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue([]);

    expect(getAllSlugs()).toEqual([]);
  });
});

describe('getPostBySlug', () => {
  test('should return post data searching for a Markdown file by the slug', () => {
    const postDirectory = path.join(cwd(), 'src/__tests__/data');
    const slug = 'sample-post';
    const fullPath = path.join(postDirectory, `${slug}.md`);
    const fileContent = fs.readFileSync(fullPath);

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readFileSync').mockReturnValue(fileContent);

    const expectedPost: Post = {
      title: 'A title',
      date: '2016-01-01',
      tags: ['TypeScript', 'Next.js'],
      draft: false,
      summary: 'A very short summary',
      slug,
    };

    expect(getPostBySlug(slug)).toEqual(expectedPost);
  });

  test('should return "FileNotFoundError" if no file found by the slug', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    expect(getPostBySlug('invalid-slug')).toBeInstanceOf(FileNotFoundError);
  });
});
