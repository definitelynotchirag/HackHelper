'use client'
import { MagnifyingGlassIcon as SearchIcon , PaperAirplaneIcon as MicrophoneIcon } from "@heroicons/react/24/solid";
import React, { useState, FC, SyntheticEvent, FormEvent } from "react";
// import Router from "next/navigation";
import { useRouter } from 'next/navigation'

interface SearchBoxProps {
  valueText?: string | string[];
}

const SearchBox: FC<SearchBoxProps> = ({ valueText }) => {
  const [userInput, setUserInput] = useState<string | null>("");
  const router = useRouter()
  const onSubmitHandler = (e: any): void => {
    e.preventDefault();
    if (userInput !== "" && userInput !== null) {
      // Encode the query parameter and create the URL
      const encodedQuery = encodeURIComponent(userInput);
      router.push(`/search?query=${encodedQuery}`);
    }
  };

  const onCrossHandler = (e:any) => {
    setUserInput("");
    e.preventDefault();
  };
  return (
    <div className="pr-6 pl-3 py-2 rounded-3xl border-2 m-auto space-x-3 hover:shadow-md">
      <form
        autoComplete="off"
        className="flex justify-center items-center w-full space-x-4"
        onSubmit={onSubmitHandler}
      >
        <SearchIcon className="h-6 text-gray-300" />
        <input
          defaultValue={valueText ? valueText : ""}
          name="textitem"
          type="text"
          className="w-full outline-none text-sm"
          onChange={(e) => {
            setUserInput(e.currentTarget.value);
          }}
        />
        <div onClick={onSubmitHandler}>
          <MicrophoneIcon className="h-4 text-gray-300 hover:text-red-800" />
        </div>
      </form>
    </div>
  );
};

export default SearchBox;