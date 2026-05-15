import { Search } from "lucide-react";
import type { InputHTMLAttributes } from "react";

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}

export function SearchInput({ className = "", ...props }: SearchInputProps) {
  return (
    <label
      className={`flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm ${className}`}
    >
      <Search className="h-4 w-4 text-slate-400" />
      <input
        {...props}
        type="search"
        className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
      />
    </label>
  );
}

