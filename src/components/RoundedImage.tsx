import clsx from "clsx"
import Image from "next/image"

const RoundedImage = ({
  image,
  height,
  width,
  alt = "",
  legend = false,
  small = false,
}: {
  image: string
  height: number
  width: number
  alt?: string
  legend?: boolean
  small?: boolean
}) => (
  <>
    <div
      className={clsx("mx-auto overflow-hidden rounded-lg shadow-lg", {
        "max-w-full lg:max-w-2xl": small,
      })}
      style={{ width: small ? width : undefined }}
    >
      <Image
        src={`/assets/blogs/images/${image}`}
        alt={alt}
        layout="responsive"
        objectFit="contain"
        width={width}
        height={height}
      />
    </div>
    {legend ? <figcaption className="text-center">{alt}</figcaption> : null}
  </>
)

export default RoundedImage
