import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

function TagsSection() {
  const [tags, setTags] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axios
      .get("/v1/posts/get-posts")
      .then((response) => {
        // Flatten the tags array and remove duplicates
        const allTags = response.data.data.flatMap((post) => post.tags);
        const uniqueTags = [...new Set(allTags)];
        setTags(uniqueTags);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const displayedTags = showAll ? tags : tags.slice(0, 10);

  return (
    <div className="my-4">
      <div className="flex flex-wrap gap-2">
        {displayedTags.map((tag) => (
          <Link className="transition-all duration-200" to={`/tags/${tag}`} key={tag}>
            <div
              className="px-3 py-1 text-sm text-gray-600 hover:bg-blue-100 
              rounded-full cursor-pointer border-[0.1px] hover:border-blue-200
              shadow-sm hover:shadow transition-all duration-200"
            >
              #{tag}
            </div>
          </Link>
        ))}
      </div>
      {tags.length > 10 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-2 text-sm text-blue-600 hover:text-blue-700 focus:outline-none"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}

export default TagsSection;
