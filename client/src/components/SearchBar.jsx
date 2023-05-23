export default function SearchBar() {
  return (
    <>
      <form>
        <div className="relative mt-10 mb-10 me-10 ms-10">
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-white border border-white rounded-lg bg-light focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-white dark:placeholder-white dark:text-white dark:focus:ring-white dark:focus:border-white"
            placeholder="Search"
            required
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
      </form>
    </>
  );
}
