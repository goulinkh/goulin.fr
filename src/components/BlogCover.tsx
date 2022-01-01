import Image from "next/image";

const BlogCover: React.FC<{ cover: string; coverBlurData: string }> = ({
  cover,
  coverBlurData,
}) => {
  return (
    <Image
      src={`/assets/blogs/images/${cover}`}
      alt="Article's cover photo"
      layout="fill"
      objectFit="cover"
      blurDataURL={coverBlurData}
      placeholder="blur"
    />
  );
};

export default BlogCover;
