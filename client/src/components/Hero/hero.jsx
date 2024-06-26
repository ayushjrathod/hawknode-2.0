import brainHero from "../../assets/brainHero.gif"

function Hero() {
  return (
    <div id="hero" className="w-screen h-fit select-none">
      {/* medium colour - #ffc017 */
      /* light colour - #35a6f7 */}
      <div className="w-full h-[70%] bg-[#4657A1]">
        <h1 className="font-bold font-Asap text-white text-4xl md:text-8xl flex justify-center py-[10px] px-2">
          Stay Hungry, Stay Foolish
        </h1>

        <div className="flex justify-center align-middle">
          {/* <div className="py-14 p-6 md:px-10">
            <h2 className="font-Asap text-[#F7FFFD] text-3xl md:text-5xl font-bold m-0 p-0 tracking-tight whitespace-nowrap">
              The ocean is
            </h2>
            <h2 className="font-Asap text-[#F7FFFD] text-3xl md:text-5xl font-bold m-0 p-0 tracking-tight whitespace-nowrap">
              yours to discover.
            </h2>
          </div> */}
          <div className="hidden md:block px-10">
            <img
              className=""
              src={brainHero}
              height="250"
              width="250"
              alt=""
            />
          </div>
        </div>

        <br />
        <div className="p-2 md:pb-16 flex justify-center">
          <a
            href="#postSection"
            className=" text-white font-Akshar font-bold p-4 rounded-sm mx-2 text-lg md:text-2xl border-2"
          >
            Start Reading
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
