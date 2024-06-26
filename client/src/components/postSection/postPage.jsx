import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios.jsx";

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
    <div className="flex-col justify-center items-center mx-[20%]">
      <div className="flex items-center justify-center">
        <img
          className="rounded-lg w-[80%] h-[80%]"
          src="../src/assets/sample.avif"
          alt="img of post" 
        />
      </div>
      <div>
        <h2 className=" font-Andada Pro text-5xl font-semibold my-8 text-center">
          {post.title}
        </h2>
      </div>

      <div className="flex mx-4 mb-10 justify-center">
        <img
          className="rounded-full size-10 my-2 mx-2"
          src="../src/assets/avatar.avif"
        />
        <span className="mx-3 py-4 hidden font-bold text-slate-500 md:block">
          ·
        </span>
        <p className="py-4 mx-2 text-base font-semibold text-slate-600 ">
          Blogger Hawk
        </p>
        <span className="mx-3 py-4 hidden font-bold text-slate-500 md:block">
          ·
        </span>
        <p className="py-4 mx-2 text-base tooltip-handle text-slate-600">
          03.06.2030
        </p>
      </div>

      <div className="flex items-center">
        <p
          className="font-Andada Pro text-2xl"
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        ></p>
      </div>
    </div>
  );
}

export default PostPage;
