import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { Link } from "react-router-dom";
import Preview from "./preview";

const Compose = () => {
  const [description, setDescription] = useState("");
  const [publish, setPublish] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 bg-white z-10">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img src="../src/assets/hawknodeLogo.png" className="w-6 h-6" alt="Hawknode" />
          </Link>
          <button
            onClick={() => setPublish(true)}
            className="px-4 rounded-full font-Akshar text-lg border-[0.4px] border-black"
          >
            Publish
          </button>
        </div>
      </div>

      <section className="max-w-3xl mx-auto px-4 pt-24 pb-16">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="text-4xl font-bold outline-none w-full mb-4 placeholder-gray-300 focus:placeholder-gray-400 transition-colors"
        />

        <ReactQuill
          theme="bubble"
          value={description}
          onChange={setDescription}
          placeholder="Waiting for your thoughts ..."
          className="min-h-[60vh] prose max-w-none"
        />
        <div className={`${publish ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-200`}>
          <Preview setPublish={setPublish} description={description} title={title} />
        </div>
      </section>
    </div>
  );
};

export default Compose;
