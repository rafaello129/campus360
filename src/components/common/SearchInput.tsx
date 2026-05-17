import { Search } from "lucide-react";
import type { InputHTMLAttributes } from "react";

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}

export function SearchInput({ className = "", ...props }: SearchInputProps) {
  return (
    <label
      className={`flex min-w-0 w-full items-center gap-2 rounded-lg border border-tech-border bg-white px-3 py-2.5 shadow-sm transition focus-within:border-tech-primary focus-within:ring-1 focus-within:ring-blue-100 ${className}`}
    >
      <Search className="h-4 w-4 text-tech-textSecond flex-shrink-0" />
      <input
        {...props}
        type="search"
        className="min-w-0 w-full border-none bg-transparent text-sm text-tech-textMain outline-none placeholder:text-tech-textSecond"
      />
    </label>
  );
}

