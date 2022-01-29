import Avatar from "./Avatar";
import ThemeToggle from "./ThemeToggle";
import Link from "../Link";
import clsx from "clsx";

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
          <nav className="flex flex-wrap items-center sm:flex-nowrap">
            <Avatar />
            <span className="pl-10"></span>
            <Link href="/blogs" className="mr-5">
              Blogs
            </Link>
            <Link href="/about">About</Link>
            <div className="ml-auto flex items-center">
              <ThemeToggle />
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Header;
