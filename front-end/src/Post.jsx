import * as React from "react";
import "./assets/style/settings.scss";
import axios from "axios";
import { Context } from "./App";
import { useParams } from "react-router-dom";
import Profile from "./Profile";

function Post() {
  const values = React.useContext(Context);
  const [comment, setComment] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const [comments, setComments] = React.useState([]);
  const { id } = useParams();

  React.useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`).then((res) => {
      setTitle(res.data.userName);
      setContent(res.data.content);
    });
  }, []);

  const createAComment = (e) => {
    if (comment !== "") {
      setComment("");

      e.preventDefault();
      axios
        .post(`http://localhost:3000/posts/${id}/comments`, {
          userId: values.userId,
          userName: values.userName,
          content: comment,
          post_id: id,
        })
        .then((res) => {
          console.log(res);

          console.log(content);
          setComments([...comments, res.data]);
        });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && comment !== "") {
      createAComment();
    }
  };

  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && comment !== "") {
      createAComment();
    }
  });

  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${id}/comments`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const saveEdit = (e, id, commentText) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/comments:${id}`, {
        content: commentText,
      })
      .then((res) => {
        console.log(res);
        setComments(
          comments.map((item) => (item._id === id ? res.data : item))
        );
      });
  };

  const deleteComment = (e, id) => {
    e.preventDefault();
    axios.delete(`http://localhost:3000/comments/${id}`).then((res) => {
      console.log(res);
      setComments(comments.filter((item) => item._id !== id));
    });
  };

  function Comments(props) {
    const [blogText, setBlogText] = React.useState(props.item.content);
    const [isEdit, setIsEdit] = React.useState(false);
    return (
      <div className="blog">
        <div className="left">
          <p>
            <span>{props.item.userName}</span>
          </p>
          <br></br>
          {!isEdit ? (
            <p>{props.item.content}</p>
          ) : (
            <input
              value={blogText}
              onChange={(e) => setBlogText(e.target.value)}
              autoFocus={true}
            />
          )}
        </div>
        <div className="right">
          {isEdit ? (
            <span
              className="save"
              onClick={() => saveEdit(e, props.item._id, blogText)}
            >
              ✅
            </span>
          ) : (
            ""
          )}
          &nbsp;
          <span
            className="comment"
            onClick={() => navigate(`/post/${props.item._id}`)}
            key={props.item._id}
          >
            💬
          </span>
          {props.item.userId === values.userId ? (
            <>
              &nbsp;
              <span className="edit" onClick={(e) => setIsEdit(true)}>
                📝
              </span>
              &nbsp;
              <span
                className="delete"
                onClick={(e) => deleteComment(e, props.item._id)}
              >
                🗑️
              </span>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="col left">
        <div className="name">
          <p>{values.userName}</p>
          <p>
            <span>{values.userEmail}</span>
          </p>
        </div>
      </div>
      <div className="col middle">
        <div className="post">
          <h1>{title}</h1>
          <p>{content}</p>
        </div>
        <div className="blogSection">
          <div className="inputSection">
            <input
              type="text"
              placeholder="Write a comment."
              onChange={(e) => setComment(e.target.value)}
              autoFocus={true}
            />
            <button
              type="submit"
              onClick={(e) => createAComment(e)}
              onKeyDown={(e) => handleKeyPress(e)}
            >
              Comment it !
            </button>
          </div>
          <div className="blogSection">
            {comments.map((item) => (
              <div className="" key={item._id}>
                <Comments item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col right"><Profile/></div>
    </div>
  );
}

export default Post;
