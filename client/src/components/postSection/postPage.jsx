import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios.jsx";

function PostPage() {
  const { postID } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/v1/posts/${postID}`);
        setPost(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPost();
  }, [postID]);

  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Thumbnail */}
      <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
        <img className="w-full h-96 object-cover" src={post.thumbnail} alt={post.title} loading="lazy" />
      </div>
      {/* Title */}
      <h1 className="text-3xl font-Andada Pro sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-loose">
        {post.title}
      </h1>
      {/* Author Info */}
      <div className="flex items-center mb-8 space-x-4">
        <img className="w-12 h-12 rounded-full object-cover" src="../src/assets/avatar.avif" alt="Author avatar" />
        <div>
          <p className="font-medium text-gray-900">Blogger Hawk</p>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      {/* Content */}
      <article className="prose lg:prose-xl max-w-3xl mb-8">
        <div
          className="text-black font-normal tracking-wide text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostPage;
