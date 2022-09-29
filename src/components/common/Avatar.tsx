import Image from "next/image";
import { FC } from "react";

type Props = {
  className?: string;
};

const Avatar: FC<Props> = ({ className }) => {
  const backgroundAnimation = `
    @keyframes rainbow {
      0% {
        background-position: 0 82%;
      }

      50% {
        background-position: 100% 19%;
      }

      to {
        background-position: 0 82%;
      }
    }
  `;

  return (
    <div className={className}>
      <div className="relative isolate h-32 w-32">
        <div className="relative z-10 h-full w-full overflow-hidden rounded-full">
          <Image
            src="/images/personal-photo.jpeg"
            alt="Goulin's personal photo"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <style>{backgroundAnimation}</style>
        <div
          style={{
            animation: "rainbow 13s ease infinite",
            background:
              "linear-gradient(124deg, #c678dd, #9449ab, #e06c75, #1f80bc, #9449ab, #c678dd)",
            backgroundSize: "1000% 1000%",
          }}
          className="absolute top-1/2 left-1/2 h-full w-full -translate-y-1/2 -translate-x-1/2 scale-105 rounded-full"
        ></div>
      </div>
    </div>
  );
};

export default Avatar;
