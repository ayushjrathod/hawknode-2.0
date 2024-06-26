import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios.jsx";
import SavePost from "./savePost.jsx";

function PostCard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/v1/posts/get-posts")
      .then((response) => {
        setPosts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClick = (postID) => {
    navigate(`/post/${postID}`);
  };


  return (
    <>
        {posts.map((postData) => (
          <div className="m-2 w-screen md:w-auto md:m-4" key={postData._id}>
            <div className="flex mx-4 justify-between">
              <div className="flex">
                <img
                  className="rounded-full size-6 md:size-8 my-2"
                  src="../src/assets/avatar.avif"
                />
                <div className="flex mx-4 md:my-1 mt-2 py-2">
                  <p className="text-slate-500 text-xs md:text-base px-0.5">
                    Blogger Hawk
                  </p>
                  <span className="text-slate-500 mx-3 hidden font-bold md:block">
                    .
                  </span>
                  <p className="text-slate-500 text-xs md:text-base px-0.5">
                    03.06.2030
                  </p>
                </div>
              </div>
              <div className="mx-2">
                <SavePost postData={postData} />
              </div>
            </div>
            <div
              onClick={() => handleClick(postData._id)}
              className="flex items-center cursor-pointer select-none"
            >
              <div className="mx-4 basis-3/4">
                <h2 className="font-Andada Pro text-base md:text-2xl">
                  {postData.title}
                </h2>
                <p
                  className="hidden md:block font-Andada Pro text-xm"
                  dangerouslySetInnerHTML={{
                    __html: postData.content.substring(0, 200) + "...",
                  }}
                ></p>
              </div>
              <div className="m-4 w-[25%] h-[25%] basis-1/4 grid-cols-3">
                <img
                  className="rounded-lg"
                  src="../src/assets/sample.avif"
                  alt="img of post"
                />
              </div>
            </div>
            <div className="my-4">
              <hr />
            </div>
          </div>
        ))}
      </>
  );
}

export default PostCard;
