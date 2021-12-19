import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import Api from "../../util/Api";
import "./Main.css";
import editLogo from "./edit.png";
import Post from "./post/Post";

const Main = ({ userName }) => {
  const [show, setShow] = useState(false);
  const [posts, setPostList] = useState([]);
  const [text, setPostText] = useState("");

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  const fetchData = async () => {
    try {
      const res = await Api.get("/posts/");
      setPostList(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnModalClose = () => {
    setShow(false);
  };

  const addNewPost = async () => {
    const res = await Api.post("/posts", {
      text: text,
      name: userName,
    });
    setPostList(res?.data);
    handleOnModalClose();
  };

  const saveComment = async (formData) => {
    const apipath = `/posts/comment`;
    const res = await Api.post(apipath, formData);
    console.log(res.data);
    //setPostList(res?.data);
  };

  const deletePost = async (formData) => {
    const res = await Api.delete(`/posts/${formData.postId}/${formData.name}`);
    setPostList(res.data);
  };

  const deleteComment = async (formData) => {
    console.log(formData);
    const res = await Api.post("/posts/comment/delete", formData);
    setPostList(res.data);
  };

  if (!userName) return null;

  return (
    <div className="main">
      <div onClick={() => setShow(true)}>
        <div className="newpost">
          <div className="editButton">
            <img className="edit" src={editLogo} alt="BigCo Inc. logo" />
            <p className="addText">Ask your question or post an update</p>
          </div>
        </div>
      </div>
      <div className="postlist">
        <h3
          style={{ margin: "0", padding: "15px 15px", backgroundColor: "#fff" }}
        >
          My Posts
        </h3>
        {posts.map((item) => {
          return (
            <Post
              item={item}
              saveCommentCallback={saveComment}
              userName={userName}
              deletePost={deletePost}
              deleteCommentCallback={deleteComment}
            />
          );
        })}
        {!posts.length && (
          <div>
            <p>No Posts fot this User!</p>
          </div>
        )}
      </div>
      <Modal title="Add Post" onClose={handleOnModalClose} show={show}>
        <div className="form">
          <label>Type what you think to post</label>
          <textarea
            onChange={(e) => setPostText(e.target.value)}
            className="posttext"
          />
          <button onClick={addNewPost} className="saveBtn">
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Main;
