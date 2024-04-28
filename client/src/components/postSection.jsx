import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios.jsx";

function PostCard() {
  const navigate = useNavigate();

    const [posts,setPosts] = useState([]);
    useEffect(()=>{
      axios
        .get("/v1/posts/get-posts")
        .then((response)=>{
          setPosts(response.data.data);
        })
        .catch((error)=>{
          console.log(error);
        })

    },[])

    const handleClick = (postID)=>{
      navigate(`/post/${postID}`);
    }


    return (
      <div
        id="postSection"
        className="w-[60%] flex-col justify-center mx-1 md:mx-[20%]"
      >
        <h4 className="px-6 md:px-0 mt-10 font-Akshar text-3xl">Your Feed</h4>
        {posts.map((postData) => (
          <div className="m-2 w-screen md:w-auto md:m-4 border-2 rounded-lg" key={postData._id}>
          <div className="flex mx-4">
            <img className="rounded-full size-8 md:size-10 my-2" src="../src/assets/avatar.avif" />
            <div className="flex-inline mx-4 md:my-1 mt-2">
            <p className="text-xs md:text-base">Blogger Hawk</p>
            <p className="text-xs md:text-base">03.06.2030</p>
            </div>
          </div>
          <div onClick={() => handleClick(postData._id)} className="flex items-center cursor-pointer select-none">
            <div className="mx-4 basis-3/4">
              <h2 className=" font-Andada Pro text-base md:text-2xl ">{postData.title}</h2>
              <p className="hidden md:block font-Andada Pro text-xm " dangerouslySetInnerHTML={{__html:postData.content.substring(0,200)+"..."}} ></p>
            </div>
            <div className="m-4 w-[25%] h-[25%] basis-1/4 grid-cols-3">
              <img className="rounded-lg" src="../src/assets/sample.avif" alt="img of post" />
            </div>
          </div>
          </div>
        ))}
      </div>
    );
}



export default PostCard;


