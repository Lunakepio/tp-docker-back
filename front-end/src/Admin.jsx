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
  const [comments, setComments] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [showProfileActions, setShowProfileActions] = React.useState(false);
  const navigate = useNavigate();
  const [page, setPage] = React.useState("posts");

  console.log(values);

  const getAllPosts = () => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllComments = () => {
    axios
      .get("http://localhost:3000/comments")
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllUsers = () => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getAllPosts();
    getAllComments();
    getAllUsers();
  }, []);



  function Blog(props) {
    const [blogText, setBlogText] = React.useState(props.item.content);
    const [isEdit, setIsEdit] = React.useState(false);

    const deletePost = (e, id) => {
      e.preventDefault();
      axios
        .delete(`http://localhost:3000/posts/${id}`)
        .then((res) => {
          console.log(res);
          getAllPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const saveEdit = (e, id, blogText) => {
      e.preventDefault();
      axios
        .put(`http://localhost:3000/posts/${id}`, {
          content: blogText,
        })
        .then((res) => {
          console.log(res);
          getAllPosts();
          setIsEdit(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };


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
              <span className="edit" onClick={(e) => setIsEdit(true)}>
                📝
              </span>
              <span
                className="delete"
                onClick={(e) => deletePost(e, props.item._id)}
              >
                🗑️
              </span>
        </div>
      </div>
    );
  }

  function Comments(props) {
    const [blogText, setBlogText] = React.useState(props.item.content);
    const [isEdit, setIsEdit] = React.useState(false);

    const deleteComment = (e, id) => {
      e.preventDefault();
      axios
        .delete(`http://localhost:3000/comments/${id}`)
        .then((res) => {
          console.log(res);
          getAllComments();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const saveEdit = (e, id, blogText) => {
      e.preventDefault();
      axios
        .put(`http://localhost:3000/comments/${id}`, {
          content: blogText,
        })
        .then((res) => {
          console.log(res);
          getAllComments();
          setIsEdit(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };


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
        </div>
      </div>
    );
  }

  function Users(props) {
    return (
      <div className="blog">
        <div className="left">
          <p>
            <span>{props.item.name}</span>
          </p>
          <br></br>
          <p>{props.item.email}</p>
        </div>
        <div className="right">
          <span
            className="comment"
            onClick={() => navigate(`/user/${props.item._id}`)}
            key={props.item._id}
          >
            📄
          </span>
          &nbsp;
          <span
            className="delete"
            onClick={(e) => deleteUser(e, props.item._id)}
          >
            🗑️
          </span>
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
        <div className="nav">
          <div className={page === "posts" ? "item active" : "item"} onClick={() => setPage("posts")}>Posts</div>
          <div className={page === "comments" ? "item active" : "item"} onClick={() => setPage("comments")}>Comments</div>
          <div className={page === "users" ? "item active" : "item"} onClick={() => setPage("users")}>Users</div>
        </div>
        </div>
        <div className="blogSection">
          {page === "posts" ? (
            post.map((item) => {
              return <Blog item={item} key={item._id} />;

            })
          ) : page === "comments" ? (
            comments.map((item) => {
              return <Comments item={item} key={item._id} />;

            })
          ) : (
            users.map((item) => {
              return <Users item={item} key={item._id} />;
            })
          )}

        </div>
      </div>
      <div className="col right">
          <Profile/>
      </div>
    </div>
  );
}

export default Home;
