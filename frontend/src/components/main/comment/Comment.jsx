import { useState } from "react";
import Gravatar from "react-gravatar";
import Delete from "../delete.png";
import Replay from "../replay.png";
import CommentForm from "./CommentForm";

const Comment = ({ deleteComment, userName, item, comment, saveCommentD }) => {
  const [replaymessage, setReplaycommentBox] = useState();

  const handleDeleteComment = (commenId) => {
    deleteComment({ name: userName, postId: item._id, commentId: commenId });
  };

  const saveComment = (commentText) => {
    console.log(commentText, "comment");
    saveCommentD({
      name: userName,
      text: commentText,
      id: item._id,
      commentId: comment._id,
    });
  };

  return (
    <div className="commentitem">
      <div className="commentitemname">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Gravatar
            className="avatar"
            email={`mathews.kyle${item._id}@gmail.com`}
          />

          <h6 style={{ margin: 0 }}>{comment.name}</h6>
        </div>
        <img
          onClick={() => handleDeleteComment(comment._id)}
          className="option"
          src={Delete}
          alt="option"
          style={{ width: "10px", height: "10px" }}
        />
      </div>
      <div style={{ margin: 0, paddingLeft: "40px" }}>
        <p style={{ margin: 0 }}>{comment.text}</p>
        {!comment?.comments?.length && (
          <img
            onClick={() => setReplaycommentBox(true)}
            className="option"
            src={Replay}
            alt="option"
            style={{ width: "10px", height: "10px" }}
          />
        )}
        {replaymessage && <CommentForm fetchCoometText={saveComment} />}
        {comment?.comments?.map((item) => {
          return (
            <div className="commentitem">
              <div className="commentitemname">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Gravatar
                    className="avatar"
                    email={`mathews.kyle${item._id}@gmail.com`}
                  />

                  <h6 style={{ margin: 0 }}>{comment.name}</h6>
                </div>
              </div>
              <p style={{ margin: 0 }}>{comment.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
