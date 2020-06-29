import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
  getRecentPosts,
  getTrendingPosts,
  getMyPosts,
} from "../../../redux/actions/dataAction";

const ContentLists = ({
  posts,
  filter,
  getRecentPosts,
  getTrendingPosts,
  getMyPosts,
}) => {
  useEffect(() => {
    filter === "trending" && getTrendingPosts();

    filter === "recent" && getRecentPosts();

    // FIXME: Need to pass a user id to make this request
    filter === "myPosts" && getMyPosts("fakeId");

    // fetchPosts(filter);
    // eslint-disable-next-line
  }, [filter]);

  return (
    <Fragment>
      {posts && posts.length > 0 ? (
        <p>Need to display data</p> //TODO: Display cards for all posts
      ) : (
        <p>No posts available</p>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  filter: state.data.filter,
  posts: state.data.posts,
});

export default connect(mapStateToProps, {
  getRecentPosts,
  getTrendingPosts,
  getMyPosts,
})(ContentLists);
