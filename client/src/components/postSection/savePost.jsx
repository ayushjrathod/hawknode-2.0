import { useState } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const SavedPost = ({ postData }) => {
  const [isSaved, setIsSaved] = useState(false);
  const {auth} = useAuth();

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
    <div>
      <button onClick={handleSave} className="hover:opacity-60">
        <CiSaveDown2
          className={`text-2xl pointer-event-none
        ${isSaved ? "text-yellow-600" : ""}
        `}
        />
      </button>
    </div>
  );
};

export default SavedPost;
