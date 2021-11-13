import { useRouter } from 'next/dist/client/router';
import { getAllBlogs } from 'src/utils/blogs';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  return <h1>{slug}</h1>;
}
export async function getStaticProps(context:any) {
  const blog = (await getAllBlogs()).filter((b) => b.path === context.params.slug)?.[0];
  console.log('blog', blog);
  return { props: { blog: JSON.stringify(blog), slug: context.params.slug } };
}

export async function getStaticPaths() {
  const blogs = await getAllBlogs();
  console.log('blogs.map((b) => ({ params: { slug: b.path } }))', blogs.map((b) => ({ params: { slug: b.path } })));
  return {
    paths: blogs.map((b) => ({ params: { slug: b.path } })),
    fallback: false,
  };
}
