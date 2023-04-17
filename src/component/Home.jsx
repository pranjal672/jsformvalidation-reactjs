import { Link } from "react-router-dom"
import useLogout from "../hooks/useLogout"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const logout = useLogout()
    const navigate = useNavigate()
    const signOut = async () => {
        await logout()
        navigate("/linkpage")
    }
    return (
        <div>
            <h1>Home</h1>
            <p><Link to="/admin">Go to Admin Page</Link></p>
            <p><Link to="/editor">Go to Editor Page</Link></p>
            <p><Link to="/lounge">Go to Lounge Page</Link></p>
            <p><Link to="/linkpage">Go to Links Page</Link></p>
            <button onClick={signOut}>Log Out</button>
        </div>
    )
}

export default Home
