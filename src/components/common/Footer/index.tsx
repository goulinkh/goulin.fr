import Link from "../Link";

const Footer = () => {
  return (
    <div className="max-w-container mx-auto">
      <div className="my-16 grid grid-cols-1 items-center gap-4 lg:grid-cols-2">
        <p>Built with ♡ using NextJS, Tailwind, MDX & Vercel</p>
        <ul className="flex items-center space-x-3 lg:justify-end">
          <li>
            <Link href="https://github.com/goulinkh">Github</Link>
          </li>
          <li>
            <Link href="https://github.com/goulinkh/goulin.fr">
              Website&apos;s Code
            </Link>
          </li>
          <li>
            <Link href="https://twitter.com/GoulinKH">Twitter</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Footer;
