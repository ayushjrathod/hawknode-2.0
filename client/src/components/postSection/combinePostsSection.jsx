import PostSection from "./postSection.jsx";
import SavedPostSection from "./savedPostSection.jsx";
import TagsSection from "./tagsSection.jsx";

function CombinePostSection() {
  return (
    <div className="flex max-w-7xl mx-auto gap-8">
      <div id="postSection" className="w-[70%] pl-4 flex-col justify-center">
        <PostSection />
      </div>
      <div className="w-[30%] border-l border-gray-200 pl-6">
        <div className="sticky top-4 space-y-8">
          <div id="savedPostSection">
            <h2 className="font-Akshar text-xl font-medium mt-4">Saved Posts</h2>
            <SavedPostSection />
          </div>
          <div className="">
            <TagsSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CombinePostSection;
