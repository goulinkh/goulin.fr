import clsx from "clsx";
import Link from "next/link";
import Avatar from "./Avatar";
import ThemeToggle from "./ThemeToggle";

const Header: React.FC<{ takeSpace?: boolean }> = ({ takeSpace = true }) => {
  return (
    <div
      className={clsx("fixed top-0 z-10 w-full", {
        sticky: takeSpace,
        fixed: !takeSpace,
      })}
    >
      <div className="max-w-container mx-auto py-2">
        <header className="blurry rounded-xl  py-2 px-6">
          <nav className="flex items-center flex-wrap sm:flex-nowrap">
            <Avatar />
            <span className="pl-10"></span>
            <Link passHref href="/blogs">
              <a className="p-1 opacity-75 hover:opacity-100">Blogs</a>
            </Link>
            <span className="pl-5"></span>
            <Link passHref href="/about">
              <a className="p-1 opacity-75 hover:opacity-100">About</a>
            </Link>
            <div className="flex ml-auto items-center">
              <ThemeToggle />
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Header;
