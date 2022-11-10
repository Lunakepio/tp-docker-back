import * as React from "react";
import "./assets/style/settings.scss";
import axios from "axios";
import { Context } from "./App";
import { useParams } from "react-router-dom";

function Post() {
  const values = React.useContext(Context);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  if (values.isLogin === false) {
    window.location.href = "/";
  }

  const { id } = useParams();

  React.useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`).then((res) => {
      setTitle(res.data.userName);
      setContent(res.data.content);
    });
  }, []);

  function Blog(props) {
    const [blogText, setBlogText] = React.useState(props.item.content);
    const [isEdit, setIsEdit] = React.useState(false);
    return (
      <div className="blog" key={props.item._id}>
        <div className="left">
          <p>
            <span>{props.item.userName}</span>
          </p>
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
          <h1>{title}</h1>
          <p>{content}</p>
        <div className="blogSection"></div>
      </div>
      <div className="col right">x</div>
    </div>
  );
}

export default Post;
