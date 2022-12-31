import RandomGradient from "./RandomGradient"
import { userPreferencesContext } from "../../context/userPreferences"
import { BlogPost } from "../../utils/blogs"
import Image from "next/image"
import { useContext } from "react"

type Props = {
  post: BlogPost
}

const BlogCover: React.FC<Props> = ({ post }) => {
  const [theme] = useContext(userPreferencesContext).theme
  return post.cover ? (
    <Image
      src={theme === "dark" && post.darkCover ? post.darkCover : post.cover}
      alt="Article's cover photo"
      layout="fill"
      objectFit="cover"
      blurDataURL={post.coverPreviewBlurData}
      placeholder={post.coverPreviewBlurData ? "blur" : "empty"}
    />
  ) : (
    <RandomGradient unique={post.slug} />
  )
}

export default BlogCover
