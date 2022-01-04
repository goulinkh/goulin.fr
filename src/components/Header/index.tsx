import clsx from "clsx";
import Link from "../common/Link";
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
            <Link href="/blogs" className="mr-5">
              Blogs
            </Link>
            <Link href="/about">About</Link>
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
