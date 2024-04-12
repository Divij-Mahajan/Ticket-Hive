import { CiSearch } from "react-icons/ci";
function SearchBar() {
    return <div className="w-full flex items-center bg-white px-3 rounded-lg">
        <CiSearch size={25} color="black" />

        <input className="flex-grow h-10 p-6 text-5md" placeholder="Search for a Ticket..." ></input>
    </div>
}
export default SearchBar