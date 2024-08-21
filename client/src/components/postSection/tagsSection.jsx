import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

function TagsSection() {
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

  return (
    <div className="mx-8 my-2 w-[26rem] flex flex-wrap">
      {posts.map((post) => (
        <div className="" key={post._id}>
          <div className="flex flex-wrap">
            {post.tags.map((tag) => (
              <div className="w-fit px-4 py-1 mr-2 mb-1 bg-gray-200 rounded-full" key={tag}>
                <Link className="" to={`/tags/${tag}`}>
                  <p>{tag}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TagsSection;
