import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios.jsx";

function PostPage() {
  const { postID } = useParams(); 

  const [post, setPost] = useState({});

  useEffect(() => {
    axios
      .get(`/v1/posts/${postID}`) 
      .then((response) => {
        setPost(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postID]);


  return (
    <div className="inline-col justify-center mx-[20%]">
      <img
        className="rounded-lg"
        src="../src/assets/sample.avif"
        alt="img of post"
      />

      <h2 className=" font-Andada Pro text-5xl font-semibold my-8 text-center">
        {post.title}
      </h2>

      <div className="flex mx-4 mb-10 justify-center">
        <img
          className="rounded-full size-10 my-2 mx-2"
          src="../src/assets/avatar.avif"
        />
        <span className="mx-3 py-4 hidden font-bold text-slate-500 md:block">·</span>
        <p className="py-4 mx-2 text-base font-semibold text-slate-600 ">
          Blogger Hawk
        </p>
        <span className="mx-3 py-4 hidden font-bold text-slate-500 md:block">·</span>
        <p className="py-4 mx-2 text-base tooltip-handle text-slate-600">
          03.06.2030
        </p>
      </div>

      <div className="flex items-center">
        <div className="mx-4 basis-3/4">
          <p
            className="font-Andada Pro text-xl "
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          ></p>
        </div>
        <div className="m-4 w-[25%] h-[25%] basis-1/4 grid-cols-3"></div>
      </div>
    </div>
  );
}

export default PostPage;






