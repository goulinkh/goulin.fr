import { LinkIcon } from "@heroicons/react/outline";

const HeadingWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="group relative">{children}</div>;
};
const HeadingAnchor: React.FC<{ id: string }> = ({ id }) => {
  return (
    <div className="absolute -left-7 hidden h-full w-full items-center opacity-0 transition-opacity group-hover:opacity-100 md:flex">
      <a className="btn flex h-fit" href={"#" + id}>
        <LinkIcon className="w-4" />
      </a>
    </div>
  );
};

const encodeHeading = (content: string) =>
  content.replace(/(-|\/|,|\s)/gi, "-");

export const H1 = ({ children }: { children: string }) => {
  const content = children as string;
  return (
    <HeadingWrapper>
      {/* <HeadingAnchor id={id} /> */}
      <h1 id={encodeHeading(content)}>{content}</h1>
    </HeadingWrapper>
  );
};

export const H2 = ({ children: content }: { children: string }) => {
  const id = encodeHeading(content);
  return (
    <HeadingWrapper>
      <HeadingAnchor id={id} />
      <h2 id={id}>{content}</h2>
    </HeadingWrapper>
  );
};

export const H3 = ({ children: content }: { children: string }) => {
  const id = encodeHeading(content);
  return (
    <HeadingWrapper>
      <HeadingAnchor id={id} />
      <h3 id={id}>{content}</h3>
    </HeadingWrapper>
  );
};

export const H4 = ({ children: content }: { children: string }) => {
  const id = encodeHeading(content);
  return (
    <HeadingWrapper>
      <HeadingAnchor id={id} />
      <h4 id={id}>{content}</h4>
    </HeadingWrapper>
  );
};

export const H5 = ({ children: content }: { children: string }) => {
  const id = encodeHeading(content);
  return (
    <HeadingWrapper>
      <HeadingAnchor id={id} />
      <h5 id={id}>{content}</h5>
    </HeadingWrapper>
  );
};

export const H6 = ({ children: content }: { children: string }) => {
  const id = encodeHeading(content);
  return (
    <HeadingWrapper>
      <HeadingAnchor id={id} />
      <h6 id={id}>{content}</h6>
    </HeadingWrapper>
  );
};
