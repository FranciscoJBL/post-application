import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  name: string;
  user: {
    email: string;
  } | null;
  description: string;
  isPublic: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.user ? post.user.email : "Unknown author";
  return (
    <div onClick={() => Router.push("/posts/[id]", `/posts/${post.id}`)}>
      <div className="postTitle">
      <span className="titleText">{post.name}</span>
      <small>By {authorName}</small>
      </div>
      <ReactMarkdown children={post.description} />
    </div>
  );
};

export default Post;
