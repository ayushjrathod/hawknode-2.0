import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios.jsx";
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

  if (loading) return <Loader />;

  return (
    <>
      {posts.map((postData) => {
        const isSaved = currentUser?.savedPosts?.some((savedPostId) => savedPostId === postData._id) ? true : false;
        return (
          <div className="m-2 w-screen md:w-auto md:m-4" key={postData._id}>
            <div className="flex mx-4 justify-between">
              <div className="flex">
                <img className="rounded-full size-6 md:size-8 my-2" src={postData?.createdBy?.avatar} />
                <div className="flex mx-4 md:my-1 mt-2 py-2">
                  <p className="text-slate-500 text-xs md:text-base px-0.5">
                    {postData?.createdBy?.username || "admin"}
                  </p>
                  <span className="text-slate-500 mx-3 hidden font-bold md:block">.</span>
                  <p className="text-slate-500 text-xs md:text-base px-0.5">
                    {postData.createdAt.substring(0, 10) || "d-day"}
                  </p>
                </div>
              </div>
              <div className="mx-2">
                <SavePost mappedPostIsSaved={isSaved} postData={postData} />
              </div>
            </div>
            <div onClick={() => handleClick(postData._id)} className="flex items-center cursor-pointer select-none">
              <div className="mx-4 basis-3/4">
                <h2 className="font-Andada Pro text-base md:text-2xl font-semibold">{postData.title}</h2>
                <p
                  className="hidden md:block font-Andada Pro text-xm font-medium"
                  dangerouslySetInnerHTML={{
                    __html: postData.content.substring(0, 125) + "...",
                  }}
                ></p>
              </div>
              <div className="m-4 basis-1/4 grid-cols-3">
                <img className="object-scale-down w-32 h-28" src={postData.thumbnail} alt="img of post" />
              </div>
            </div>
            <div className="my-4">
              <hr className="my-8" />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default PostCard;
