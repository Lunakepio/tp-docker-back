import * as React from "react";
import "./assets/style/settings.scss";
import axios from "axios";
import logo from "./assets/img/logo.png";
import memoji from "./assets/img/memoji.png";
import { Context } from "./App";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";

function Home() {
  const values = React.useContext(Context);
  const [text, setText] = React.useState("");
  const [post, setPost] = React.useState([]);
  const [showProfileActions, setShowProfileActions] = React.useState(false);
  const navigate = useNavigate();

  console.log(values);
  const createABlog = (e) => {
    setText("");

    e.preventDefault();
    axios
      .post("http://localhost:3000/posts", {
        userId: values.userId,
        userName: values.userName,
        content: text,
      })
      .then((res) => {
        console.log(res);
        setPost([...post, res.data]);
        console.log(post);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && text !== "") {
      createABlog();
    }
  };

  const logout = () => {
    values.setIsLogin(false);
    values.setUserName("");
    values.setUserEmail("");
    values.setUserId("");
    navigate("/");
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const saveEdit = (e, id, blogText) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/posts/${id}`, {
        content: blogText,
      })
      .then((res) => {
        console.log(res);
        setPost(post.map((item) => (item._id === id ? res.data : item)));
      });
  };

  const deletePost = (e, id) => {
    axios
      .delete(`http://localhost:3000/posts/${id}`)
      .then((res) => {
        console.log(res);
        setPost(post.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function Blog(props) {
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
              onClick={(e) => saveEdit(e, props.item._id, blogText)}
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
          &nbsp;
          {values.userId === props.item.userId ? (
            <>
              <span className="edit" onClick={(e) => setIsEdit(true)}>
                📝
              </span>
              <span
                className="delete"
                onClick={(e) => deletePost(e, props.item._id)}
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
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="col middle">
        <div className="inputSection">
          <input
            type="text"
            placeholder="What are your thoughts ?"
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            onClick={(e) => createABlog(e)}
            onKeyDown={(e) => handleKeyPress(e)}
          >
            Blog it !
          </button>
        </div>
        <div className="blogSection">
          {post.map((item) => {
            return (
              <div className="" key={item._id}>
                <Blog item={item} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="col right">
       <Profile />
      </div>
    </div>
  );
}

export default Home;
