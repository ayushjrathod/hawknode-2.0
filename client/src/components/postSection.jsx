import { useEffect, useState } from "react";
//import posts from "../posts"; 
import axios from "../api/axios.jsx";

function PostCard() {
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


    return (
      <div
        id="postSection"
        className="w-[60%] flex-col justify-center mx-[20%]"
      >
        <h4 className=" mt-10 font-Akshar text-3xl">Your Feed</h4>
        {posts.map((postData) => (
          <div className="m-4 border-2 rounded-lg" key={postData._id}>
          <div className="flex mx-4">
            <img className="rounded-full size-10 my-2" src="../src/assets/avatar.avif" />
            <div className="flex-inline mx-4 my-1">
            <p>Blogger Hawk</p>
            <p>03.06.2030</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mx-4 basis-3/4">
              <h2 className=" font-Andada Pro text-2xl ">{postData.title}</h2>
              <p className="font-Andada Pro text-xm " dangerouslySetInnerHTML={{__html:postData.content.substring(0,200)+"..."}} ></p>
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


