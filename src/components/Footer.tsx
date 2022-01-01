const Footer = () => {
  return (
    <div className="max-w-container mx-auto">
      <footer className="py-16 opacity-60 flex items-center justify-between flex-wrap">
        <p>Built with ♡ using NextJS, Tailwind, MDX & Vercel</p>
        <ul className="flex items-center space-x-3">
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
      </footer>
    </div>
  );
};
export default Footer;
