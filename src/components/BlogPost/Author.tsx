import { CalendarIcon, UserIcon } from "@heroicons/react/outline";

const Author = ({ publishDate }: { publishDate: Date }) => {
  return (
    <div className="my-6 flex items-center space-x-3 text-xs opacity-75 md:text-sm">
      <div className="flex items-center space-x-1">
        <UserIcon className="w-4" />
        <span>Written by Goulin Khoge</span>
      </div>
      <span>•</span>
      <div className="flex items-center space-x-1">
        <CalendarIcon className="w-4" />
        <span>
          {publishDate.toLocaleDateString("en", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};

export default Author;
