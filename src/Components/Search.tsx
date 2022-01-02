import React from "react";

type SearchProps = {
  searchWord: string;
  getSearchWord: Function;
  fetchInstitutions: Function;
};

function Search({ searchWord, getSearchWord, fetchInstitutions }: SearchProps) {
  return (
    <div className="mt-10">
      <input
        className="p-1.5 cursor-pointer border-b bottom-1"
        type="text"
        placeholder="Type a name..."
        value={searchWord}
        onChange={(e) => getSearchWord(e.target.value)}
      />
      <button
        type="button"
        onClick={() => fetchInstitutions()}
        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
      >
        Search
      </button>
    </div>
  );
}

export default Search;
