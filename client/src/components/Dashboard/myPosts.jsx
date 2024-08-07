import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const MyPosts = () => {
  const { auth } = useAuth();
  const userId = auth.user._id;
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    axios
      .get(`/v1/posts/get-my-posts/${userId}`)
      .then((res) => {
        setPostData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {postData.map((post) => (
        <div key={post._id} className="flex justify-between my-2">
          <h1 className="text-black text-lg">{post.title}</h1>
          <div className="">
            <Link className="mx-2" to={`/edit-post/${post._id}`}>
              <i className="bx bx-edit-alt bx-sm"></i>
            </Link>
            <Link className="mx-2" to={`/delete-post/${post._id}`}>
              <i className="bx bx-trash bx-sm"></i>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
