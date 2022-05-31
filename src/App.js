import "./App.css";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import client from "./Client/client";
import PostForm from "./components/PostForm";
import Header from "./components/Header";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        let response = await client.get("?_limit=10");
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  const deletePost = async (id) => {
    await client.delete(`${id}`);
    setPosts(
      posts.filter((post) => {
        return post.id !== id;
      })
    );
  };
  const handleSetPost = (response) => {
    setPosts([response.data, ...posts]);
  };

  return (
    <div className="main-container">
      <Header />
      <PostForm handleSetPost={handleSetPost} />
      <hr class="solid" />
      {posts.map((post) => {
        return (
          <div className="post-card" key={post.id}>
            <div className="title-row">
              <h2 className="post-title">{post.title}</h2>
              <FaTrash
                className="delete-btn"
                onClick={() => deletePost(post.id)}
              />
            </div>
            <p className="post-body">{post.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
