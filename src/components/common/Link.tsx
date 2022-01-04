import clsx from "clsx";
import L from "next/link";
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

const Link: React.FC<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
> = ({ href, children, className, ...props }) => {
  return (
    <L href={href!} passHref>
      <a className={clsx("p-1 opacity-75 hover:opacity-100", className)}>
        {children}
      </a>
    </L>
  );
};

export default Link;
