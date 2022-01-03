import AeroPressIcon from "./AeroPressIcon";

const Footer = () => {
  return (
    <div className="max-w-container mx-auto">
      <div className="my-16 opacity-60 items-center grid grid-cols-1 lg:grid-cols-2 gap-4">
        <p>Built with ♡ using NextJS, Tailwind, MDX & Vercel</p>
        <ul className="flex items-center space-x-3 justify-end">
          <li className="hover:brightness-125">
            <a href="https://github.com/goulinkh">Github</a>
          </li>
          <li className="hover:brightness-125">
            <a href="https://github.com/goulinkh/goulin.fr">
              Website&apos;s Code
            </a>
          </li>
          <li className="hover:brightness-125">
            <a href="https://twitter.com/GoulinKH">Twitter</a>
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
