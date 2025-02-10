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
          <div
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4"
            key={postData._id}
          >
            <div className="flex items-center mb-2">
              <p className="text-slate-600 text-sm md:text-base font-medium">
                {postData.createdBy?.username || "Unknown User"}
              </p>
            </div>
            <div onClick={() => handleClick(postData._id)} className="cursor-pointer group">
              <h2 className="font-['Andada_Pro'] text-lg font-semibold group-hover:text-blue-600 transition-colors duration-200">
                {postData.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {savedPosts.length > 3 && (
        <button
          className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium rounded-md hover:bg-blue-50 transition-colors duration-200"
          onClick={() => setShowAllSavedPosts(!showAllSavedPosts)}
        >
          {showAllSavedPosts ? "Show Less" : "See More"}
        </button>
      )}
    </div>
  );
};

export default SavedPostSection;
