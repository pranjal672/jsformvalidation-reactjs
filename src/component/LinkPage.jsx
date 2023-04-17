import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <div>
            <h1>Links</h1>
            <h2>Public</h2>
            <p><Link to="/login">Login</Link></p>
            <p><Link to="/register">Register</Link></p>
            <h2>Private</h2>
            <p><Link to="/">Home</Link></p>
            <p><Link to="/editor">Editor</Link></p>
            <p><Link to="/admin">Admin</Link></p>
        </div>
    )
}

export default LinkPage
