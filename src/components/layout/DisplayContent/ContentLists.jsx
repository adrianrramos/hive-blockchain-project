import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
  getRecentPosts,
  getTrendingPosts,
  getMyPosts,
} from "../../../redux/actions/dataAction";
import ContentItem from "./ContentItem";
import LoadingSkeleton from "./LoadingSkeleton";

const ContentLists = ({
  data: { posts, filter, loading },
  getRecentPosts,
  getTrendingPosts,
  getMyPosts,
}) => {
  useEffect(() => {
    filter === "trending" && getTrendingPosts();

    filter === "recent" && getRecentPosts();

    // FIXME: Need to pass a user id to make this request
    filter === "myPosts" && getMyPosts("fakeId");

    // eslint-disable-next-line
  }, [filter]);

  return (
    <Fragment>
      {loading ? (
        <LoadingSkeleton />
      ) : posts && posts.length > 0 ? (
        posts
          .reverse()
          .map(post => <ContentItem post={post} key={post.permlink} />)
      ) : (
        <h1>No posts available</h1>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  data: state.data,
});

export default connect(mapStateToProps, {
  getRecentPosts,
  getTrendingPosts,
  getMyPosts,
})(ContentLists);
