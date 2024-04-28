import Dropdown from "./dropdown.jsx";

function Navbar() {
  return (
    <>
      <div className="bg-black w-full h-fit flex px-[10px] justify-between select-none">
        <a className="font-logo text-white py-[9px] text-2xl" href="/">
          hawknode
        </a>
        <div className="text-white text-xl font-Akshar font-bold py-[9px]">
          <a className="mx-3" href="/home">
            Home
          </a>
          <a className="">.</a>
          <a className="mx-3" href="/compose">
            Compose
          </a>
          <a className="">.</a>
          <Dropdown className="z-50"/>
        </div>
      </div>
    </>
  );
}

export default Navbar;
