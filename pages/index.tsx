import { useRouter } from "next/router";
import React from "react"
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions';

const Login: React.FC = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const [isLogged, setIsLogged] = React.useState(useSelector((state: any) => state?.token ? true : false))
  const router = useRouter();

  React.useEffect(() => {
    if (isLogged) {
      router.push("/home");
    }
  }, [isLogged]);
  
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (data.error) {
        setError(data.error)
      } else {
        setError("")
        dispatch(login(data.token));
        setIsLogged(true);
      }
    } catch (error) {
      setError("Something went wrong.")
    }
  }

  return (
    <div className="loginContainer">
      <h4 className="loginTitle">Sign In</h4>
      <p className="loginText">Please enter your credentials</p>
      <small className="loginSmallText">If you don't have any account, just log in and a new user will be created.</small>
      <form className="loginForm" onSubmit={handleSubmit}>
        <input className="loginInput" type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input className="loginInput" type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button className="loginButton" type="submit" disabled={!email || !password}>Login/Register</button>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  )
}

export default Login
