import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "../../../styles/ContentItem.css";

const ContentItem = ({ post: { title, author, tags, time, body } }) => {
  const parser = new DOMParser();
  const wrapper = parser.parseFromString(body, "text/html");
  const preview = wrapper.body.childNodes[0].textContent;

  dayjs.extend(relativeTime);
  const timeFormatted = dayjs().from(dayjs(time), true);
  return (
    <div className="content-card">
      <div className="card-info">
        <div className="card-title">
          <h1>{title}</h1>
        </div>
        <div className="card-sub-title">
          <h4 className="card-author">{author}</h4>
          <h4 className="card-timestamp">&bull; posted {timeFormatted} ago</h4>
        </div>
      </div>
      <div className="card-preview">
        <p className="truncate">{preview}</p>
      </div>
    </div>
  );
};

export default ContentItem;
