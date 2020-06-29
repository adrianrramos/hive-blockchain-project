import React from "react";

import PostForm from "../layout/PostField/PostForm";
import ContentLists from "../layout/DisplayContent/ContentLists";
import FilterBar from "../layout/DisplayContent/FilterBar";

import "../../styles/Home.css";

const Home = ({ match, formOpen }) => {
  return (
    <div className="post-page-container">
      <div
        className="postform-root"
        style={{
          display: formOpen ? "block" : "none",
          transition: "display 500ms ease",
        }}
      >
        <PostForm />
      </div>
      <div className="filterbar-container">
        <FilterBar match={match} />
      </div>
      <div className="content-container">
        <ContentLists />
      </div>
    </div>
  );
};

export default Home;
