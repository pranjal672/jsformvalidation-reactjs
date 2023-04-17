import { useRef, useState, useEffect } from "react"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "../api/axios"
import { Link } from "react-router-dom"


// regex variables
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

// Url for axios post
const REGISTER_URL = "/register"


export default function Register() {
    const userRef = useRef() // user reference
    const errRef = useRef() // error reference

    // user states
    const [user, setUser] = useState("")
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    // password states
    const [pwd, setPwd] = useState("")
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    // match password states
    const [matchPwd, setMatchPwd] = useState("")
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState("")  // error state
    const [success, setSuccess] = useState(false) // submit data successfully state

    // putting default focus on user input field
    useEffect(() => {
        userRef.current.focus()
    }, [])

    // setting valid user state
    useEffect(() => {
        const result = USER_REGEX.test(user)
        setValidName(result)
    }, [user])

    // setting valid password state
    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        setValidPwd(result)
        // setting valid match password state
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

    // clearing error msg state
    useEffect(() => {
        setErrMsg("")
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        // if button enabled with js hack
        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry")
            return
        }
        // console.log(user, pwd) // data to be submitted to backend
        // setSuccess(true)
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                })
            console.log(response.accessToken)
            console.log(response.data)
            console.log(JSON.stringify(response))
            setSuccess(true)
            // clear fields
            setUser("")
            setPwd("")

        } catch (err) {
            if (err?.response) {
                setErrMsg("No Server Response.")
            } else if (err?.status === 409) {
                setErrMsg("User Name already taken.")
            } else {
                setErrMsg("Registration Failed.")
            }
            errRef.current.focus()
        }
    }

    return (
        <>
            {/* if form submitted succesfully show sign in form */}
            {success ?
                <div>
                    <h1>Success!</h1>
                    <p><a href="#">Login</a></p>
                </div>
                :
                <div> {/* else show sign up form */}
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}
                    </p>
                    <h1>Register User</h1>
                    <form onSubmit={handleSubmit}>
                        {/* user name input */}
                        <label htmlFor="username">
                            UserName:
                            <span className={validName ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validName || !user ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)} // setting user state
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.
                            Must begin with a letter.
                            Letters, numbers, underscores, hypens allowed.
                        </p>

                        {/* password input */}
                        <label htmlFor="pwd">
                            Password:
                            <span className={validPwd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="password"
                            id="pwd"
                            onChange={(e) => { setPwd(e.target.value) }} // setting password state
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.
                            Must include lowercase and uppercase letters, special characters and numbers.
                            Special characters allowed : <span aria-label="exclamation mark">!</span><span aria-label="at symbol">@</span><span aria-label="hashtag">#</span><span aria-label="dollar">$</span><span aria-label="percentage">%</span>
                        </p>

                        {/* repeat password input */}
                        <label htmlFor="matchpwd">
                            Repeat Password:
                            <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="password"
                            id="matchpwd"
                            onChange={(e) => { setMatchPwd(e.target.value) }} // setting match password state
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="pwdmatchnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="pwdmatchnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match password field above.
                        </p>

                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>Already registered?</p>
                    <p><Link to="/login">Login</Link></p>
                </div>
            }</>
    )
}