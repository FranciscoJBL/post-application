import { useState } from "react";
import { useSelector } from "react-redux";

const AddPost: React.FC = () => {
  const [postName, setPostName] = useState<string>("");
  const [postDescription, setPostDescription] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const token = useSelector((state: any) => state ? state.token : null);
  // avoid re render every time the input changes:
  const handlePostNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostName(e.target.value);
  };

  const handlePostDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (postName === "") {
      setFormError("Post name is required");
      return;
    }

    if (postDescription === "") {
      setFormError("Post description is required");
      return;
    }

    if (!token) {
      setFormError("You need to be logged in to add a post");
      return;
    }

    setFormError("");
    fetch("/api/post/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        postName,
        postDescription,
      }),
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        window.location.reload();
      } else {
        setFormError("Ups! Something went wrong");
      }
    });
  }

  return (
    <div className="addPost">
      <div className="addPostControls">
        <button
          className="btn btn-primary"
          onClick={() => setIsVisible(true)}
          style={{ display: isVisible ? 'none' : 'block' }}
        >
          Add new post
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setIsVisible(false)}
          style={{ display: isVisible ? 'block' : 'none' }}
        >
          Cancel
        </button>
      </div>
      <div className="addPostContent" style={{ display: isVisible ? 'block' : 'none' }}>
        <h3>Add a new post</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control addPostTitleInput"
              placeholder="Post Name"
              onChange={handlePostNameChange}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control addPostDescriptionInput"
              placeholder="Post Description"
              onChange={handlePostDescriptionChange}
            ></textarea>
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
        {formError && (
          <p className="error mt-3">
            <strong>Error:</strong> {formError}
          </p>
        )}
      </div>
    </div>
  );
}

export default AddPost
