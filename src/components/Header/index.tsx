import Link from "next/link";
import Avatar from "./Avatar";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <div className="py-2 sticky top-0 ">
      <header className="max-w-container mx-auto rounded-xl bg-white/75 dark:bg-black/60 dark:text-gray-200 border border-black/5 dark:border-white/20 backdrop-blur py-2 px-6">
        <nav className="flex items-center flex-wrap sm:flex-nowrap">
          <Avatar />
          <span className="pl-10"></span>
          <Link passHref href="/latest">
            <a className="p-1 opacity-75 focus:opacity-100 hover:opacity-100">
              Latest
            </a>
          </Link>
          <span className="pl-5"></span>
          <Link passHref href="/about">
            <a className="p-1 opacity-75 focus:opacity-100 hover:opacity-100">
              About
            </a>
          </Link>
          <div className="flex ml-auto items-center">
            <ThemeToggle />
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
