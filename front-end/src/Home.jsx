import * as React from "react";
import "./assets/style/settings.scss";
import axios from "axios";
import logo from "./assets/img/logo.png";
import memoji from "./assets/img/memoji.png";
import { Context } from "./App";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Profile from "./Profile";
import Nav from "./Nav";

function Home() {
  const values = React.useContext(Context);
  const [text, setText] = React.useState("");
  const [post, setPost] = React.useState([]);
  const [filteredPost, setFilteredPost] = React.useState([]);
  const [showProfileActions, setShowProfileActions] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
        setPost([res.data, ...filteredPost]);
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
      });
  }, []);

  React.useEffect(() => {
    //order post by date desc
    if(post.length > 0){
      setFilteredPost(post.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
  }, [post]);
  function Blog(props) {
    const [blogText, setBlogText] = React.useState(props.item.content);
    const [isEdit, setIsEdit] = React.useState(false);
    const [showPostActions, setShowPostActions] = React.useState(false);
    const [like, setLike] = React.useState(false);
    const [likeCount, setLikeCount] = React.useState(props.item.likes);

    const getAllLikes = () => {
      axios.get(`http://localhost:3000/likes/${props.item._id}`).then((res) => {
        res.data.map((item) => {
          if (item.userId === values.userId) {
            setLike(true);
          }
        });
      });
    };

    const saveEdit = (e, id, blogText) => {
      e.preventDefault();
      axios
        .put(`http://localhost:3000/posts/${id}`, {
          content: blogText,
        })
        .then((res) => {
          setPost(post.map((item) => (item._id === id ? res.data : item)));
        });
    };
  
    const deletePost = (e, id) => {
      axios
        .delete(`http://localhost:3000/posts/${id}`)
        .then((res) => {
          setPost(post.filter((item) => item._id !== id));
        })
        .catch((err) => {
        });
    };
  
    const reporting = (e, id) => {
      console.log("test");
    };

    React.useEffect(() => {
      getAllLikes();
    }, []);

    const likeAPost = (e, userId, postId) => {
      e.preventDefault();
      setLike(!like);
      axios
        .post(`http://localhost:3000/likes/${postId}`, {
          userId: userId,
          postId: postId,
        })
        .then((res) => {
          console.log(res);
        });
    };

    const unlikeAPost = (e, userId, postId) => {
      e.preventDefault();
      setLike(!like);
      axios
        .delete(`http://localhost:3000/likes/${postId}`, {
          data: {
            userId: userId,
            postId: postId,
          },
        })
        .then((res) => {
          console.log(res);
        });
      console.log(e);
    };

    return (
      <div className="blog">
        <div className="content">
          <div className="row">
            <p>
              <span>{props.item.userName}</span>
            </p>

            {!showPostActions ? (
              <div
                className="moreActions"
                onClick={() => setShowPostActions(!showPostActions)}
              >
                ‧‧‧
              </div>
            ) : (
              <div className="actions">
              <div className="row cancel">
                      <span onClick={() => setShowPostActions(!showPostActions)}>
                        􀆄&nbsp;&nbsp;Close this menu
                      </span>
                    </div>
                {values.userId == props.item.userId ? (
                  <>
                    {" "}
                    <div className="row edit">
                      <span onClick={() => setIsEdit(!isEdit)}>
                        􀈎&nbsp;&nbsp;Edit your post
                      </span>
                    </div>
                    <div className="row delete">
                      <span onClick={(e) => deletePost(e, props.item._id)}>
                        􀈑&nbsp;&nbsp;Delete your post
                      </span>
                    </div>
                    {isEdit ? (
                      <div className="row save">
                        <span onClick={(e) => saveEdit(e, props.item._id, blogText)}>
                          􀈄&nbsp;&nbsp;Save edits
                        </span>
                      </div>
                    ) : null}
                  </>
                ) : (
                  ""
                )}
                <div className="row report">
                  <span onClick={(e) => reporting(e, props.item._id)}>
                    􀋉&nbsp;&nbsp;Report this post
                  </span>
                </div>
              </div>
            )}
          </div>
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
          <div className="postActions">
            <span
              className="symbol comment"
              onClick={() => navigate(`/post/${props.item._id}`)}
            >
              􀌤 &nbsp; {props.item.comments} &nbsp;&nbsp;
            </span>
            &nbsp;
            {!like ? (
              <span
                className="symbol like"
                onClick={(e) => {likeAPost(e, values.userId, props.item._id); setLikeCount(likeCount + 1)}}
              >
                􀊴 &nbsp; {likeCount}
              </span>
            ) : (
              <span
                className="symbol like"
                onClick={(e) => {unlikeAPost(e, values.userId, props.item._id); setLikeCount(likeCount - 1)}}
              >
                􀊵 &nbsp; {likeCount}
              </span>
            )}
            &nbsp;
            {/* {values.userId === props.item.userId ? (
            <>
              <span className="symbol edit" onClick={(e) => setIsEdit(true)}>
                􀈎
              </span>
              &nbsp;
              <span
                className="symbol delete"
                onClick={(e) => deletePost(e, props.item._id)}
              >
                􀈑
              </span>
            </>
          ) : (
            ""
          )} */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="col left">
      <Nav/>
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
            value={text}
          />
          <button
            type="submit"
            onClick={(e) => {createABlog(e), setText("")}}
            onKeyDown={(e) => handleKeyPress(e)}
          >
            Blog it !
          </button>
        </div>
        <div className="blogSection">
          {filteredPost.map((item) => {
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
