import PostSection from "./postSection.jsx";
import SavedPostSection from "./savedPostSection.jsx";
import TagsSection from "./tagsSection.jsx";

function CombinePostSection() {
  return (
    <div className="gap-8 flex justify-center mx-8">
      <div id="postSection" className="pl-4">
        <PostSection />
      </div>
      <div className="w-[40%] border-l border-gray-200 pl-6">
        <div className="sticky top-4">
          <div id="savedPostSection">
            <h2 className="font-Akshar text-lg font-medium mt-4">Saved Posts</h2>
            <SavedPostSection />
          </div>
          <TagsSection />
        </div>
      </div>
    </div>
  );
}

export default CombinePostSection;
