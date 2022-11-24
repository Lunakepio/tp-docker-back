import * as React from "react";
import "./assets/style/settings.scss";
import axios from "axios";
import logo from "./assets/img/logo.png";
import memoji from "./assets/img/memoji.png";
import { Context } from "./App";
import { useNavigate, Link } from "react-router-dom";
import Profile from "./Profile";
import Nav from "./Nav";

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
    const [showPostActions, setShowPostActions] = React.useState(false);
    const [like, setLike] = React.useState(false);
    const [likeCount, setLikeCount] = React.useState(props.item.likes);

    const getAllLikes = () => {
      axios.get(`http://localhost:3000/likes/${props.item._id}`).then((res) => {
        console.log(res);
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

  function Comments(props) {
    const [blogText, setBlogText] = React.useState(props.item.content);
    const [isEdit, setIsEdit] = React.useState(false);
    const [showPostActions, setShowPostActions] = React.useState(false);
    const [like, setLike] = React.useState(false);
    const [likeCount, setLikeCount] = React.useState(props.item.likes);

    const deleteComment = (e, id) => {
      e.preventDefault();
      axios
        .delete(`http://localhost:3000/comments/${id}`)
        .then((res) => {
          console.log(res);
          setComments(comments.filter((item) => item._gid !== id));
        });
    }

    const getAllLikes = () => {
      axios.get(`http://localhost:3000/likes/comments/${props.item._id}`).then((res) => {
        console.log(res);
        res.data.map((item) => {
          if (item.userId === values.userId) {
            setLike(true);
          }
        });
      });
    };

    React.useEffect(() => {
      getAllLikes();
    }, []);

    const likeAComment = (e, id) => {
      e.preventDefault();
      axios
        .post(`http://localhost:3000/likes/comments/${id}`, {
          userId: values.userId,
          commentId: id
        })
        .then((res) => {
          console.log(res);
          setLike(true);
        });
    };

    const unlikeAComment = (e, id) => {
      console.log(id);
      e.preventDefault();
      axios
        .delete(`http://localhost:3000/likes/comments/${id}`, {
          data: {
            userId: values.userId,
            commentId: id
          }
        })
        .then((res) => {
          console.log(res);
          setLike(false);
        });
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
                      <span onClick={(e) => deleteComment(e, props.item._id)}>
                        􀈑&nbsp;&nbsp;Delete your comment
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
            {!like ? (
              <span
                className="symbol like"
                onClick={(e) => {likeAComment(e, props.item._id); setLikeCount(likeCount + 1)}}
              >
                􀊴 &nbsp; {likeCount}
              </span>
            ) : (
              <span
                className="symbol like"
                onClick={(e) => {unlikeAComment(e, props.item._id); setLikeCount(likeCount - 1)}}
              >
                􀊵 &nbsp; {likeCount}
              </span>
            )}
          </div>
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
      <Nav/>
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
