import React, { useState } from "react";
import client from "../Client/client";
import styles from "./PostForm.module.css";

const PostForm = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && body.trim) {
      addPosts(title, body);
    } else {
      alert("Please add post");
    }
  };
  const addPosts = async (title, body) => {
    let response = await client.post("", {
      title: title,
      body: body,
    });
    props.handleSetPost(response);

    // .then((response) => {
    //   props.handleSetPost(response);
    // });
    setTitle("");
    setBody("");
  };
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeBody = (e) => {
    setBody(e.target.value);
  };
  return (
    <div className={styles.formDiv}>
      <form onSubmit={handleSubmit}>
        {/* //className="form-container" */}
        <input
          type="text"
          className={styles.inputText}
          placeholder="Add post title..."
          value={title}
          name="title"
          onChange={onChangeTitle}
        />
        <textarea
          type="text"
          placeholder="Post's Body"
          className={styles.textAreaText}
          value={body}
          name="body"
          onChange={onChangeBody}
        />
        <button className={styles.inputSubmit}>Add Post</button>
      </form>
    </div>
  );
};

export default PostForm;
