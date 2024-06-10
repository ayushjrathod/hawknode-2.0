import { Editor } from "@tinymce/tinymce-react";
import axios, { axiosPrivate } from "../api/axios.jsx";
import {useState,useRef,useCallback} from "react";


function Compose() {
  const editorRef = useRef(null);
  const titleRef =useRef();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  

  const handleEditorChange = useCallback((content, editor) => {
    setContent(content);
    setTitle(titleRef.current.value);
  }, []);

  const data={
    title:title,
    content:content,
  }

  const handleClick = (e) => {
    e.preventDefault();

    console.log(data);
    axios
    .post("/v1/posts/create-post",data)
    .then((response)=>{
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
    });


  };

  return (
    <>
      <h1 className="font-Akshar text-4xl font-medium px-10 py-3">Compose</h1>
      <div className="flex justify-between m-2">
      <input ref={titleRef} placeholder="Title" className="w-[80%] p-2 top-[116px] rounded-md font-Akshar text-2xl outline-none"/>

      <button
        onClick={handleClick}
        className="bg-black text-white font-Akshar font-bold p-2 rounded-3xl px-8 mx-6 text-xl"
      >
        Post
      </button>
      </div>

      <Editor
        apiKey="8w3gs7kyl0a3tx4ajvykqc6cv9u592zxc9el6ifsdvqsqezd"
        initialValue=""
        onEditorChange={handleEditorChange}
        init={{
          inline_boundaries_selector:false,
          inline_boundaries:false,  
          height:500,
          placeholder:"I am waiting for your thougts ...",
          menubar:false,
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough code | link image media table | align lineheight | checklist numlist bullist indent outdent",
        }}
      />

    </>
  );
}

export default Compose;