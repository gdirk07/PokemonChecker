import React from "react";

type SearchBoxProps = {
  searchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBox = ({ searchChange }: SearchBoxProps) => {
  return (
    <div>
      <input
        type="search"
        placeholder="Enter a Pokemon Name"
        onChange={searchChange}
      />
    </div>
  );
};
export default SearchBox;
