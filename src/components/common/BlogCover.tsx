import RandomGradient from "./RandomGradient";
import Image from "next/image";

type Props = {
  cover: string | null;
  coverBlurData: string;
  slug: string;
};

const BlogCover: React.FC<Props> = ({ cover, coverBlurData, slug }) => {
  return cover ? (
    <Image
      src={cover}
      alt="Article's cover photo"
      layout="fill"
      objectFit="cover"
      blurDataURL={coverBlurData}
      placeholder={coverBlurData ? "blur" : "empty"}
    />
  ) : (
    <RandomGradient unique={slug} />
  );
};

export default BlogCover;
