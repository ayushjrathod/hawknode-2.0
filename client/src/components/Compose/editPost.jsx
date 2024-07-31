import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

function EditPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const postID = useParams().postID;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/v1/posts/${postID}`)
      .then((response) => {
        setTitle(response.data.data.title);
        setDescription(response.data.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = () => {
    axios
      .put(`/v1/posts/edit-post/${postID}`, {
        title: title,
        content: description,
      })
      .then((response) => {
        console.log(response.data.data);
        navigate(`/post/${postID}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <button
          onClick={handleChange}
          className="bg-green-700 p-2 font-Akshar text-lg font-semibold text-white rounded-full absolute right-0 m-2"
        >
          Publish Changes
        </button>
      </div>
      <section className="w-[90%] md:w-[90%] lg:w-[60%] mx-auto py-[3rem]">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="text-4xl outline-none w-full"
        />

        <ReactQuill
          theme="bubble"
          value={description}
          onChange={setDescription}
          placeholder="Waiting for your thoughts ..."
          className="py-6"
        />
      </section>
    </div>
  );
}

export default EditPost;
