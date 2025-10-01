import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const SavedPost = ({ postData, mappedPostIsSaved }) => {
  const { auth } = useAuth();
  const [isSaved, setIsSaved] = useState(mappedPostIsSaved);

  const handleSave = (e) => {
    e.preventDefault();

    const data = {
      userId: auth.user._id,
      isSaved,
    };

    axios
      .post(`/v1/posts/save-post/${postData._id}`, data)
      .then((response) => {
        setIsSaved(!isSaved);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <button onClick={handleSave} className="hover:opacity-60">
        {isSaved ? <BookmarkCheck size={24} /> : <Bookmark size={24} />}
      </button>
    </>
  );
};

export default SavedPost;
