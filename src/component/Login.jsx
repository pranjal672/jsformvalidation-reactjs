import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LOGIN_URL = "/auth"

export default function Login() {
  const { setAuth, persist, setPersist } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location?.state?.from?.pathname || "/"
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErr("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        })
      const accessToken = response?.data?.accessToken
      const roles = response?.data?.roles
      // console.log(JSON.stringify(response.data))

      setAuth({ user, pwd, roles, accessToken })
      setUser("")
      setPwd("")
      navigate(from, { replace: true })

    } catch (err) {
      if (!err?.response) {
        setErr("No Server Response.")
      } else if (err.response?.status === 400) {
        setErr("Missing Username or Password")
      } else if (err.response?.status === 401) {
        setErr("Unauthorised")
      } else {
        setErr("Login Failed.")
      }
      errRef.current.focus()
    }

  };

  const togglePersist = () => {
    setPersist(prev => !prev)
  }

  useEffect(() => {
    localStorage.setItem("persist", persist)
  }, [persist])

  return (
    <div>
      <p
        ref={errRef}
        className={err ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {err}
      </p>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          ref={userRef}
          onChange={(e) => {
            setUser(e.target.value);
          }}
          value={user}
          required
        />
        <label htmlFor="pwd">Password:</label>
        <input
          type="password"
          id="pwd"
          onChange={(e) => {
            setPwd(e.target.value);
          }}
          value={pwd}
          required
        />
        <button>Login</button>
        <p className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Trust this device</label>
        </p>
        <p>Not registered?</p>
        <p>
          <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};


