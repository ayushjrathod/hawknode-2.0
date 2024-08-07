import SavedPostSection from "./savedPostSection.jsx";
import PostSection from "./postSection.jsx";
import Footer from "../Footer/footer.jsx";

function CombinePostSection() {
  return (
    <div className="flex">
      <div id="postSection" className="w-[60%] pl-10 flex-col justify-center">
        <PostSection />
      </div>
      <div className="border-r-[1.4px]"></div>
      <div>
        <div className="sticky top-2 h-fit">
          <div
            id="savedPostSection"
            className="mt-2 font-Akshar text-lg font-[300]"
          >
            <h4 className="font-Akshar text-lg ml-8">Saved Posts</h4>
            <SavedPostSection />
          </div>
          {/* <div className="mt-1 font-Akshar text-lg font-[300]">
            <h5 className="font-Akshar text-lg ml-8">Search By Tags</h4>
            <TagsSection />
          </div> */}
        </div>
        <div className="sticky top-3/4 ml-10 mt-96">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default CombinePostSection;
