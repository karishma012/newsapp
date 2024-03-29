import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl,author,date } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img src={!imageUrl?"https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p class="text-body-secondary">By {!author?"unknown":author} on {new Date(date).toGMTString()}</p>

            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default NewsItem
