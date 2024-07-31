import SavedPostSection from "./savedPostSection.jsx";
import PostSection from "./postSection.jsx";
import Footer from "../Footer/footer.jsx";

function CombinePostSection() {

  return (
    <div className="flex">
      <div id="postSection" className="w-[60%] pl-10 flex-col justify-center">
        <h4 className="px-6 md:px-0 mt-10 font-Akshar text-3xl">Your Feed</h4>
        <PostSection />
      </div>
      <div>
        <div className="sticky top-2 h-fit">
          <div
            id="savedPostSection"
            className="mt-10 ml-8 font-Akshar text-lg font-[300]"
          >
            <h4 className=" mt-12 font-Akshar text-2xl">Saved Posts</h4>
            <SavedPostSection />
          </div>
        </div>
        <div className="sticky top-3/4 ml-10 mt-96">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default CombinePostSection
