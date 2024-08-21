import { useState } from "react";
import SavedPostSection from "./savedPostSection.jsx";
import PostSection from "./postSection.jsx";
import Footer from "../Footer/footer.jsx";
import Loader from "../loader.jsx";
import TagsSection from "./tagsSection.jsx";

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
            <p className="font-Akshar text-lg ml-8">Saved Posts</p>
            <SavedPostSection />
            <div className="mt-6">
              <p className="font-Akshar text-lg ml-8">Tags</p>
              <TagsSection />
            </div>
          </div>
        </div>
        {/* <div className="sticky top-3/4 ml-10 mt-96 flex justify-center">
          <Footer />
        </div> */}
      </div>
    </div>
  );
}

export default CombinePostSection;
