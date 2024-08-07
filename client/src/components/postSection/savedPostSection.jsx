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

  const displayedSavedPosts = showAllSavedPosts
    ? savedPosts
    : savedPosts.slice(0, 3);



  useEffect(() => {
    axios
      .get(`/v1/users/get-saved-posts/${userId}`)
      .then((response) => {
        setSavedPosts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[savedPosts]);

  const handleClick = (postID) => {
    navigate(`/post/${postID}`);
  };

  return (
    <>
      {displayedSavedPosts.map((postData) => (
        <div className="md:w-96 m-2 md:ml-8" key={postData._id}>
          <div className="flex">
            <p className="text-slate-500 text-sm md:text-base px-0.5">
              {postData.createdBy.username} 
            </p>
          </div>
          <div
            onClick={() => handleClick(postData._id)}
            className="flex items-center cursor-pointer select-none"
          >
            <div>
              <h2 className="font-Andada Pro text-base font-medium">
                {postData.title}
              </h2>
            </div>
          </div>
        </div>
      ))}
      {savedPosts.length > 3 && (
        <button
          className="px-2 ml-6 text-base text-blue-500"
          onClick={() => setShowAllSavedPosts(!showAllSavedPosts)}
        >
          {showAllSavedPosts ? "Show Less" : "See More"}
        </button>
      )}
    </>
  );
};

export default SavedPostSection;
