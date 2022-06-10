import Avatar from "./Avatar";
import ThemeToggle from "./ThemeToggle";
import Link from "../Link";
import clsx from "clsx";

const Header: React.FC<{ takeSpace?: boolean; isDraft?: boolean }> = ({
  takeSpace = true,
  isDraft = false,
}) => {
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
            <div className="ml-auto flex items-center gap-6">
              {isDraft ? (
                <span className="rounded-md bg-yellow-200/60 px-2 py-1 text-yellow-700 dark:bg-yellow-200/20 dark:text-yellow-400">
                  Draft
                </span>
              ) : null}
              <ThemeToggle />
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Header;
