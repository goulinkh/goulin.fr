import React from 'react';

import Link from 'next/link';
import { BlogPost, getAllBlogs } from 'src/utils/blogs';

const LatestBlogs = ({ latestBlogs }: { latestBlogs: BlogPost[] }) => {
  latestBlogs = JSON.parse(latestBlogs);
  return (
    <ul>
      {latestBlogs.map((blog) => (
        <Link href={`blogs/${blog.path}`}><li>{blog.data.title}</li></Link>
      ))}
    </ul>
  );
};

export default LatestBlogs;
export async function getStaticProps() {
  const latestBlogs = (await getAllBlogs()).sort(
    (b1, b2) => b1.data.publishedOn - b2.data.publishedOn,
  );
  return { props: { latestBlogs: JSON.stringify(latestBlogs) } };
}
