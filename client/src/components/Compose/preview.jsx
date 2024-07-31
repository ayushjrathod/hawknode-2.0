import {  useRef, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const Preview = ({ setPublish, description, title }) => {
  const imageRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [tags, setTags] = useState([]);

  const { auth } = useAuth();
  const currentUser = auth.user;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    imageRef.current.click();
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (title === "" || description === "" || tags.length === 0) {
      console.log("All fields are required!!!");
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("content", description);
    data.append("tags", tags);
    data.append("thumbnail", thumbnail);
    data.append("createdBy", currentUser._id);

    axios
      .post("/v1/posts/create-post", data)
      .then((response) => {
        console.log(response);
        setLoading(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <section className="p-6 absolute inset-0 bg-white z-30">
      <div className="size my-[2rem]">
        <span
          onClick={() => setPublish(false)}
          className="absolute right-[1rem] md:right-[5rem] top-[3rem] text-2xl cursor-pointer"
        >
          <LiaTimesSolid />
        </span>
        {/* preview the text  */}
        <div className="mt-[8rem] flex flex-col md:flex-row gap-10">
          <div className="flex-[1]">
            <h1 className="text-3xl font-semibold">Story Preview</h1>
            <div
              style={{ backgroundImage: `url(${imageUrl})` }}
              onClick={handleClick}
              className="w-full h-[200px] object-cover bg-gray-100 my-3 grid 
                place-items-center cursor-pointer bg-cover bg-no-repeat "
            >
              {!imageUrl && "Add Image"}
            </div>
            <input
              onChange={(e) => {
                setImageUrl(URL.createObjectURL(e.target.files[0]));
                setThumbnail( e.target.files[0] );
              }}
              ref={imageRef}
              type="file"
              hidden
            />
            <h1 className="text-xl outline-none w-full border-b border-gray-300 py-2">
              Title: {title}
            </h1>
            <p className="text-base text-gray-500 py-3">Description: {description}</p>
          </div>
          <div className="flex-[1] flex flex-col gap-4 mb-5 md:mb-0">
            <h3 className="text-2xl">
              Publishing to
              <span className="font-bold"> hawknode </span>
              by user <span className="font-bold">{currentUser.username}</span>
            </h3>
            <p>Add tags realted to your story.</p>
            <TagsInput value={tags} onChange={(newTags) => setTags(newTags)} />
            <button
              onClick={handleSubmit}
              className="px-4 py-2 font-Akshar font-semibold bg-green-800 w-fit text-white rounded-full"
            >
              {loading ? "Submitting..." : "Publish Now"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;
