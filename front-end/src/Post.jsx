import * as React from "react";
import "./assets/style/settings.scss";
import axios from "axios";
import { Context } from "./App";
import { useParams } from "react-router-dom";
import Profile from "./Profile";
import Nav from "./Nav";
import logo from "./assets/img/logo.png";

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

  return (
    <div className="home">
      <div className="col left">
      <Nav/>
        <div className="logo">
          <img src={logo} alt="logo" />
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
