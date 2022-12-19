import React from "react"
import { GetServerSideProps, GetServerSidePropsContext, PreviewData } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { PostProps } from "../../components/Post"
import { fetchPost } from "../../lib/fetchPost"


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: await fetchPost(ctx),
  }
}

const Post: React.FC<PostProps> = (props) => {
  const handleDeletePost = async () => {
    const res = await fetch(`/api/posts/${props.id}`, {
      method: "DELETE",
    })
    if (res.status === 200) {
      window.location.href = "/"
    }
  }
  
  return (
    <Layout>
      <div className="postDetailContainer">
        <h2 className="postDetailTitle">{props.name}</h2>
        <p className="postDetailAuthor">By {props?.user?.email || "Unknown author"}</p>
        <div className="postDetailDescription">
        <ReactMarkdown children={props.description} />
        </div>
        <button className="deletePostButton" onClick={handleDeletePost}>Delete post</button>
      </div>
    </Layout>
  )
}

export default Post;