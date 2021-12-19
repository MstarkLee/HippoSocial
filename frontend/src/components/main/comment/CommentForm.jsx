import React, { useState } from "react";
import Gravatar from "react-gravatar";

const CommentForm = ({ fetchCoometText }) => {
  const [commentText, setCommentText] = useState();

  const submitComment = () => {
    fetchCoometText(commentText);
    setCommentText("");
  };

  return (
    <div className="newcommentsection">
      <Gravatar className="avatar" email="mathews.kyle@gmail.com" />
      <input
        className="newpsotinput"
        placeholder="write a comment..."
        onChange={(e) => {
          setCommentText(e.target.value);
        }}
      />
      {commentText && (
        <button className="postCommentBtn" onClick={submitComment}>
          Post
        </button>
      )}
    </div>
  );
};

export default CommentForm;
