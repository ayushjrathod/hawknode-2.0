import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import Preview from "./preview";

const Compose = () => {
  const [description, setDescription] = useState("");
  const [ publish, setPublish ] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <div>
      <div>
        <button
          onClick={() => setPublish(true)}
          className="bg-green-700 p-2 font-Akshar text-lg font-semibold text-white rounded-full absolute right-0 m-2"
        >
          Publish
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
          className="write my-5"
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
