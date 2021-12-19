import React, { useEffect, useState } from "react";
import Delete from "../delete.png";
import "./Post.css";
import Gravatar from "react-gravatar";
import Comment from "../comment/Comment";
import CommentForm from "../comment/CommentForm";

const Post = ({
  item,
  saveCommentCallback,
  userName,
  deletePost,
  deleteCommentCallback,
}) => {
  const [commetslist, setCommentList] = useState([]);

  useEffect(() => {
    setCommentList(item.comments);
  }, [item]);

  const handleDeletePost = () => {
    deletePost({ name: userName, postId: item._id });
  };

  const saveCommentD = (formData) => {
    saveCommentCallback(formData);
  };

  const saveCommentC = (commentText) => {
    saveCommentCallback({
      name: userName,
      text: commentText,
      id: item._id,
    });

    setCommentList([
      ...commetslist,
      {
        name: userName,
        text: commentText,
        id: item._id,
      },
    ]);
  };

  const deleteComment = (formData) => {
    console.log(formData);
    deleteCommentCallback?.(formData);
  };
  return (
    <div className="postSection">
      <div className="postdetailssection">
        <div className="postheader">
          <div className="postname">
            <Gravatar
              style={{ width: "40px", height: "40px" }}
              className="avatar"
              email="mathews.kyle@gmail.com"
            />

            <h3>{item.name}</h3>
          </div>
          <img
            onClick={handleDeletePost}
            className="option"
            src={Delete}
            alt="option"
          />
        </div>
        <div className="postdetails">
          <p>{item.text}</p>
        </div>
      </div>
      <div className="postcommets">
        <div className="exsitingcomments">
          {commetslist.map((comment, index) => {
            return (
              <Comment
                deleteComment={deleteComment}
                saveCommentD={saveCommentD}
                userName={userName}
                item={item}
                comment={comment}
              />
            );
          })}
        </div>
        <CommentForm fetchCoometText={saveCommentC} />
      </div>
    </div>
  );
};

export default Post;
