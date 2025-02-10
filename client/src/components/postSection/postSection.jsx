import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios.jsx";
import { useSearch } from "../../context/SearchContext";
import useAuth from "../../hooks/useAuth.jsx";
import Loader from "../loader.jsx";
import SavePost from "./savePost.jsx";

function PostCard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { auth } = useAuth();
  const user = auth.user;
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useSearch();

  useEffect(() => {
    axios
      .get("/v1/posts/get-posts")
      .then((response) => {
        setPosts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });
  }, []);

  //user is fetched at login only so we fetch it here again to get updated data.
  useEffect(() => {
    axios
      .post("/v1/users/get-user", user)
      .then((response) => {
        setCurrentUser(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClick = (postID) => {
    navigate(`/post/${postID}`);
  };

  // Add this utility function to strip HTML tags
  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  if (loading) return <Loader />;

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {filteredPosts.map((postData) => {
        const isSaved = currentUser?.savedPosts?.some((savedPostId) => savedPostId === postData._id) ? true : false;
        return (
          <div
            className="m-2 w-screen md:w-auto md:m-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg p-3"
            key={postData._id}
          >
            <div className="flex ml-4 justify-between items-center">
              <div className="flex items-center">
                <img
                  className="rounded-full size-8 md:size-10 my-2 border-2 border-gray-100"
                  src={postData?.createdBy?.avatar}
                />
                <div className="flex flex-col md:flex-row mx-4 md:items-center">
                  <p className="text-slate-700 font-medium text-sm md:text-base px-0.5">
                    {postData?.createdBy?.username || "admin"}
                  </p>
                  <span className="hidden md:block text-slate-400 mx-2">•</span>
                  <p className="text-slate-500 text-xs md:text-sm px-0.5">
                    {new Date(postData.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="">
                <SavePost mappedPostIsSaved={isSaved} postData={postData} />
              </div>
            </div>
            <div
              onClick={() => handleClick(postData._id)}
              className="flex items-center cursor-pointer select-none hover:opacity-90 transition-opacity duration-200 gap-4"
            >
              <div className="mx-4 flex-grow">
                <h2 className="font-['Andada_Pro'] text-base md:text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {postData.title}
                </h2>
                <p className="hidden md:block font-['Andada_Pro'] text-sm text-gray-600 line-clamp-3">
                  {stripHtml(postData.content).substring(0, 180)}...
                </p>
              </div>
              <div className="shrink-0">
                <img
                  className="object-cover w-32 h-28 rounded-lg shadow-sm"
                  src={postData.thumbnail}
                  alt={`Thumbnail for ${postData.title}`}
                />
              </div>
            </div>
            <div className="my-4">
              <hr className="my-6 border-gray-100" />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default PostCard;
