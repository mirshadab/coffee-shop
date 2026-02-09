"use client";

import { SearchIcon, FilterIcon } from "./icons";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 flex items-center gap-2 bg-[#313131] rounded-2xl px-4 h-[52px]">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search coffee"
          className="bg-transparent text-white placeholder-[#989898] text-sm font-normal w-full outline-none"
        />
      </div>
      <button className="w-[52px] h-[52px] bg-[#C67C4E] rounded-2xl flex items-center justify-center flex-shrink-0">
        <FilterIcon />
      </button>
    </div>
  );
}
