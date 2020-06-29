import React from "react";
import { connect } from "react-redux";
import { changeFilter } from "../../../redux/actions/dataAction";
import "../../../styles/FilterBar.css";
import { useEffect } from "react";

const FilterBar = ({ filter, changeFilter, match }) => {
  useEffect(() => {
    let currentPath = `/posts/${filter}`;
    filter
      ? window.history.pushState(null, null, currentPath)
      : changeFilter(match.params.filter);
  }, [filter, changeFilter, match]);

  return (
    <div className="filter-selectors-cnt">
      <div
        className="filter-selector-box"
        onClick={() => changeFilter("trending")}
        style={{
          borderBottom:
            filter === "trending" ? "3px solid rgb(227,19,55)" : "white",
        }}
      >
        trending
      </div>
      <div
        className="filter-selector-box"
        onClick={() => changeFilter("recent")}
        style={{
          borderBottom:
            filter === "recent" ? "3px solid rgb(227,19,55)" : "white",
        }}
      >
        recent
      </div>
      <div
        className="filter-selector-box"
        onClick={() => changeFilter("myPosts")}
        style={{
          borderBottom:
            filter === "myPosts" ? "3px solid rgb(227,19,55)" : "white",
        }}
      >
        my posts
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  filter: state.data.filter,
});

export default connect(mapStateToProps, { changeFilter })(FilterBar);
