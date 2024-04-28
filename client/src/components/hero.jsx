function Hero() {
  return (
    <div id="hero" className="w-screen h-fit select-none">
      <div className="w-full h-[70%] bg-[#FFC017]">
        <h1 className="font-bold font-Asap text-black text-4xl md:text-6xl flex justify-center py-[10px] px-2">
          Stay Hungry, Stay Foolish
        </h1>

        <div className="flex justify-between align-middle">
          <div className="py-14 p-6 md:px-10">
            <h2 className="font-Asap text-[#2E2E2E] text-3xl md:text-5xl font-bold m-0 p-0 tracking-tight whitespace-nowrap">
              The ocean is
            </h2>
            <h2 className="font-Asap text-[#2E2E2E] text-3xl md:text-5xl font-bold m-0 p-0 tracking-tight whitespace-nowrap">
              yours to discover.
            </h2>
          </div>
          <div className="hidden md:block align-middle px-10">
            <img
              className=""
              src="../src/assets/brainHero.gif"
              height="250"
              width="250"
              alt=""
            />
          </div>
        </div>

        <br />
        <div className="p-2 md:p-10 flex justify-start">
          <a
            href="#postSection"
            className="bg-black text-white font-Akshar font-bold p-2 rounded-3xl px-5 mx-2 text-lg md:text-2xl"
          >
            Start Reading
          </a>
          {/* <a
            href="/compose"
            className="bg-black text-white font-Akshar font-bold p-2 rounded-3xl px-5 mx-2 text-lg md:text-2xl"
          >
            Compose
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default Hero;
