import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Header from "../../components/Header";
import { BlogPost, getAllPosts, getBlogPost } from "../../utils/blogs";

const BlogPostPage = ({ post }: { post: BlogPost }) => {
  const Content = dynamic(() => import(`../../../blogs/${post.path}`));

  return (
    <>
      <Header />
      <section className="prose dark:prose-dark max-w-container mx-auto py-16">
        <Content />
      </section>
    </>
  );
};

export default BlogPostPage;

export const getStaticProps: GetStaticProps<{ post: BlogPost }> = async (
  context
) => {
  const post = getBlogPost((context.params as { slug: string }).slug);

  return {
    props: { post },
  };
};

export async function getStaticPaths() {
  const posts = getAllPosts();
  return {
    paths: posts.map((post) => {
      return {
        params: { slug: post.slug },
      };
    }),
    fallback: false,
  };
}
