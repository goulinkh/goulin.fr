import Image from "next/image";
import Link from "next/link";

const blog = {
  title: "Static website, simple, yet power full",
  description:
    "Over engineering things is a common thing that we think about, but what about if we actually simplify some fundamentals in web.",
  cover: "image01.png",
};

const BlogCard = () => {
  return (
    <Link passHref href="/">
      <a className="rounded-2xl isolate overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src="/assets/blogs/images/image01.png"
            alt="Goulin's personal photo"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <article className="blurry blurry-2 rounded-2xl flex flex-col flex-nowrap gap-3 -mt-5 py-8 px-4 relative z-10">
          <h1 className="text-xl">{blog.title}</h1>
          <p className="opacity-75">{blog.description}</p>
        </article>
      </a>
    </Link>
  );
};

export default BlogCard;
