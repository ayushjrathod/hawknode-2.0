
function Hero(){
    return(
        <div id="hero" className="w-full select-none">
            <div className="w-full h-[75%] bg-[#FFC017]">
            
                <h1 className="font-bold font-Asap text-black text-[70px] flex justify-center py-[10px] px-2">Stay Hungry, Stay Foolish</h1>
                
                <div className="flex justify-between align-middle">
                <div className="py-14 px-10">
                    <h2 className="font-Asap text-[#2E2E2E] text-[50px] font-bold m-0 p-0 tracking-tight">The ocean is </h2>
                    <h2 className="font-Asap text-[#2E2E2E] text-[50px] font-bold m-0 p-0 tracking-tight ">yours to discover.</h2>
                </div>
                <div className=" align-middle px-10">
                <img className="" src="../src/assets/brainHero.gif" height="250" width="250"  alt="" />
                </div>
                </div>  

                <br/>
                <div className="p-10">
                     <a href="#postSection" className="bg-black text-white font-Akshar font-bold p-2 rounded-3xl px-5 mx-2  text-2xl">Start Reading</a>
                     <a href="/compose" className="bg-black text-white font-Akshar font-bold p-2 rounded-3xl px-5 mx-2 text-2xl">Compose</a>
                </div>
            </div>

            <div>
                <div className="flex justify-center">
                 <h1 className="pt-10 flex font-Akshar text-3xl justify-center font-bold">Subscribe to my Newsletter</h1>
                 </div>
                 <div>
                <form className="flex px-10 w-full justify-center">
                    <div className="inline-flex flex-1 justify-center mt-4">
                    <input type="text" name="email" className="border-solid border-2 h-[50px] w-[400px] border-slate-950 rounded-3xl pl-5 font-Kanit font-bold"/>
                    <button className="bg-black text-white font-Akshar font-extrabold px-10 py-3 rounded-3xl ml-[20%] h-[50px] absolute text-xl tracking-wider">Subscribe</button>
                    </div>
                </form>
                </div>
            </div>
            </div>

    
    );
}

export default Hero;
