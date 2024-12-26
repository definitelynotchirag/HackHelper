import Image from "next/image";
import SearchBox from "./Searchbox";
import Link from "next/link";
import { FC } from "react";

interface HeaderProps {
  isSearch: boolean;
  valueText?: string | string[];
  bookmarksCount?: number;
}

const Header: FC<HeaderProps> = ({ isSearch, valueText, bookmarksCount }) => {
  return (
    <div className="h-12 w-full flex justify-evenly items-center bg-white">
      {/* <Link href={"/"} passHref>
        <Image src={"/images/logo.png"} height={54} width={54} alt="logo" /> */}
        {/* <h1 className="text-xl font-bold p-2">HackHelper</h1>
      </Link> */}
      <h1 className="text-xl font-bold p-4">Project Search</h1>

      <div className="w-full flex-1 ml-8 mr-16">
        {isSearch && (
          <div className="w-[600px] mt-2">
            <SearchBox valueText={valueText} />
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Header;