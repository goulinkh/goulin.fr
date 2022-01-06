import Link from "../common/Link";
import AeroPressIcon from "./AeroPressIcon";

const Footer = () => {
  return (
    <div className="max-w-container mx-auto">
      <div className="my-16 items-center grid grid-cols-1 lg:grid-cols-2 gap-4">
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
        <div className="flex items-center">
          <span className="col-span-3">Current Coffee mood: </span>
          <AeroPressIcon className="col-span-1 w-10" />
        </div>
      </div>
    </div>
  );
};
export default Footer;
