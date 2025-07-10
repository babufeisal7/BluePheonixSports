import React, { useState } from "react";

const initialPosts = [
  {
    id: 1,
    title: "Welcome to Our Blog",
    excerpt: "Introductory post to welcome readers to our blog section.",
    content: "This is the full content of the welcome post.",
    publishDate: "2025-07-01",
    imageUrl: "/photo5.jpg", // example image url
  },
  {
    id: 2,
    title: "Training Tips for Rugby Players",
    excerpt: "Essential training tips to improve your rugby skills.",
    content: "Detailed tips on training, fitness, and tactics.",
    publishDate: "2025-07-05",
    imageUrl: "/public/image3.jpg",
  },
];

const BlogEditor = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    publishDate: "",
    imageUrl: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      publishDate: "",
      imageUrl: "",
    });
    setEditingPost(null);
    setStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.publishDate) {
      setStatus("Please fill in Title, Content, and Publish Date.");
      return;
    }

    if (editingPost) {
      // Update existing
      setPosts((prev) =>
        prev.map((post) =>
          post.id === editingPost.id ? { ...editingPost, ...formData } : post
        )
      );
      setStatus("Post updated successfully!");
    } else {
      // Add new
      const newPost = { id: Date.now(), ...formData };
      setPosts((prev) => [newPost, ...prev]);
      setStatus("New post added successfully!");
    }

    resetForm();
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      publishDate: post.publishDate,
      imageUrl: post.imageUrl || "",
    });
    setStatus("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts((prev) => prev.filter((post) => post.id !== id));
      if (editingPost?.id === id) resetForm();
      setStatus("Post deleted.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Blog Editor</h2>

      {/* Status message */}
      {status && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded text-center sm:text-left">
          {status}
        </div>
      )}

      {/* Blog Posts List */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Existing Posts</h3>
        {posts.length === 0 ? (
          <p>No blog posts found.</p>
        ) : (
          <ul className="space-y-4 max-h-64 overflow-auto border p-2 rounded">
            {posts.map((post) => (
              <li
                key={post.id}
                className="border-b last:border-b-0 pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-20 h-20 object-cover rounded flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <strong className="block truncate">{post.title}</strong>
                    <small className="text-gray-600">
                      {new Date(post.publishDate).toLocaleDateString()}
                    </small>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
                <div className="space-x-2 flex-shrink-0 flex">
                  <button
                    onClick={() => handleEdit(post)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Blog Post Form */}
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow-md max-w-xl mx-auto"
      >
        <h3 className="text-xl font-semibold mb-4 text-center sm:text-left">
          {editingPost ? "Edit Post" : "Add New Post"}
        </h3>

        <div className="mb-3">
          <label className="block font-semibold mb-1" htmlFor="title">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter post title"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block font-semibold mb-1" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter image URL"
          />
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="mt-2 w-40 h-40 object-cover rounded border mx-auto sm:mx-0"
            />
          )}
        </div>

        <div className="mb-3">
          <label className="block font-semibold mb-1" htmlFor="excerpt">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={2}
            placeholder="Short summary or excerpt"
          />
        </div>

        <div className="mb-3">
          <label className="block font-semibold mb-1" htmlFor="content">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={6}
            placeholder="Write the full blog content"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block font-semibold mb-1" htmlFor="publishDate">
            Publish Date *
          </label>
          <input
            type="date"
            id="publishDate"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-2 gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {editingPost ? "Update Post" : "Add Post"}
          </button>
          {editingPost && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
