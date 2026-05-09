import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content/dictionary');

export function getAllTerms() {
  if (!fs.existsSync(contentDirectory)) return [];
  const fileNames = fs.readdirSync(contentDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const term = fileName.replace(/\.md$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        term,
        title: data.title || term,
        ...data,
      };
    });
}

export function getTermData(term: string) {
  const fullPath = path.join(contentDirectory, `${term}.md`);
  if (!fs.existsSync(fullPath)) return null;
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    term,
    frontmatter: data,
    content,
  };
}
