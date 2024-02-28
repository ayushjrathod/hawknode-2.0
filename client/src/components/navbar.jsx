
function Navbar(){
    return(
        <>
            <div className="bg-black w-full h-12 flex px-[10px] justify-between select-none">
                <a className="font-logo text-white py-[5px] text-2xl" href="/" >hawknode</a>
            <div className="text-white text-xl font-Akshar font-bold py-[9px] hidden md:block">
                <a className="mx-3" href="#hero">Home</a>
                <a className="py-[10px]" >.</a>
                <a className="mx-3" href="#postSection">Posts</a>
                <a className="py-[10px]" >.</a>
                <a className="mx-3" href="#footer">Contact</a>
                <a className="py-[10px]" >.</a>
                <a className="mx-3" href="/compose">Compose</a>
            </div>
            <div className="space-y-2 md:hidden">
                <span className="w-8 h-0.5 bg-gray-600">Home</span>
                <span className="w-8 h-0.5 bg-gray-600">About</span>
                <span className="w-8 h-0.5 bg-gray-600">Contact</span>
            </div>
            </div>
        </>
    );
}

export default Navbar;