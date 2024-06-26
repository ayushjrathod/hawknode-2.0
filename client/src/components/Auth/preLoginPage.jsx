

function PreLoginPage(){
    return(
        <div id="hero" className="w-full h-screen select-none">
            <div className="w-full h-screen bg-[#FFC017]">
                <h1 className="font-bold font-Asap text-black text-[70px] flex justify-center py-[10px] px-2">Stay Hungry, Stay Foolish</h1>
                <div className="justify-center flex align-middle">
                <img className="" src="../src/assets/brainHero.gif" height="450" width="450"  alt="" /> 
                </div>  
                <br/>
                <div className="flex justify-center">
                     <a href="/login" className="bg-black text-white font-Akshar font-bold p-2 rounded-3xl py-6 px-12 w-48 mx-4  text-4xl">Login</a>
                     <a href="/register" className="bg-black text-white font-Akshar font-bold p-2 rounded-3xl py-6 px-7 w-48 mx-4 text-4xl">Register</a>
                </div>
            </div>
        </div>
    );
}
export default PreLoginPage;