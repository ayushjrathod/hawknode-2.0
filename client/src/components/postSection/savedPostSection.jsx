import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const SavedPostSection = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const userId = auth.user._id;
  const [savedPosts, setSavedPosts] = useState([]);
  const [showAllSavedPosts, setShowAllSavedPosts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const displayedSavedPosts = showAllSavedPosts ? savedPosts : savedPosts.slice(0, 3);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/v1/users/get-saved-posts/${userId}`);
        setSavedPosts(response.data.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching saved posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedPosts();
  }, []); // Remove savedPosts from dependency array

  const handleClick = (postID) => {
    navigate(`/post/${postID}`);
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading saved posts...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className=" max-w-3xl mx-auto">
      <div className="space-y-4">
        {displayedSavedPosts.map((postData) => (
          <div className="bg-white" key={postData._id}>
            <div className="flex items-center mb-2 gap-2">
              <img className="rounded-full size-6 my-2 border-2 border-gray-100" src={postData?.createdBy?.avatar} />
              <p className="text-slate-600 text-xs font-medium">{postData.createdBy?.username || "Unknown User"}</p>
            </div>
            <div onClick={() => handleClick(postData._id)} className="cursor-pointer group">
              <h2 className="font-['Andada Pro'] text-base font-semibold group-hover:text-gray-600 transition-colors duration-200">
                {postData.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {savedPosts.length > 3 && (
        <button
          className="mt-4 py-2 text-blue-600 hover:text-blue-700 font-medium text-sm rounded-md "
          onClick={() => setShowAllSavedPosts(!showAllSavedPosts)}
        >
          {showAllSavedPosts ? "Show Less " : "Show Full List"}
        </button>
      )}
    </div>
  );
};

export default SavedPostSection;
