import {Link} from "react-router-dom"
import brainHero from "../../assets/brainHero.gif";


{/* medium colour - #ffc017 */
/* light colour - #35a6f7 */}
function LandingPage() {
  return (
    <div className="w-full h-screen select-none bg-[#ffc017]">
      <div className="flex items-center justify-center">
        <h1 className="font-bold font-Asap text-white text-4xl md:text-7xl flex py-[10px] px-2">
          Stay Hungry
        </h1>
        <div className="hidden px-10 md:flex">
          <img className="" src={brainHero} height="250" width="250" alt="" />
        </div>
        <h1 className="font-bold font-Asap text-white text-4xl md:text-7xl flex py-[10px] px-2">
          Stay Foolish
        </h1>
      </div>

      <br />
      <div className="p-2 md:pb-16 flex justify-center">
        <Link
          to="/login"
          className=" text-white bg-black font-Akshar font-bold p-4 rounded-lg mx-2 text-lg md:text-2xl"
        >
          Start Reading
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;