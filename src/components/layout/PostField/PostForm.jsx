import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { submitPostForm } from "../../../redux/actions/userAction";

import PostBody from "./PostBody";
import PostSubmitButton from "./PostSubmitButton";

import "../../../styles/PostForm.css";

const PostForm = ({ submitPostForm }) => {
  const [title, setTitle] = useState(localStorage.getItem("post_title") || "");
  const [body, setBody] = useState(
    JSON.parse(localStorage.getItem("post_body")) || INITIAL_BODY
  );
  const [tags, setTags] = useState(
    (localStorage.getItem("post_tags") &&
      localStorage.getItem("post_tags").split(",")) ||
      []
  );
  const [banned, setBanned] = useState(
    localStorage.getItem("post_banned") || ""
  );

  const setNewBody = bodyJSON => {
    setBody(bodyJSON);

    localStorage.setItem("post_body", JSON.stringify(bodyJSON));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const postData = {
      title,
      body,
      jsonMetaData: JSON.stringify({
        tags,
        app: "unban.com",
        banned,
        content_domain: window.location.origin,
      }),
    };

    submitPostForm(postData);
  };

  return (
    <Fragment>
      <div className="post-form-container">
        <form onSubmit={e => handleSubmit(e)} className="post-form">
          <input
            type="text"
            className="post-title"
            placeholder="Title"
            value={title}
            onChange={e => {
              let value = e.target.value;
              localStorage.setItem("post_title", value);
              setTitle(value);
            }}
          />
          <PostBody updateBody={setNewBody} bodyValue={body} />
          <input
            type="text"
            className="post-tags"
            placeholder="Enter your tags seprated by space"
            value={tags.join(" ")}
            onChange={e => {
              let newTags = e.target.value.split(" ");
              localStorage.setItem("post_tags", newTags);
              setTags(newTags);
            }}
          />
          <input
            type="text"
            className="post-source"
            placeholder="(optional) Link banned post or account"
            value={banned}
            onChange={e => {
              let bannedValue = e.target.value;
              localStorage.setItem("post_banned", bannedValue);
              setBanned(bannedValue);
            }}
          />
          <PostSubmitButton />
        </form>
      </div>
    </Fragment>
  );
};

const INITIAL_BODY = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default connect(null, { submitPostForm })(PostForm);
