import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const SavedPost = ({ postData,mappedPostIsSaved }) => {
  const {auth} = useAuth();
  const [isSaved, setIsSaved] = useState(mappedPostIsSaved);

  const handleSave = (e) => {
    e.preventDefault();
    
    const data = {
        userId: auth.user._id,
        isSaved, 
    }

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
        {isSaved ? (
          <i className="bx bx-bookmark-minus bx-sm" />
        ) : (
          <i className="bx bx-bookmark-plus bx-sm" />
        )}
      </button>
    </>
  );
};

export default SavedPost;
