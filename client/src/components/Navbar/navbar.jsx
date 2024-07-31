import Dropdown from "../Navbar/dropdown";

function Navbar() {
  return (
    <>
      <div className="bg-black w-full h-fit flex px-[10px] justify-between select-none">
        <a className="font-logo text-white py-[9px] text-2xl flex" href="/">
          <img src="../src/assets/hawknodeLogo.png" className="size-6 mr-2 mt-1" />
          hawknode
        </a>
        <div className="text-white text-xl font-Akshar font-bold py-1 flex">
          <a className="mx-3 flex" href="/compose">
            <p className="py-2">Compose</p>
          </a>
          <Dropdown className="z-50" />
        </div>
      </div>
    </>
  );
}

export default Navbar;
