import { useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import Preview from "./preview";

const Compose = () => {
  const [description, setDescription] = useState("");
  const [publish, setPublish] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <div>
      <div className="flex justify-between m-2">
        <div>
          <Link to="/">
            <img src="../src/assets/hawknodeLogo.png" className="size-6"/>
          </Link>
        </div>
        <div className="flex">
          <div className="w-20 mx-2 bg-black rounded-full flex justify-center">
            <Link
              to="/"
              className="mx-2 px-2 font-Akshar text-lg font-semibold text-white"
            >
              Home
            </Link>
          </div>
          <div className="w-20 bg-black rounded-full flex justify-center">
            <button
              onClick={() => setPublish(true)}
              className="mx-2 px-2 font-Akshar text-lg font-semibold text-white"
            >
              Publish
            </button>
          </div>
        </div>
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
        <div
          className={`${
            publish ? "visible opacity-100" : "invisible opacity-0"
          } transition-all duration-200`}
        >
          <Preview
            setPublish={setPublish}
            description={description}
            title={title}
          />
        </div>
      </section>
    </div>
  );
};

export default Compose;
