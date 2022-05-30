// import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import client from "./Client/client";
import PostForm from "./components/PostForm";

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
  // const PostItem: React.FC<{
  //   id: string,
  //   title: string,
  //   body: string,
  // }> = (id, title, body) => {
  //   return (
  //     <div className="post-card" key={id}>
  //       <div className="title-row">
  //         <h2 className="post-title">{title}</h2>
  //         {/* <button className="delete-btn"> */}
  //         <FaTrash className="delete-btn" onClick={() => deletePost(id)} />
  //         {/* </button> */}
  //       </div>
  //       <p className="post-body">{body}</p>
  //     </div>
  //   );
  // };
  return (
    <div>
      <PostForm handleSetPost={handleSetPost} />
      <h2 className="header-title">All Posts </h2>
      {/* {posts.map((post) => {
        return <PostItem id={post.id} title={post.title} body={post.body} />;
      })} */}

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
